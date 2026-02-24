// Este modal se usa TANTO para agregar como para editar un producto.
// Si recibe un `producto` como prop, sabe que está en modo edición.
// Si no recibe nada, sabe que está en modo creación.

import { useEffect, useState } from "react"
import { Button } from "../../../../components/ui/button"
import type { Producto } from "../../../../types/productosType"
import type { CategoriaProducto } from "../../../../types/productosType"

// Cambiá la interfaz Props:
interface Props {
    open: boolean
    producto?: Producto | null
    categorias: CategoriaProducto[]
    onClose: () => void
    onConfirm: (formData: FormData, cambioCritico: boolean) => Promise<void>
    //                              👆 nuevo parámetro
}

export function ProductoFormModal({ open, producto, categorias, onClose, onConfirm }: Props) {
    const esEdicion = !!producto  // true si estamos editando

    // Estado del formulario — cada campo es su propio estado
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [precio, setPrecio] = useState("")
    const [descuento, setDescuento] = useState("")
    const [categoriaId, setCategoriaId] = useState("")
    const [imagen, setImagen] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Cuando abrimos el modal en modo edición, prellenamos los campos con los datos actuales
    useEffect(() => {
        if (producto) {
            setNombre(producto.nombreProducto)
            setDescripcion(producto.descripcion)
            setPrecio(String(producto.precio))
            setDescuento(String(producto.descuento ?? ""))
            setCategoriaId(producto.categoria_id)
        } else {
            // Si es creación, limpiamos todo
            setNombre("")
            setDescripcion("")
            setPrecio("")
            setDescuento("")
            setCategoriaId("")
            setImagen(null)
        }
        setError(null)
    }, [producto, open])

    if (!open) return null

    const handleSubmit = async () => {
        if (!nombre || !descripcion || !precio || !categoriaId) {
            setError("Por favor completá todos los campos obligatorios.")
            return
        }

        const formData = new FormData()
        formData.append("NombreProducto", nombre)
        formData.append("Descripcion", descripcion)
        formData.append("Precio", precio)
        formData.append("Descuento", descuento || "0")
        formData.append("Categoria_id", categoriaId)
        formData.append("Estado_id", "1")
        if (producto?.ruta_Imagen) {
            formData.append("Ruta_Imagen", producto.ruta_Imagen)
        }
        if (imagen) {
            formData.append("Imagen", imagen)
        }

        // Detectamos si se tocaron campos críticos que requieren aprobación
        const esCreacion = !producto
        const cambioCritico =
            esCreacion ||
            nombre !== producto?.nombreProducto ||
            descripcion !== producto?.descripcion ||
            imagen !== null  // si subió imagen nueva

        setLoading(true)
        setError(null)
        try {
            await onConfirm(formData, cambioCritico)
            onClose()
        } catch (err) {
            setError("Ocurrió un error. Intentá de nuevo.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">

                {/* Header del modal */}
                <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold">
                        {esEdicion ? `Editar: ${producto?.nombreProducto}` : "Agregar nuevo producto"}
                    </h3>
                </div>

                {/* Cuerpo del formulario */}
                <div className="px-6 py-4 space-y-4">

                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre del producto <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Ej: Mermelada de fresa"
                            maxLength={200}
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            rows={3}
                            placeholder="Describí tu producto..."
                            maxLength={500}
                        />
                    </div>

                    {/* Precio y Descuento en fila */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Precio (₡) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="0.00"
                                min={0}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Descuento (%)
                            </label>
                            <input
                                type="number"
                                value={descuento}
                                onChange={(e) => setDescuento(e.target.value)}
                                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="0"
                                min={0}
                                max={100}
                            />
                        </div>
                    </div>

                    {/* Categoría */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Categoría <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={categoriaId}
                            onChange={(e) => setCategoriaId(e.target.value)}
                            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="empty">Seleccioná una categoría</option>
                            {categorias.map((cat) => (
                                <option key={cat.categoria_Id} value={cat.categoria_Id}>
                                    {cat.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Imagen */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Imagen del producto {!esEdicion && <span className="text-red-500">*</span>}
                        </label>
                        {/* Si estamos editando y ya tiene imagen, mostramos preview */}
                        {esEdicion && producto?.ruta_Imagen && !imagen && (
                            <div className="mb-2">
                                <img
                                    src={`https://localhost:7050/api/Images/Buscar/3/${producto.ruta_Imagen}`}
                                    alt="Imagen actual"
                                    className="h-20 w-20 object-cover rounded-lg border"
                                />
                                <p className="text-xs text-muted-foreground mt-1">Imagen actual (subí una nueva para reemplazarla)</p>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImagen(e.target.files?.[0] ?? null)}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                    )}
                </div>

                {/* Footer con botones */}
                <div className="px-6 py-4 border-t flex justify-end gap-3">
                    <Button variant="ghost" onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Guardando..." : esEdicion ? "Guardar cambios" : "Agregar producto"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
