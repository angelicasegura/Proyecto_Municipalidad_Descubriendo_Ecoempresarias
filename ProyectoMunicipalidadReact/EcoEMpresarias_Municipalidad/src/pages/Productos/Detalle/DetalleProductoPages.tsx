import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import type { Producto } from "../../../types/productosType"
import { obtenerProductoPorId } from "../../../types/productosType"
import { useAuth } from "../../../auth/AuthContext"
import { Button } from "../../../components/ui/button"
import ProductoInfo from '../components/ProductoInfo';
import ProductoCantidad from "../../public/DetalleProducto/components/ProductoCantidad"


export default function DetalleProductoPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { user } = useAuth() // obtenemos el usuario logueado del contexto

    const [producto, setProducto] = useState<Producto | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        if (!id) return

        const fetchProducto = async () => {
            try {
                const data = await obtenerProductoPorId(id)
                setProducto(data)
            } catch (err) {
                setError("No se pudo cargar el producto")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchProducto()
    }, [id])

    // ¿El usuario logueado es el dueño de este producto?
    // Condiciones: debe tener rol EMPRENDEDOR Y su id debe coincidir con usuarioDueño del producto
    const esDueño =
        user?.rol === "EMPRENDEDOR" &&
        producto !== null &&
        user.id === producto.usuarioDueño

    // --- PANTALLA DE CARGA ---
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-muted-foreground animate-pulse">Cargando producto...</p>
            </div>
        )
    }

    // --- PANTALLA DE ERROR ---
    if (error || !producto) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-red-500">{error ?? "Producto no encontrado"}</p>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 md:py-10">

            {/* Botón volver */}
            <Button
                variant="ghost"
                className="pl-0 text-muted-foreground"
                onClick={() => navigate(-1)}
            >
                ← Volver
            </Button>

            <div className="grid md:grid-cols-2 gap-12 items-start">

                {/* IZQUIERDA — Imagen */}
                <div className="rounded-2xl border bg-white p-10 flex items-center justify-center">
                    {producto.ruta_Imagen ? (
                        <img
                            src={`https://localhost:7050/api/Images/Buscar/3/${producto.ruta_Imagen}`}
                            alt={producto.nombreProducto}
                            className="max-h-[450px] w-auto object-contain"
                        />
                    ) : (
                        <div className="text-muted-foreground text-sm">Sin imagen disponible</div>
                    )}
                </div>

                {/* DERECHA — Info + botones */}
                <div className="flex flex-col gap-6">
                    <ProductoInfo producto={producto} />

                    <ProductoCantidad cantidad={cantidad} setCantidad={setCantidad} />
                    

                    {/* Solo se muestra si el usuario es EMPRENDEDOR Y es dueño */}
                    {esDueño && (
                        <div className="flex gap-3 pt-2">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => console.log("Editar:", producto.producto_id)}
                            >
                                Editar
                            </Button>
                            <Button
                                variant="destructive"
                                className="flex-1"
                                onClick={() => console.log("Eliminar:", producto.producto_id)}
                            >
                                Eliminar
                            </Button>
                        </div>
                    )}

                    <Button
                        size="lg"
                        className="w-full"
                        onClick={() => console.log("Agregar al carrito:", producto.producto_id)}
                    >
                        Agregar al carrito
                    </Button>
                </div>
            </div>
        </div>
    )
}