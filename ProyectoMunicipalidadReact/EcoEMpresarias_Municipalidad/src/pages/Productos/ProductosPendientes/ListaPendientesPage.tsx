// Página que muestra la tabla de productos pendientes.
// Lee de la URL si son "creados" o "editados" y llama al endpoint correspondiente.

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import {
    obtenerProductosCreadosPendientes,
    obtenerProductosEditadosPendientes,
    aprobarProducto,
    rechazarProducto,
} from "../../../types/productosType"
import type { Producto } from "../../../types/productosType"
import { Button } from "../../../components/ui/button"
import { ProductosPendientesTable } from "./components/ProductoPendientesTable"
import { ConfirmarAccionModal } from "./components/ConfirmarAccionModal"

export default function ListaPendientesPage() {
    // "tipo" viene de la URL: /productos-pendientes/creados o /productos-pendientes/editados
    const { tipo } = useParams<{ tipo: "creados" | "editados" }>()
    const navigate = useNavigate()

    const esCreados = tipo === "creados"

    const [productos, setProductos] = useState<Producto[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Control del modal
    const [modalOpen, setModalOpen] = useState(false)
    const [accion, setAccion] = useState<"aprobar" | "rechazar">("aprobar")
    const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null)

    const cargarProductos = async () => {
        try {
            const data = esCreados
                ? await obtenerProductosCreadosPendientes()
                : await obtenerProductosEditadosPendientes()
            setProductos(data)
        } catch (err) {
            setError("No se pudieron cargar los productos pendientes")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        cargarProductos()
    }, [tipo])

    const abrirModal = (producto: Producto, accionTipo: "aprobar" | "rechazar") => {
        setProductoSeleccionado(producto)
        setAccion(accionTipo)
        setModalOpen(true)
    }

    const handleConfirmar = async () => {
        if (!productoSeleccionado) return

        if (accion === "aprobar") {
            await aprobarProducto(productoSeleccionado.producto_id)
            toast.success(`"${productoSeleccionado.nombreProducto}" aprobado correctamente`)
        } else {
            await rechazarProducto(productoSeleccionado.producto_id)
            toast.error(`"${productoSeleccionado.nombreProducto}" rechazado`)
        }

        // Refrescamos la tabla — el producto aprobado/rechazado desaparece
        await cargarProductos()
    }

    if (loading) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-10">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-64" />
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

            <div className="flex items-center gap-4">
                <Button variant="ghost" className="pl-0 text-muted-foreground" onClick={() => navigate(-1)}>
                    ← Volver
                </Button>
            </div>

            <div>
                <h1 className="text-2xl font-bold">
                    {esCreados ? "Productos creados pendientes" : "Productos editados pendientes"}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    {productos.length} producto{productos.length !== 1 ? "s" : ""} esperando revisión
                </p>
            </div>

            <ProductosPendientesTable
                productos={productos}
                onAprobar={(p) => abrirModal(p, "aprobar")}
                onRechazar={(p) => abrirModal(p, "rechazar")}
            />

            <ConfirmarAccionModal
                open={modalOpen}
                accion={accion}
                nombreProducto={productoSeleccionado?.nombreProducto ?? ""}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirmar}
            />
        </div>
    )
}