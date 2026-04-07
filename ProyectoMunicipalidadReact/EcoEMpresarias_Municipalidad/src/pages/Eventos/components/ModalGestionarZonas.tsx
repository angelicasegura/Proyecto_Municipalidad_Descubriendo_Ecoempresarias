import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { authFetch } from "../../../auth/AuthFetch"
import { Map, ToggleLeft, ToggleRight, AlertTriangle, X } from "lucide-react"
import type { EventoZonaResponse, EventoZonaRequest, ZonaPisoActiva } from "../../../types/EventoZonaType"
import type { EventoPisoResponse } from "../../../types/eventoPisoType"
import {
    fetchZonasEvento,
    agregarZonaAEvento,
    activarZonaEvento,
    inactivarZonaEvento,
} from "../actions/fectchEventoZona"
import ModalMapaEvento from "./ModalMapaEvento"

interface Props {
    eventoId: number
    piso: EventoPisoResponse
    onCerrar: () => void
}

export default function ModalGestionarZonas({ eventoId, piso, onCerrar }: Props) {

    const queryClient = useQueryClient()
    const zonasEventoKey = ["zonasEvento", eventoId]
    const [procesando, setProcesando] = useState<number | null>(null)
    const [errorModal, setErrorModal] = useState<string | null>(null)
    const [zonaVerMapa, setZonaVerMapa] = useState<EventoZonaResponse | null>(null)

    // Zonas activas del piso
    const { data: zonasDisponibles = [], isLoading: loadingZonas } = useQuery<ZonaPisoActiva[]>({
        queryKey: ["zonasActivasPiso", piso.piso_id],
        queryFn: async () => {
            const res = await authFetch(
                `https://localhost:7050/api/Zona/ObtenerZonasPorPisoActivas/${piso.piso_id}`
            )
            if (res.status === 204) return []
            if (!res.ok) throw new Error("Error al obtener zonas del piso")
            return res.json()
        },
    })

    // Zonas asignadas al evento
    const { data: zonasEvento = [], isLoading: loadingEvento } = useQuery<EventoZonaResponse[]>({
        queryKey: zonasEventoKey,
        queryFn: () => fetchZonasEvento(eventoId),
    })

    const refrescar = () => queryClient.refetchQueries({ queryKey: zonasEventoKey })

    const getZonaEvento = (zona_id: number): EventoZonaResponse | undefined =>
        zonasEvento.find(z => z.zona_id === zona_id)

    const handleToggle = async (zona: ZonaPisoActiva) => {
        setProcesando(zona.zona_id)
        setErrorModal(null)
        try {
            const zonaEvento = getZonaEvento(zona.zona_id)
            const request: EventoZonaRequest = {
                Evento_id: eventoId,
                Zona_id: zona.zona_id,
                Estado_id: 1,
            }
            if (!zonaEvento) {
                await agregarZonaAEvento(request)
            } else if (zonaEvento.estado_id === 1) {
                await inactivarZonaEvento({ ...request, Estado_id: 0 })
            } else {
                await activarZonaEvento(request)
            }
            await refrescar()
        } catch (err: any) {
            const mensaje = err?.data?.mensaje ?? "Error al procesar la zona"
            setErrorModal(mensaje)
        } finally {
            setProcesando(null)
        }
    }

    const isLoading = loadingZonas || loadingEvento

    return (
        <>
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[60]">
                <div className="bg-white rounded-lg shadow-lg w-[560px] max-h-[90vh] flex flex-col">

                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-100 p-2 rounded-full">
                                <Map className="text-indigo-600" size={20} />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-gray-800">
                                    Zonas — Piso {piso.numero_piso}: {piso.nombre_piso}
                                </h2>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Activá las zonas y visualizá su mapa de stands
                                </p>
                            </div>
                        </div>
                        <button onClick={onCerrar} className="text-gray-400 hover:text-gray-600 transition">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Error */}
                    {errorModal && (
                        <div className="mx-6 mt-4 flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                            <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={18} />
                            <div>
                                <p className="text-sm font-semibold text-red-700">No se pudo procesar la zona</p>
                                <p className="text-sm text-red-600 mt-0.5">{errorModal}</p>
                            </div>
                            <button onClick={() => setErrorModal(null)} className="ml-auto text-red-400">
                                <X size={16} />
                            </button>
                        </div>
                    )}

                    {/* Contenido */}
                    <div className="overflow-y-auto flex-1 p-6">
                        {isLoading && (
                            <p className="text-sm text-gray-400 text-center py-8">Cargando zonas...</p>
                        )}

                        {!isLoading && zonasDisponibles.length === 0 && (
                            <div className="text-center py-8 text-gray-400">
                                <Map size={36} className="mx-auto mb-3 opacity-30" />
                                <p className="text-sm">Este piso no tiene zonas activas configuradas.</p>
                            </div>
                        )}

                        {!isLoading && zonasDisponibles.length > 0 && (
                            <div className="flex flex-col gap-3">
                                {zonasDisponibles.map(zona => {
                                    const zonaEvento = getZonaEvento(zona.zona_id)
                                    const activa = zonaEvento?.estado_id === 1
                                    const sinMapa = !zona.nombreMapa
                                    const enProceso = procesando === zona.zona_id

                                    return (
                                        <div
                                            key={zona.zona_id}
                                            className={`flex items-center justify-between px-4 py-3 rounded-lg border transition
                                                ${activa
                                                    ? "border-green-200 bg-green-50"
                                                    : sinMapa
                                                        ? "border-yellow-200 bg-yellow-50"
                                                        : "border-gray-200 bg-gray-50"}`}
                                        >
                                            <div className="flex flex-col gap-0.5">
                                                <p className="text-sm font-semibold text-gray-800">{zona.nombre}</p>
                                                {zona.descripcion && (
                                                    <p className="text-xs text-gray-400 truncate max-w-[240px]">
                                                        {zona.descripcion}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-2 mt-1">
                                                    {zona.nombreMapa ? (
                                                        <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded font-medium">
                                                            🗺 {zona.nombreMapa}
                                                        </span>
                                                    ) : (
                                                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded font-medium flex items-center gap-1">
                                                            <AlertTriangle size={10} /> Sin mapa asignado
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {/* Botón Ver Mapa — solo si zona activa y tiene mapa */}
                                                {activa && zonaEvento && zona.nombreMapa && (
                                                    <button
                                                        onClick={() => setZonaVerMapa(zonaEvento)}
                                                        className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 px-3 py-1.5 rounded text-xs font-semibold transition"
                                                    >
                                                        <Map size={13} /> Ver Mapa
                                                    </button>
                                                )}

                                                {/* Toggle activa/inactiva */}
                                                <button
                                                    onClick={() => handleToggle(zona)}
                                                    disabled={enProceso}
                                                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-semibold transition disabled:opacity-50
                                                        ${activa
                                                            ? "bg-green-600 hover:bg-green-700 text-white"
                                                            : "bg-gray-300 hover:bg-gray-400 text-gray-700"}`}
                                                >
                                                    {enProceso ? "..." : activa
                                                        ? <><ToggleRight size={14} /> Activa</>
                                                        : <><ToggleLeft size={14} /> Inactiva</>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t flex justify-end">
                        <button
                            onClick={onCerrar}
                            className="bg-gray-100 text-gray-700 px-5 py-2 rounded hover:bg-gray-200 transition text-sm font-medium"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal mapa con stands */}
            {zonaVerMapa && (
                <ModalMapaEvento
                    zona={zonaVerMapa}
                    onCerrar={() => setZonaVerMapa(null)}
                />
            )}
        </>
    )
}