import { useEffect, useState } from "react"
import type { Producto } from "../../types/productosType"
import { obtenerProductos} from "../../types/productosType"
import ProductoCard from "./components/ProductoCard"
import { PackageOpen } from "lucide-react"


export default function ProductosPage() {
    // productos que llegan de la API
    const [productos, setProductos] = useState<Producto[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Esta función se ejecuta cuando el componente se monta por primera vez
        const fetchProductos = async () => {
            try {
                const data = await obtenerProductos()
                setProductos(data)
            } catch (err) {
                setError("No se pudieron cargar los productos")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchProductos()
    }, []) 

    // --- PANTALLA DE CARGA ---
    if (loading) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-10">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {/* Mostramos 8 skeletons mientras carga */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="rounded-2xl border overflow-hidden animate-pulse">
                            <div className="aspect-[4/3] bg-gray-200" />
                            <div className="p-4 space-y-2">
                                <div className="h-3 bg-gray-200 rounded w-20" />
                                <div className="h-5 bg-gray-200 rounded w-3/4" />
                                <div className="h-4 bg-gray-200 rounded w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // --- PANTALLA DE ERROR ---
    if (error) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-10">
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-red-50 py-16">
                    <p className="text-lg font-medium text-red-600">{error}</p>
                </div>
            </div>
        )
    }

    // --- PANTALLA SIN RESULTADOS ---
    if (productos.length === 0) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-10">
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-muted/50 py-16">
                    <PackageOpen className="h-12 w-12 text-muted-foreground" />
                    <p className="text-lg font-medium text-muted-foreground">
                        No se encontraron productos
                    </p>
                </div>
            </div>
        )
    }

    // --- PANTALLA PRINCIPAL ---
    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">Productos</h1>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {productos.map((producto) => (
                    <ProductoCard
                        key={producto.producto_id}
                        producto={producto}
                    />
                ))}
            </div>
        </div>
    )
}