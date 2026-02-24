import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { obtenerProductosEmprendedor, crearProducto, editarProducto, eliminarProducto} from "../../../types/productosType"
import { obtenerCategorias } from "../../../types/productosType"
import type { Producto } from "../../../types/productosType"
import type { CategoriaProducto } from "../../../types/productosType"
import { Button } from "../../../components/ui/button"
import { Plus } from "lucide-react"
import { MisProductosTable } from "./components/MisProductosTable"
import { ProductoFormModal } from "./components/ProductoFormModal"
import { EliminarProductoModal } from "./components/EliminarProdcutoModal"

export default function MisProductosPage() {
    // Leemos el emprendimientoId directo de la URL /mis-productos/:emprendimientoId
    const { emprendimientoId } = useParams<{ emprendimientoId: string }>()
    const empId = Number(emprendimientoId)

    const [productos, setProductos] = useState<Producto[]>([])
    const [categorias, setCategorias] = useState<CategoriaProducto[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [modalFormOpen, setModalFormOpen] = useState(false)
    const [modalEliminarOpen, setModalEliminarOpen] = useState(false)
    const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null)

    useEffect(() => {
        if (!empId) return

        const cargarDatos = async () => {
            try {
                const [prods, cats] = await Promise.all([
                    obtenerProductosEmprendedor(empId),
                    obtenerCategorias(),
                ])
                setProductos(prods)
                setCategorias(cats)
            } catch (err) {
                setError("No se pudieron cargar los productos")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        cargarDatos()
    }, [empId])

    const refrescarProductos = async () => {
        if (!empId) return
        try {
            const prods = await obtenerProductosEmprendedor(empId)
            setProductos([...prods])
        } catch (err) {
            console.error("Error al refrescar:", err)
        }
    }

    const abrirModalAgregar = () => {
        setProductoSeleccionado(null)
        setModalFormOpen(true)
    }

    const abrirModalEditar = (producto: Producto) => {
        setProductoSeleccionado(producto)
        setModalFormOpen(true)
    }

    const abrirModalEliminar = (producto: Producto) => {
        setProductoSeleccionado(producto)
        setModalEliminarOpen(true)
    }

    const handleConfirmarForm = async (formData: FormData, cambioCritico: boolean) => {
        if (productoSeleccionado) {
            await editarProducto(productoSeleccionado.producto_id, formData)
        } else {
            formData.append("Emprendimiento_id", String(empId))
            await crearProducto(formData)
        }

        await refrescarProductos()

        // Si se creó un producto nuevo, O si se editaron campos que requieren aprobación
        // (nombre, descripción o imagen), mostramos el toast de pendiente
        if (cambioCritico) {
            toast("📋 Producto pendiente de aprobación", {
                duration: 5000,
                style: {
                    background: "#fefce8",
                    color: "#854d0e",
                    border: "1px solid #fde047",
                    fontWeight: "500",
                },
                icon: "⏳",
            })
        }
    }

    const handleConfirmarEliminar = async () => {
        if (!productoSeleccionado) return
        await eliminarProducto(productoSeleccionado.producto_id)
        await refrescarProductos()
        toast.success("Producto eliminado correctamente")
    }

    if (loading) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-10">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-48" />
                    <div className="h-64 bg-gray-200 rounded-xl" />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-10">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Mis productos</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {productos.length} producto{productos.length !== 1 ? "s" : ""} registrado{productos.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <Button onClick={abrirModalAgregar} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Agregar producto
                </Button>
            </div>

            <MisProductosTable
                productos={productos}
                onEditar={abrirModalEditar}
                onEliminar={abrirModalEliminar}
            />

            <ProductoFormModal
                open={modalFormOpen}
                producto={productoSeleccionado}
                categorias={categorias}
                onClose={() => setModalFormOpen(false)}
                onConfirm={handleConfirmarForm}
            />

            <EliminarProductoModal
                open={modalEliminarOpen}
                nombreProducto={productoSeleccionado?.nombreProducto ?? ""}
                onClose={() => setModalEliminarOpen(false)}
                onConfirm={handleConfirmarEliminar}
            />
        </div>
    )
}