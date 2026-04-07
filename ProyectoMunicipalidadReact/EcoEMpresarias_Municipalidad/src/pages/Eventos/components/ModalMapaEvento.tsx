import { useState, useRef } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Stage, Layer, Rect, Text, Line } from "react-konva"
import { authFetch } from "../../../auth/AuthFetch"
import { X, AlertTriangle, Info } from "lucide-react"
import type { EventoZonaResponse } from "../../../types/EventoZonaType"
import type { EventoZonaStandResponse, EventoZonaStandRequest } from "../../..//types/eventoZonaStandTypes"
import { STAND_EVENTO_COLOR, STAND_EVENTO_LABEL } from "../../..//types/eventoZonaStandTypes"
import {
    fetchStandsEvento,
    bloquearStand,
    desocuparStand,
} from "../actions/fetchEventoZonaStand"

interface MapaInfo {
    mapa_id: number
    nombre: string
    ancho: number
    alto: number
    escala: number
}

interface Props {
    zona: EventoZonaResponse
    onCerrar: () => void
}

const GRID = 20

function gridLines(w: number, h: number) {
    const lines: number[][] = []
    for (let x = 0; x <= w; x += GRID) lines.push([x, 0, x, h])
    for (let y = 0; y <= h; y += GRID) lines.push([0, y, w, y])
    return lines
}

export default function ModalMapaEvento({ zona, onCerrar }: Props) {

    const queryClient = useQueryClient()
    const standsKey = ["standsEvento", zona.evento_id, zona.zona_id]

    const [standSeleccionado, setStandSeleccionado] = useState<EventoZonaStandResponse | null>(null)
    const [procesando, setProcesando] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    // Cargar dimensiones del mapa
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

    // Cargar stands del evento para esta zona
    const { data: stands = [], isLoading: loadingStands } = useQuery<EventoZonaStandResponse[]>({
        queryKey: standsKey,
        queryFn: () => fetchStandsEvento(zona.evento_id, zona.zona_id),
    })

    const refrescar = () => {
        queryClient.refetchQueries({ queryKey: standsKey })
        setStandSeleccionado(null)
    }

    const buildRequest = (stand: EventoZonaStandResponse): EventoZonaStandRequest => ({
        Stand_id: stand.stand_id,
        Evento_id: stand.evento_id,
        Zona_id: stand.zona_id,
        Estado_id: stand.estado_id,
        Emprendimiento_id: stand.emprendimiento_id,
    })

    const handleBloquear = async () => {
        if (!standSeleccionado) return
        setProcesando(true)
        setErrorMsg(null)
        try {
            await bloquearStand(buildRequest(standSeleccionado))
            await refrescar()
        } catch {
            setErrorMsg("Error al bloquear el stand")
        } finally {
            setProcesando(false)
        }
    }

    const handleDesocupar = async () => {
        if (!standSeleccionado) return
        setProcesando(true)
        setErrorMsg(null)
        try {
            await desocuparStand(buildRequest(standSeleccionado))
            await refrescar()
        } catch {
            setErrorMsg("Error al desocupar el stand")
        } finally {
            setProcesando(false)
        }
    }

    const isLoading = loadingMapa || loadingStands
    const lineas = mapa ? gridLines(mapa.ancho, mapa.alto) : []

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[70]">
            <div className="bg-white rounded-lg shadow-xl flex flex-col"
                style={{ width: "min(95vw, 900px)", maxHeight: "92vh" }}>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <div>
                        <h2 className="text-base font-bold text-gray-800">
                            Mapa — {zona.nombreZona}
                        </h2>
                        <p className="text-xs text-gray-500 mt-0.5">
                            {zona.nombreEvento} · {mapa?.nombre}
                        </p>
                    </div>
                    <button onClick={onCerrar} className="text-gray-400 hover:text-gray-600 transition">
                        <X size={20} />
                    </button>
                </div>

                {/* Leyenda */}
                <div className="flex items-center gap-6 px-6 py-3 border-b bg-gray-50">
                    {Object.entries(STAND_EVENTO_COLOR).map(([id, color]) => (
                        <div key={id} className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded" style={{ background: color }} />
                            <span className="text-xs text-gray-600">
                                {STAND_EVENTO_LABEL[Number(id)]}
                            </span>
                        </div>
                    ))}
                    <span className="text-xs text-gray-400 ml-auto">
                        {stands.length} stands en esta zona
                    </span>
                </div>

                {/* Error */}
                {errorMsg && (
                    <div className="mx-6 mt-3 flex items-center gap-2 bg-red-50 border border-red-200 rounded p-3">
                        <AlertTriangle size={16} className="text-red-500 shrink-0" />
                        <p className="text-sm text-red-600">{errorMsg}</p>
                        <button onClick={() => setErrorMsg(null)} className="ml-auto text-red-400">
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
                                        {/* Fondo */}
                                        <Rect name="bg" x={0} y={0} width={mapa.ancho} height={mapa.alto} fill="#ffffff" />

                                        {/* Grilla */}
                                        {lineas.map((pts, i) => (
                                            <Line key={i} points={pts} stroke="#e5e7eb" strokeWidth={1} listening={false} />
                                        ))}

                                        {/* Stands */}
                                        {stands.map(stand => {
                                            const color = STAND_EVENTO_COLOR[stand.estado_id] ?? "#94a3b8"
                                            const seleccionado = standSeleccionado?.stand_id === stand.stand_id
                                            return (
                                                <React.Fragment key={stand.stand_id}>
                                                    <Rect
                                                        x={stand.x}
                                                        y={stand.y}
                                                        width={stand.ancho}
                                                        height={stand.alto}
                                                        rotation={stand.rotacion}
                                                        fill={color}
                                                        opacity={0.85}
                                                        cornerRadius={3}
                                                        stroke={seleccionado ? "#1d4ed8" : "rgba(0,0,0,0.2)"}
                                                        strokeWidth={seleccionado ? 2.5 : 1}
                                                        shadowColor="rgba(0,0,0,0.2)"
                                                        shadowBlur={seleccionado ? 8 : 2}
                                                        onClick={() => setStandSeleccionado(stand)}
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

                    {/* Panel lateral — info del stand seleccionado */}
                    <div className="w-56 border-l bg-white flex flex-col overflow-y-auto">
                        <div className="p-4 border-b">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Stand Seleccionado
                            </p>
                        </div>

                        {!standSeleccionado ? (
                            <div className="p-4 text-center text-gray-400">
                                <Info size={28} className="mx-auto mb-2 opacity-40" />
                                <p className="text-xs">Hacé clic en un stand para ver sus detalles</p>
                            </div>
                        ) : (
                            <div className="p-4 flex flex-col gap-3">

                                {/* Info */}
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
                                            <p className="text-xs text-gray-400">Emprendimiento</p>
                                            <p className="text-sm text-gray-700">{standSeleccionado.nombreEmprendimiento}</p>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-2 gap-1 text-xs text-gray-500 pt-1">
                                        <span>X: {standSeleccionado.x}</span>
                                        <span>Y: {standSeleccionado.y}</span>
                                        <span>W: {standSeleccionado.ancho}</span>
                                        <span>H: {standSeleccionado.alto}</span>
                                    </div>
                                </div>

                                {/* Acciones admin */}
                                <div className="flex flex-col gap-2 pt-2 border-t">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Acciones
                                    </p>

                                    {/* Bloquear — solo si está disponible */}
                                    {standSeleccionado.estado_id === 11 && (
                                        <button
                                            onClick={handleBloquear}
                                            disabled={procesando}
                                            className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-xs font-semibold transition disabled:opacity-50"
                                        >
                                            {procesando ? "..." : "🔒 Bloquear Stand"}
                                        </button>
                                    )}

                                    {/* Desocupar — si está ocupado o bloqueado */}
                                    {(standSeleccionado.estado_id === 12 || standSeleccionado.estado_id === 13) && (
                                        <button
                                            onClick={handleDesocupar}
                                            disabled={procesando}
                                            className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs font-semibold transition disabled:opacity-50"
                                        >
                                            {procesando ? "..." : "✅ Desocupar Stand"}
                                        </button>
                                    )}

                                    {standSeleccionado.estado_id === 11 && (
                                        <p className="text-xs text-gray-400 text-center">
                                            Stand disponible para reserva
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

// Necesario para usar React.Fragment dentro del Stage
import React from "react"