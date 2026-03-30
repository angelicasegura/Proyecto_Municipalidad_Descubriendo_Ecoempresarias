import { useQuery } from "@tanstack/react-query"
import { fetchLugares } from "./actions/fetchLugares"
import { Link } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { inactivarLugar } from "./actions/inactivarLugar"

export default function AdminLugaresPage() {

    const { data: lugares = [], isLoading } = useQuery({
        queryKey: ["lugares"],
        queryFn: fetchLugares
    })
    const queryClient = useQueryClient()

    const inactivarMutation = useMutation({
        mutationFn: inactivarLugar,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["lugares"]
            })
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

                            const estadoActivo = l.nombreEstado === "Activo"

                            return (

                                <tr
                                    key={l.lugar_id}
                                    className="hover:bg-gray-50 transition">

                                    <td className="px-6 py-3 font-medium text-gray-700">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-3 font-semibold text-gray-800">
                                        {l.nombre}
                                    </td>

                                    <td className="px-6 py-3 text-gray-600">
                                        {l.provincia}
                                    </td>

                                    <td className="px-6 py-3 text-gray-600">
                                        {l.canton}
                                    </td>

                                    <td className="px-6 py-3 text-gray-600">
                                        {l.distrito}
                                    </td>

                                    <td className="px-6 py-3">

                                        <span
                                            className={`px-3 py-1 text-xs font-semibold rounded-full ${estadoActivo
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}>

                                            {l.nombreEstado}

                                        </span>

                                    </td>

                                    <td className="px-6 py-3 flex gap-2 justify-center">

                                        <Link
                                            to={`/admin/editar-lugar/${l.lugar_id}`}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-semibold">
                                            Editar
                                        </Link>

                                        <button
                                            onClick={() => {

                                                if (confirm("¿Desea inactivar este lugar?")) {
                                                    inactivarMutation.mutate(l.lugar_id)
                                                }

                                            }}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold">
                                            Inactivar
                                        </button>

                                    </td>

                                </tr>

                            )

                        })}

                    </tbody>

                </table>

            </div>

        </div>

    )
}