import { useState, useRef, useCallback, useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Stage, Layer, Rect, Line } from "react-konva"
import Konva from "konva"
import StandShape from "./StandShape"
import StandToolbar from "./StandToolbar"
import {
    type MapaResponse, type StandResponse, type StandRequest, type EditorTool, ESTADO_ACTIVO
} from "../../../types/mapaType"
import {
    fetchStandsPorMapa, agregarStand, actualizarStand, inactivarStand
} from "../actions/fetchsStands"

interface Props {
    mapa: MapaResponse
    onVolver: () => void
}

const GRID = 20

function gridLines(w: number, h: number) {
    const lines: number[][] = []
    for (let x = 0; x <= w; x += GRID) lines.push([x, 0, x, h])
    for (let y = 0; y <= h; y += GRID) lines.push([0, y, w, y])
    return lines
}

function codigoAuto(total: number) {
    return `S-${String(total + 1).padStart(3, "0")}`
}

export default function MapaEditor({ mapa, onVolver }: Props) {

    // Usamos mapa.mapa_id (camelCase) correctamente
    const mapaId = mapa.mapa_id
    const queryClient = useQueryClient()
    const queryKey = ["stands", mapaId]

    const { data: standsAPI = [] } = useQuery<StandResponse[]>({
        queryKey,
        queryFn: () => fetchStandsPorMapa(mapaId),
        enabled: !!mapaId, // no ejecutar si mapaId es undefined
    })

    const [localStands, setLocalStands] = useState<StandResponse[]>([])
    const [pendientes, setPendientes] = useState<Map<number, Partial<StandResponse>>>(new Map())
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [tool, setTool] = useState<EditorTool>("select")
    const [guardando, setGuardando] = useState(false)
    const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)
    const stageRef = useRef<Konva.Stage>(null)

    // Sync API → local. Solo cuando cambia standsAPI, sin crear objetos nuevos cada render
    useEffect(() => {
        setLocalStands(standsAPI)
        setPendientes(new Map())
    }, [standsAPI])

    const mostrarToast = (msg: string, ok: boolean) => {
        setToast({ msg, ok })
        setTimeout(() => setToast(null), 3000)
    }

    // Click en canvas para agregar stand
    const handleStageClick = useCallback(async (e: Konva.KonvaEventObject<MouseEvent>) => {
        if (tool !== "add") {
            if (e.target === e.target.getStage() || e.target.name() === "bg") {
                setSelectedId(null)
            }
            return
        }

        const pos = e.target.getStage()?.getPointerPosition()
        if (!pos) return

        const nuevo: StandRequest = {
            Codigo: codigoAuto(localStands.length),
            X: Math.round(pos.x / GRID) * GRID,
            Y: Math.round(pos.y / GRID) * GRID,
            Ancho: 80,
            Alto: 60,
            Rotacion: 0,
            Mapa_id: mapaId,
            Estado_id: ESTADO_ACTIVO,
        }

        try {
            const nuevoId = await agregarStand(nuevo)
            await queryClient.invalidateQueries({ queryKey })
            setSelectedId(nuevoId)
            mostrarToast("Stand agregado", true)
        } catch {
            mostrarToast("Error al agregar stand", false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tool, localStands.length, mapaId])

    // Cambio local inmediato (drag / resize desde Konva)
    const handleStandChange = useCallback((id: number, attrs: Partial<StandResponse>) => {
        setLocalStands(prev => prev.map(s => s.stand_id === id ? { ...s, ...attrs } : s))
        setPendientes(prev => {
            const m = new Map(prev)
            m.set(id, { ...(m.get(id) ?? {}), ...attrs })
            return m
        })
    }, [])

    // Persistir todos los cambios pendientes
    const handleGuardarCambios = async () => {
        if (!pendientes.size) return
        setGuardando(true)
        try {
            await Promise.all(
                Array.from(pendientes.entries()).map(([id]) => {
                    const s = localStands.find(x => x.stand_id === id)
                    if (!s) return Promise.resolve()
                    const req: StandRequest = {
                        Codigo: s.codigo,
                        X: s.x,
                        Y: s.y,
                        Ancho: s.ancho,
                        Alto: s.alto,
                        Rotacion: s.rotacion,
                        Mapa_id: mapaId,
                        Estado_id: s.nombreEstado?.toUpperCase() === "DISPONIBLE" ? 1 : 0,
                    }
                    return actualizarStand(id, req)
                })
            )
            setPendientes(new Map())
            await queryClient.invalidateQueries({ queryKey })
            mostrarToast("Cambios guardados", true)
        } catch {
            mostrarToast("Error al guardar", false)
        } finally {
            setGuardando(false)
        }
    }

    // Inactivar stand
    const handleEliminar = async (id: number) => {
        try {
            await inactivarStand(id)
            await queryClient.invalidateQueries({ queryKey })
            setSelectedId(null)
            mostrarToast("Stand inactivado", true)
        } catch {
            mostrarToast("Error al eliminar stand", false)
        }
    }

    const standSeleccionado = localStands.find(s => s.stand_id === selectedId) ?? null
    const lineas = gridLines(mapa.ancho, mapa.alto)

    return (
        <div className="flex flex-col h-screen bg-gray-50">

            {/* Header */}
            <div className="bg-white border-b px-6 py-3 flex items-center gap-4 shadow-sm">
                <button
                    onClick={onVolver}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm"
                >
                    ← Volver
                </button>
                <div>
                    <h1 className="text-lg font-bold">{mapa.nombre}</h1>
                    <p className="text-xs text-gray-500">
                        {mapa.ancho} × {mapa.alto} px · Escala {mapa.escala} · {localStands.filter(s => s.estado_id === 1).length} stands
                    </p>
                </div>
                <div className="ml-auto flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-green-500" />
                        <span className="text-xs text-gray-600">Disponible</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-red-500" />
                        <span className="text-xs text-gray-600">Ocupado</span>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">

                {/* Canvas */}
                <div
                    className="flex-1 overflow-auto p-6 bg-gray-100"
                    style={{ cursor: tool === "add" ? "crosshair" : "default" }}
                >
                    <div className="inline-block rounded-lg overflow-hidden shadow-lg border border-gray-300">
                        <Stage
                            ref={stageRef}
                            width={mapa.ancho}
                            height={mapa.alto}
                            onClick={handleStageClick}
                        >
                            <Layer>
                                <Rect name="bg" x={0} y={0} width={mapa.ancho} height={mapa.alto} fill="#ffffff" />
                                {lineas.map((pts, i) => (
                                    <Line key={i} points={pts} stroke="#e5e7eb" strokeWidth={1} listening={false} />
                                ))}
                                {localStands.filter(s => s.estado_id === 1).map(stand => (
                                    <StandShape
                                        key={stand.stand_id}
                                        stand={stand}
                                        isSelected={selectedId === stand.stand_id}
                                        onSelect={setSelectedId}
                                        onChange={handleStandChange}
                                    />
                                ))}
                            </Layer>
                        </Stage>
                    </div>
                </div>

                {/* Sidebar */}
                <StandToolbar
                    tool={tool}
                    onToolChange={setTool}
                    standSeleccionado={standSeleccionado}
                    onActualizarStand={handleStandChange}
                    onEliminarStand={handleEliminar}
                    onGuardarCambios={handleGuardarCambios}
                    guardando={guardando}
                    hayPendientes={pendientes.size > 0}
                />
            </div>

            {/* Toast */}
            {toast && (
                <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white text-sm font-semibold z-50
          ${toast.ok ? "bg-green-600" : "bg-red-600"}`}>
                    {toast.msg}
                </div>
            )}
        </div>
    )
}