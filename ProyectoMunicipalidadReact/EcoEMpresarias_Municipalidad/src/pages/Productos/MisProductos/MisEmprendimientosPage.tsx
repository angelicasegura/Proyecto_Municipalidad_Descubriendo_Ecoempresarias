import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../auth/AuthContext"
import { obtenerEmprendimientosPorUsuario } from "../../../types/emprendedoresType"
import type { Emprendimiento } from "../../../types/emprendedoresType"
import { Building2 } from "lucide-react"

export default function MisEmprendimientosPage() {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [emprendimientos, setEmprendimientos] = useState<Emprendimiento[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!user) return

        const cargar = async () => {
            try {
                const data = await obtenerEmprendimientosPorUsuario(user.id)
                setEmprendimientos(data)
            } catch (err) {
                setError("No se pudieron cargar tus emprendimientos")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        cargar()
    }, [user])

    if (loading) {
        return (
            <div className="mx-auto max-w-5xl px-4 py-10">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="rounded-2xl border p-6 animate-pulse space-y-3">
                            <div className="h-16 w-16 rounded-full bg-gray-200 mx-auto" />
                            <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto" />
                            <div className="h-4 bg-gray-200 rounded w-full" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="mx-auto max-w-5xl px-4 py-10">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Mis emprendimientos</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Seleccioná un emprendimiento para gestionar sus productos
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {emprendimientos.map((emp) => (
                    <div
                        key={emp.emprendimientoId}
                        onClick={() => navigate(`/mis-productos/${emp.emprendimientoId}`)}
                        className="cursor-pointer rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md hover:border-primary transition-all space-y-4"
                    >
                        {/* Logo o ícono por defecto */}
                        <div className="flex justify-center">
                            {emp.ruta_Imagen_Logo ? (
                                <img
                                    src={`https://localhost:7050/api/Images/Buscar/3/${emp.ruta_Imagen_Logo}`}
                                    alt={emp.nombre}
                                    className="h-16 w-16 rounded-full object-cover border"
                                />
                            ) : (
                                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Building2 className="h-8 w-8 text-primary" />
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="text-center space-y-1">
                            <h3 className="font-semibold text-base">{emp.nombre}</h3>
                            {emp.descripcion && (
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {emp.descripcion}
                                </p>
                            )}
                            {emp.email && (
                                <p className="text-xs text-muted-foreground">{emp.email}</p>
                            )}
                        </div>

                        {/* Footer de la card */}
                        <div className="pt-2 border-t text-center">
                            <span className="text-xs text-primary font-medium">
                                Ver productos →
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}