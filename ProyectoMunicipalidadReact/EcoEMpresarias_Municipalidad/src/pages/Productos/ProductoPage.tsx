import { useEffect, useState } from "react"
import type { Producto } from "../../types/productosType"
import { obtenerProductosFiltrados } from "../../types/productosType"
import type { Categoria } from "../../types/categoriaType"
import { obtenerCategoriasFiltrado } from "../../types/categoriaType"
import { useDebounce } from "../../types/useDebounce"
import ProductoCard from "./components/ProductoCard"
import { BarraBusqueda } from "./components/BarraBusqueda"
import { FiltroCategoria } from "./components/FiltroCategoria"
import { PackageOpen } from "lucide-react"

export default function ProductosPage() {
    const [productos, setProductos] = useState<Producto[]>([])
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [nombre, setNombre] = useState("")
    const [categoriaId, setCategoriaId] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const nombreDebounced = useDebounce(nombre, 400)

    // Cargar categorías una sola vez, al montar
    useEffect(() => {
        obtenerCategoriasFiltrado()
            .then(setCategorias)
            .catch((err) => console.error("Error al cargar categorías:", err))
    }, [])

    // Buscar productos cada vez que cambia el nombre (debounced) o la categoría
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                setLoading(true)
                const data = await obtenerProductosFiltrados(nombreDebounced, categoriaId)
                setProductos(data)
                setError(null)
            } catch (err) {
                setError("No se pudieron cargar los productos")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchProductos()
    }, [nombreDebounced, categoriaId])

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">Productos</h1>

            {/* Barra de filtros */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <BarraBusqueda valor={nombre} onChange={setNombre} />
                <FiltroCategoria
                    categorias={categorias}
                    categoriaSeleccionada={categoriaId}
                    onChange={setCategoriaId}
                />
            </div>

            {/* --- PANTALLA DE CARGA --- */}
            {loading && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
            )}

            {/* --- PANTALLA DE ERROR --- */}
            {!loading && error && (
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-red-50 py-16">
                    <p className="text-lg font-medium text-red-600">{error}</p>
                </div>
            )}

            {/* --- SIN RESULTADOS --- */}
            {!loading && !error && productos.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-muted/50 py-16">
                    <PackageOpen className="h-12 w-12 text-muted-foreground" />
                    <p className="text-lg font-medium text-muted-foreground">
                        No se encontraron productos
                    </p>
                </div>
            )}

            {/* --- RESULTADOS --- */}
            {!loading && !error && productos.length > 0 && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {productos.map((producto) => (
                        <ProductoCard key={producto.producto_id} producto={producto} />
                    ))}
                </div>
            )}
        </div>
    )
}