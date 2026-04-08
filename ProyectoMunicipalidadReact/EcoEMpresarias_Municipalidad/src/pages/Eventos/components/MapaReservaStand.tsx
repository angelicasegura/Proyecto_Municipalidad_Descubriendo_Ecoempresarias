import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Stage, Layer, Rect, Text, Line } from "react-konva"
import { authFetch } from "../../../auth/AuthFetch"
import { X, AlertTriangle, Info, CheckCircle } from "lucide-react"
import type { EventoZonaActivaResponse } from "../../../types/reservaType"
import type { EventoZonaStandResponse } from "../../../types/eventoZonaStandTypes"
import { STAND_EVENTO_COLOR, STAND_EVENTO_LABEL } from "../../../types/eventoZonaStandTypes"
import { fetchStandsEventoEmprendedor, ocuparStand, desocuparStandEmprendedor } from "../actions/fetchReservaStand"
import React from "react"

interface MapaInfo {
    mapa_id: number
    nombre: string
    ancho: number
    alto: number
}

interface Props {
    zona: EventoZonaActivaResponse
    emprendimientoId: number
    onCerrar: () => void
}

const GRID = 20

function gridLines(w: number, h: number) {
    const lines: number[][] = []
    for (let x = 0; x <= w; x += GRID) lines.push([x, 0, x, h])
    for (let y = 0; y <= h; y += GRID) lines.push([0, y, w, y])
    return lines
}

export default function MapaReservaStand({ zona, emprendimientoId, onCerrar }: Props) {

    const queryClient = useQueryClient()
    const standsKey = ["standsEventoEmp", zona.evento_id, zona.zona_id]

    const [standSeleccionado, setStandSeleccionado] = useState<EventoZonaStandResponse | null>(null)
    const [procesando, setProcesando] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [exito, setExito] = useState<string | null>(null)

    // Dimensiones del mapa
    const { data: mapa, isLoading: loadingMapa } = useQuery<MapaInfo>({
        queryKey: ["mapa", zona.mapa_id],
        queryFn: async () => {
            const res = await authFetch(
                `https://localhost:7050/api/Mapa/ObtenerMapaPorId/${zona.mapa_id}`
            )
            if (!res.ok) throw new Error("Error al cargar mapa")
            return res.json()
        },
        enabled: !!zona.mapa_id,
    })

    // Stands del evento en esta zona
    const { data: stands = [], isLoading: loadingStands } = useQuery<EventoZonaStandResponse[]>({
        queryKey: standsKey,
        queryFn: () => fetchStandsEventoEmprendedor(zona.evento_id, zona.zona_id),
    })

    const refrescar = () => {
        queryClient.refetchQueries({ queryKey: standsKey })
        setStandSeleccionado(null)
    }

    // Stand que ya reservó este emprendedor en esta zona
    const miStand = stands.find(s => s.emprendimiento_id === emprendimientoId)

    const handleReservar = async () => {
        if (!standSeleccionado) return
        setProcesando(true)
        setErrorMsg(null)
        setExito(null)
        try {
            await ocuparStand({
                Stand_id: standSeleccionado.stand_id,
                Evento_id: standSeleccionado.evento_id,
                Zona_id: standSeleccionado.zona_id,
                Estado_id: 12,
                Emprendimiento_id: emprendimientoId,
            })
            setExito(`Stand ${standSeleccionado.codigo} reservado correctamente`)
            await refrescar()
        } catch (err: any) {
            const mensaje = err?.data?.mensaje ?? "No se pudo reservar el stand"
            setErrorMsg(mensaje)
        } finally {
            setProcesando(false)
        }
    }

    const handleCancelar = async () => {
        if (!miStand) return
        setProcesando(true)
        setErrorMsg(null)
        setExito(null)
        try {
            await desocuparStandEmprendedor({
                Stand_id: miStand.stand_id,
                Evento_id: miStand.evento_id,
                Zona_id: miStand.zona_id,
                Estado_id: 11,
                Emprendimiento_id: null,
            })
            setExito("Reserva cancelada correctamente")
            await refrescar()
        } catch {
            setErrorMsg("No se pudo cancelar la reserva")
        } finally {
            setProcesando(false)
        }
    }

    const isLoading = loadingMapa || loadingStands
    const lineas = mapa ? gridLines(mapa.ancho, mapa.alto) : []

    // Stand seleccionado solo puede reservarse si está disponible (11) y el emprendedor no tiene otro
    const puedeReservar =
        standSeleccionado?.estado_id === 11 && !miStand

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[70]">
            <div
                className="bg-white rounded-lg shadow-xl flex flex-col"
                style={{ width: "min(95vw, 900px)", maxHeight: "92vh" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <div>
                        <h2 className="text-base font-bold text-gray-800">
                            {zona.nombreZona} — {zona.nombreMapa}
                        </h2>
                        <p className="text-xs text-gray-500 mt-0.5">
                            {zona.nombreEvento} · Piso {zona.numero_piso}: {zona.nombre_piso}
                        </p>
                    </div>
                    <button onClick={onCerrar} className="text-gray-400 hover:text-gray-600 transition">
                        <X size={20} />
                    </button>
                </div>

                {/* Leyenda */}
                <div className="flex items-center gap-6 px-6 py-3 border-b bg-gray-50 flex-wrap">
                    {Object.entries(STAND_EVENTO_COLOR).map(([id, color]) => (
                        <div key={id} className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded" style={{ background: color }} />
                            <span className="text-xs text-gray-600">{STAND_EVENTO_LABEL[Number(id)]}</span>
                        </div>
                    ))}
                    {miStand && (
                        <span className="ml-auto text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
                            Tu stand: {miStand.codigo}
                        </span>
                    )}
                </div>

                {/* Mensajes */}
                {errorMsg && (
                    <div className="mx-6 mt-3 flex items-center gap-2 bg-red-50 border border-red-200 rounded p-3">
                        <AlertTriangle size={16} className="text-red-500 shrink-0" />
                        <p className="text-sm text-red-600">{errorMsg}</p>
                        <button onClick={() => setErrorMsg(null)} className="ml-auto text-red-400">
                            <X size={14} />
                        </button>
                    </div>
                )}
                {exito && (
                    <div className="mx-6 mt-3 flex items-center gap-2 bg-green-50 border border-green-200 rounded p-3">
                        <CheckCircle size={16} className="text-green-500 shrink-0" />
                        <p className="text-sm text-green-700">{exito}</p>
                        <button onClick={() => setExito(null)} className="ml-auto text-green-400">
                            <X size={14} />
                        </button>
                    </div>
                )}

                <div className="flex flex-1 overflow-hidden">

                    {/* Canvas */}
                    <div className="flex-1 overflow-auto p-4 bg-gray-100">
                        {isLoading && (
                            <p className="text-sm text-gray-400 text-center py-10">Cargando mapa...</p>
                        )}
                        {!isLoading && mapa && (
                            <div className="inline-block rounded-lg overflow-hidden shadow border border-gray-300">
                                <Stage
                                    width={mapa.ancho}
                                    height={mapa.alto}
                                    onClick={(e) => {
                                        if (e.target === e.target.getStage() || e.target.name() === "bg") {
                                            setStandSeleccionado(null)
                                        }
                                    }}
                                >
                                    <Layer>
                                        <Rect name="bg" x={0} y={0} width={mapa.ancho} height={mapa.alto} fill="#ffffff" />
                                        {lineas.map((pts, i) => (
                                            <Line key={i} points={pts} stroke="#e5e7eb" strokeWidth={1} listening={false} />
                                        ))}
                                        {stands.map(stand => {
                                            const color = STAND_EVENTO_COLOR[stand.estado_id] ?? "#94a3b8"
                                            const seleccionado = standSeleccionado?.stand_id === stand.stand_id
                                            const esMio = stand.emprendimiento_id === emprendimientoId

                                            return (
                                                <React.Fragment key={stand.stand_id}>
                                                    <Rect
                                                        x={stand.x}
                                                        y={stand.y}
                                                        width={stand.ancho}
                                                        height={stand.alto}
                                                        rotation={stand.rotacion}
                                                        fill={color}
                                                        opacity={stand.estado_id === 13 ? 0.5 : 0.85}
                                                        cornerRadius={3}
                                                        stroke={
                                                            esMio ? "#f97316" :
                                                                seleccionado ? "#1d4ed8" :
                                                                    "rgba(0,0,0,0.2)"
                                                        }
                                                        strokeWidth={esMio || seleccionado ? 2.5 : 1}
                                                        shadowColor="rgba(0,0,0,0.2)"
                                                        shadowBlur={seleccionado ? 8 : 2}
                                                        // Solo clickeable si está disponible
                                                        onClick={() => {
                                                            if (stand.estado_id !== 13) setStandSeleccionado(stand)
                                                        }}
                                                        style={{ cursor: stand.estado_id === 13 ? "not-allowed" : "pointer" }}
                                                    />
                                                    <Text
                                                        x={stand.x + 4}
                                                        y={stand.y + stand.alto / 2 - 7}
                                                        width={stand.ancho - 8}
                                                        text={stand.codigo}
                                                        fontSize={Math.min(11, stand.ancho / 5)}
                                                        fill="#fff"
                                                        align="center"
                                                        fontStyle="bold"
                                                        listening={false}
                                                    />
                                                </React.Fragment>
                                            )
                                        })}
                                    </Layer>
                                </Stage>
                            </div>
                        )}
                    </div>

                    {/* Panel lateral */}
                    <div className="w-60 border-l bg-white flex flex-col overflow-y-auto">
                        <div className="p-4 border-b">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Detalle
                            </p>
                        </div>

                        {/* Reserva activa del emprendedor */}
                        {miStand && (
                            <div className="p-4 border-b bg-orange-50">
                                <p className="text-xs font-bold text-orange-700 mb-2">Tu Reserva Actual</p>
                                <p className="text-sm font-semibold text-gray-800">{miStand.codigo}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {miStand.ancho} × {miStand.alto} px
                                </p>
                                <button
                                    onClick={handleCancelar}
                                    disabled={procesando}
                                    className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-xs font-semibold transition disabled:opacity-50"
                                >
                                    {procesando ? "..." : "Cancelar Reserva"}
                                </button>
                            </div>
                        )}

                        {/* Stand seleccionado */}
                        {standSeleccionado ? (
                            <div className="p-4 flex flex-col gap-3">
                                <div className="space-y-1.5">
                                    <div>
                                        <p className="text-xs text-gray-400">Código</p>
                                        <p className="text-sm font-bold text-gray-800">{standSeleccionado.codigo}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Estado</p>
                                        <span
                                            className="inline-block text-xs font-bold px-2 py-0.5 rounded mt-0.5"
                                            style={{
                                                background: `${STAND_EVENTO_COLOR[standSeleccionado.estado_id]}22`,
                                                color: STAND_EVENTO_COLOR[standSeleccionado.estado_id],
                                            }}
                                        >
                                            {STAND_EVENTO_LABEL[standSeleccionado.estado_id]}
                                        </span>
                                    </div>
                                    {standSeleccionado.nombreEmprendimiento && (
                                        <div>
                                            <p className="text-xs text-gray-400">Ocupado por</p>
                                            <p className="text-sm text-gray-700">{standSeleccionado.nombreEmprendimiento}</p>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-2 gap-1 text-xs text-gray-400 pt-1">
                                        <span>{standSeleccionado.ancho} × {standSeleccionado.alto} px</span>
                                    </div>
                                </div>

                                {/* Acción reservar */}
                                {puedeReservar && (
                                    <button
                                        onClick={handleReservar}
                                        disabled={procesando}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs font-semibold transition disabled:opacity-50"
                                    >
                                        {procesando ? "Reservando..." : "✅ Reservar este Stand"}
                                    </button>
                                )}

                                {standSeleccionado.estado_id === 12 && (
                                    <p className="text-xs text-gray-400 text-center">Este stand ya está ocupado</p>
                                )}

                                {miStand && standSeleccionado.estado_id === 11 && (
                                    <p className="text-xs text-orange-500 text-center">
                                        Ya tenés un stand reservado en esta zona
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="p-4 text-center text-gray-400">
                                <Info size={28} className="mx-auto mb-2 opacity-40" />
                                <p className="text-xs">
                                    {miStand
                                        ? "Seleccioná otro stand disponible o cancelá tu reserva actual"
                                        : "Hacé clic en un stand verde para reservarlo"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}