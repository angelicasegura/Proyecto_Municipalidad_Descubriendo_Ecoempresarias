import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { authFetch } from "../../../auth/AuthFetch"
import { Building2, ToggleLeft, ToggleRight, Plus, Map } from "lucide-react"
import type { EventoPisoResponse, EventoPisoRequest } from "../../../types/eventoPisoType"
import {
    fetchPisosEvento,
    agregarPisoAEvento,
    activarPisoEvento,
    inactivarPisoEvento
} from "../actions/fechEventoPiso"
import ModalGestionarZonas from "./ModalGestionarZonas"

interface PisoLugar {
    piso_id: number
    nombre_Piso: string
    numero_Piso: number
    nombreEstado: string
}

interface Props {
    eventoId: number
    lugarId: number
    onCerrar: () => void
}

export default function ModalGestionarPisos({ eventoId, lugarId, onCerrar }: Props) {

    const queryClient = useQueryClient()
    const queryKey = ["pisosEvento", eventoId]

    const [procesando, setProcesando] = useState<number | null>(null)
    const [pisoZonas, setPisoZonas] = useState<EventoPisoResponse | null>(null)

    // Pisos ya asignados al evento
    const { data: pisosEvento = [], isLoading: loadingEvento } = useQuery<EventoPisoResponse[]>({
        queryKey,
        queryFn: () => fetchPisosEvento(eventoId),
    })

    // Todos los pisos del lugar
    const { data: pisosLugar = [], isLoading: loadingLugar } = useQuery<PisoLugar[]>({
        queryKey: ["pisos", lugarId],
        queryFn: async () => {
            const res = await authFetch(`https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Piso/ObtenerPisoPorLugar/${lugarId}`)
            if (res.status === 204) return []
            if (!res.ok) throw new Error("Error al obtener pisos del lugar")
            return res.json()
        },
    })

    const refrescar = () => queryClient.invalidateQueries({ queryKey })

    const getPisoEvento = (piso_id: number): EventoPisoResponse | undefined =>
        pisosEvento.find(p => p.piso_id === piso_id)

    const handleToggle = async (piso: PisoLugar) => {
        setProcesando(piso.piso_id)
        try {
            const pisoEvento = getPisoEvento(piso.piso_id)
            const request: EventoPisoRequest = {
                evento_id: eventoId,
                piso_id: piso.piso_id,
                estado_id: 1,
            }

            if (!pisoEvento) {
                await agregarPisoAEvento(request)
            } else if (pisoEvento.estado_id === 1) {
                // Inactivar piso → el backend inactiva sus zonas en cascada
                await inactivarPisoEvento({ ...request, estado_id: 0 })
            } else {
                await activarPisoEvento(request)
            }

            await refrescar()
        } finally {
            setProcesando(null)
        }
    }

    const isLoading = loadingEvento || loadingLugar

    return (
        <>
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-[560px] max-h-[90vh] flex flex-col">

                    {/* Header */}
                    <div className="flex items-center gap-3 p-6 border-b">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <Building2 className="text-blue-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-gray-800">Gestionar Pisos del Evento</h2>
                            <p className="text-xs text-gray-500 mt-0.5">
                                Activá los pisos y luego configurá sus zonas
                            </p>
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="overflow-y-auto flex-1 p-6">

                        {isLoading && (
                            <p className="text-sm text-gray-400 text-center py-8">Cargando pisos...</p>
                        )}

                        {!isLoading && pisosLugar.length === 0 && (
                            <div className="text-center py-8 text-gray-400">
                                <Building2 size={36} className="mx-auto mb-3 opacity-30" />
                                <p className="text-sm">El lugar no tiene pisos configurados aún.</p>
                            </div>
                        )}

                        {!isLoading && pisosLugar.length > 0 && (
                            <div className="flex flex-col gap-3">
                                {pisosLugar.map(piso => {
                                    const pisoEvento = getPisoEvento(piso.piso_id)
                                    const activo = pisoEvento?.estado_id === 1
                                    const enProceso = procesando === piso.piso_id

                                    return (
                                        <div
                                            key={piso.piso_id}
                                            className={`flex items-center justify-between px-4 py-3 rounded-lg border transition
                        ${activo ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={`text-xs font-bold px-2 py-1 rounded
                          ${activo ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}`}>
                                                    Piso {piso.numero_Piso}
                                                </span>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800">{piso.nombre_Piso}</p>
                                                    {!pisoEvento && (
                                                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                                            <Plus size={10} /> Sin asignar al evento
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {/* Botón ver zonas — solo si el piso está activo en el evento */}
                                                {activo && pisoEvento && (
                                                    <button
                                                        onClick={() => setPisoZonas(pisoEvento)}
                                                        className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 px-3 py-1.5 rounded text-xs font-semibold transition"
                                                    >
                                                        <Map size={13} /> Ver Zonas
                                                    </button>
                                                )}

                                                {/* Toggle activar/inactivar piso */}
                                                <button
                                                    onClick={() => handleToggle(piso)}
                                                    disabled={enProceso}
                                                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-semibold transition disabled:opacity-50
                            ${activo
                                                            ? "bg-green-600 hover:bg-green-700 text-white"
                                                            : "bg-gray-300 hover:bg-gray-400 text-gray-700"}`}
                                                >
                                                    {enProceso ? (
                                                        "..."
                                                    ) : activo ? (
                                                        <><ToggleRight size={14} /> Activo</>
                                                    ) : (
                                                        <><ToggleLeft size={14} /> Inactivo</>
                                                    )}
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

            {/* Modal zonas del piso seleccionado */}
            {pisoZonas && (
                <ModalGestionarZonas
                    eventoId={eventoId}
                    piso={pisoZonas}
                    onCerrar={() => setPisoZonas(null)}
                />
            )}
        </>
    )
}