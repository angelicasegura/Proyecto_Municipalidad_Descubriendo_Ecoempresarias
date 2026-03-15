import { authFetch } from "../../auth/AuthFetch"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

export default function MisEventosPage() {

    const { data: usuario } = useQuery({
        queryKey: ["usuario"],
        queryFn: async () => {
            const res = await authFetch("https://localhost:7050/auth/me")
            return res.json()
        }
    })

    const { data: emprendimientos = [] } = useQuery({
        queryKey: ["emprendimientos", usuario?.id],
        queryFn: async () => {
            if (!usuario?.id) return []
            const res = await authFetch(
                `https://localhost:7050/api/emprendimientos/Obtener/Cedula?cedula=${usuario.id}`
            )
            return res.json()
        },
        enabled: !!usuario?.id
    })

    
    return (

        <div className="max-w-6xl mx-auto mt-10">

            <h1 className="text-2xl font-bold mb-6">
                Selecciona un emprendimiento
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {emprendimientos.map((e: any) => (

                    <div key={e.emprendimientoId}
                        className="bg-white shadow rounded-lg p-4">

                        <h3 className="text-lg font-bold">
                            {e.nombreEmprendimiento}
                        </h3>

                        <p className="text-gray-500">
                            {e.descripcion}
                        </p>

                        <Link
                            to={`/mis-eventos/${e.emprendimientoId}`}
                            className="bg-blue-600 text-white px-3 py-1 rounded mt-3 inline-block"
                        >
                            Ver eventos
                        </Link>

                    </div>

                ))}

            </div>

        </div>

    )
}