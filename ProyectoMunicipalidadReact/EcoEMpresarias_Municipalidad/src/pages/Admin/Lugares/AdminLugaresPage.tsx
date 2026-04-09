import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { fetchLugares } from "./actions/fetchLugares"
import { inactivarLugar } from "./actions/inactivarLugar"
import ModalConfirmar from "./components/ModalConfirmar"

export default function AdminLugaresPage() {

    const queryClient = useQueryClient()
    const [lugarAInactivar, setLugarAInactivar] = useState<any | null>(null)

    const { data: lugares = [], isLoading } = useQuery({
        queryKey: ["lugares"],
        queryFn: fetchLugares
    })

    const inactivarMutation = useMutation({
        mutationFn: inactivarLugar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lugares"] })
            setLugarAInactivar(null)
        }
    })

    if (isLoading) return <p>Cargando lugares...</p>

    return (
        <div className="max-w-6xl mx-auto mt-10 mb-20">

            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">
                    Administración de Lugares
                </h1>
                <Link
                    to="/admin/crear-lugar"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Crear Lugar
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-xl overflow-hidden">
                <table className="w-full text-sm text-left">

                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3">Provincia</th>
                            <th className="px-6 py-3">Cantón</th>
                            <th className="px-6 py-3">Distrito</th>
                            <th className="px-6 py-3">Estado</th>
                            <th className="px-6 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {lugares.map((l: any, index: number) => {
                            const estadoActivo = l.nombreEstado === "Activo" || l.nombreEstado === "ACTIVO"
                            return (
                                <tr key={l.lugar_id} className="hover:bg-gray-50 transition">

                                    <td className="px-6 py-3 font-medium text-gray-700">{index + 1}</td>

                                    <td className="px-6 py-3 font-semibold text-gray-800">{l.nombre}</td>

                                    <td className="px-6 py-3 text-gray-600">{l.provincia}</td>
                                    <td className="px-6 py-3 text-gray-600">{l.canton}</td>
                                    <td className="px-6 py-3 text-gray-600">{l.distrito}</td>

                                    <td className="px-6 py-3">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full
                                            ${estadoActivo
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"}`}>
                                            {l.nombreEstado}
                                        </span>
                                    </td>

                                    <td className="px-6 py-3">
                                        <div className="flex gap-2 justify-center flex-wrap">

                                            <Link
                                                to={`/admin/lugares/${l.lugar_id}`}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-semibold transition"
                                            >
                                                Ver Detalle
                                            </Link>

                                            <Link
                                                to={`/admin/editar-lugar/${l.lugar_id}`}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-semibold"
                                            >
                                                Editar
                                            </Link>

                                            <button
                                                onClick={() => setLugarAInactivar(l)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold transition"
                                            >
                                                Inactivar
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>

            {/* Modal confirmar inactivar lugar */}
            {lugarAInactivar && (
                <ModalConfirmar
                    titulo="Inactivar Lugar"
                    mensaje={`¿Estás seguro que querés inactivar el lugar "${lugarAInactivar.nombre}"?`}
                    onConfirmar={() => inactivarMutation.mutate(lugarAInactivar.lugar_id)}
                    onCancelar={() => setLugarAInactivar(null)}
                    cargando={inactivarMutation.isPending}
                />
            )}

        </div>
    )
}