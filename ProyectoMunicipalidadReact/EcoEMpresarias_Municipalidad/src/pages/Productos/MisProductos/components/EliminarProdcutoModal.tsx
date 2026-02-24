// Modal simple de confirmación antes de eliminar/inactivar un producto.
// Muestra el nombre del producto para que el usuario confirme que es el correcto.

import { useState } from "react"
import { Button } from "../../../../components/ui/button"

interface Props {
    open: boolean
    nombreProducto: string
    onClose: () => void
    onConfirm: () => Promise<void>
}

export function EliminarProductoModal({ open, nombreProducto, onClose, onConfirm }: Props) {
    const [loading, setLoading] = useState(false)

    if (!open) return null

    const handleConfirm = async () => {
        setLoading(true)
        try {
            await onConfirm()
            onClose()
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm mx-4">

                <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold">Eliminar producto</h3>
                </div>

                <div className="px-6 py-5">
                    <p className="text-sm text-gray-600">
                        ¿Estás seguro que querés eliminar{" "}
                        <span className="font-semibold text-gray-900">"{nombreProducto}"</span>?
                        Esta acción lo marcará como inactivo.
                    </p>
                </div>

                <div className="px-6 py-4 border-t flex justify-end gap-3">
                    <Button variant="ghost" onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={handleConfirm} disabled={loading}>
                        {loading ? "Eliminando..." : "Sí, eliminar"}
                    </Button>
                </div>
            </div>
        </div>
    )
}