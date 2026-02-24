// Modal genérico de confirmación para aprobar o rechazar.
// Recibe el tipo de acción y ajusta colores y textos automáticamente.

import { useState } from "react"
import { Button } from "../../../../components/ui/button"

interface Props {
    open: boolean
    accion: "aprobar" | "rechazar"
    nombreProducto: string
    onClose: () => void
    onConfirm: () => Promise<void>
}

export function ConfirmarAccionModal({ open, accion, nombreProducto, onClose, onConfirm }: Props) {
    const [loading, setLoading] = useState(false)

    if (!open) return null

    const esAprobar = accion === "aprobar"

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
                    <h3 className="text-lg font-semibold">
                        {esAprobar ? "Aprobar producto" : "Rechazar producto"}
                    </h3>
                </div>

                <div className="px-6 py-5">
                    <p className="text-sm text-gray-600">
                        ¿Estás seguro que querés{" "}
                        <span className={`font-semibold ${esAprobar ? "text-green-600" : "text-red-600"}`}>
                            {esAprobar ? "aprobar" : "rechazar"}
                        </span>{" "}
                        el producto{" "}
                        <span className="font-semibold text-gray-900">"{nombreProducto}"</span>?
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                        {esAprobar
                            ? "El producto pasará a estado Activo y será visible para los usuarios."
                            : "El producto pasará a estado Rechazado y el emprendedor será notificado."}
                    </p>
                </div>

                <div className="px-6 py-4 border-t flex justify-end gap-3">
                    <Button variant="ghost" onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={loading}
                        className={esAprobar
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-red-600 hover:bg-red-700 text-white"
                        }
                    >
                        {loading
                            ? "Procesando..."
                            : esAprobar ? "Sí, aprobar" : "Sí, rechazar"
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}