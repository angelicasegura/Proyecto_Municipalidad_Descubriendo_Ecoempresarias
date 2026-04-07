import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { authFetch } from "../../../../auth/AuthFetch"
import { Map } from "lucide-react"
import type { ZonaResponse, ZonaRequest } from "../../../../types/lugarType"

interface MapaOption {
    mapa_id: number
    nombre: string
    estadoNombre: string
}

interface Props {
    zona: ZonaResponse
    pisoId: number
    onConfirmar: (zona: ZonaRequest, id: number) => Promise<void>
    onCancelar: () => void
}

export default function ModalAsignarMapa({ zona, pisoId, onConfirmar, onCancelar }: Props) {

    const [mapaSeleccionado, setMapaSeleccionado] = useState<number | null>(
        null // arranca sin selección aunque ya tenga mapa asignado
    )
    const [guardando, setGuardando] = useState(false)

    const { data: mapas = [], isLoading } = useQuery<MapaOption[]>({
        queryKey: ["mapas"],
        queryFn: async () => {
            const res = await authFetch("https://localhost:7050/api/Mapa/ObtenerMapas")
            if (res.status === 204) return []
            if (!res.ok) throw new Error("Error al obtener mapas")
            return res.json()
        }
    })

    // Solo mostrar mapas activos
    const mapasActivos = mapas.filter(m => m.estadoNombre === "ACTIVO" || m.estadoNombre === "Activo")

    const handleConfirmar = async () => {
        if (!mapaSeleccionado) return
        setGuardando(true)
        try {
            const zonaActualizada: ZonaRequest = {
                Nombre: zona.nombre,
                Descripcion: zona.descripcion,
                Piso_id: pisoId,
                Mapa_id: mapaSeleccionado,
                Estado_id: zona.estadoNombre === "ACTIVO" || zona.estadoNombre === "Activo" ? 1 : 0,
            }
            await onConfirmar(zonaActualizada, zona.zona_id)
        } finally {
            setGuardando(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[420px] p-6">

                <div className="flex items-center gap-3 mb-1">
                    <div className="bg-blue-100 p-2 rounded-full">
                        <Map className="text-blue-600" size={20} />
                    </div>
                    <h2 className="text-base font-bold text-gray-800">Asignar Mapa</h2>
                </div>

                <p className="text-sm text-gray-500 mb-5 ml-1">
                    Zona: <span className="font-semibold text-gray-700">{zona.nombre}</span>
                    {zona.nombreMapa && (
                        <span className="ml-2 text-xs text-blue-500">(Mapa actual: {zona.nombreMapa})</span>
                    )}
                </p>

                {isLoading && <p className="text-sm text-gray-400 mb-4">Cargando mapas...</p>}

                {!isLoading && mapasActivos.length === 0 && (
                    <p className="text-sm text-red-500 mb-4">No hay mapas activos disponibles.</p>
                )}

                {!isLoading && mapasActivos.length > 0 && (
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Seleccioná un mapa
                        </label>
                        <select
                            className="w-full border p-2 rounded text-sm"
                            value={mapaSeleccionado ?? ""}
                            onChange={e => setMapaSeleccionado(Number(e.target.value))}
                        >
                            <option value="">-- Seleccionar mapa --</option>
                            {mapasActivos.map(m => (
                                <option key={m.mapa_id} value={m.mapa_id}>
                                    {m.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancelar}
                        disabled={guardando}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition text-sm font-medium disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirmar}
                        disabled={guardando || !mapaSeleccionado}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm font-medium disabled:opacity-50"
                    >
                        {guardando ? "Asignando..." : "Asignar Mapa"}
                    </button>
                </div>

            </div>
        </div>
    )
}
