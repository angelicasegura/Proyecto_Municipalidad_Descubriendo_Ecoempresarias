
import { useState, useEffect } from "react"
import { Button } from "../../../../components/ui/button"

interface InventarioModalProps {
  open: boolean
  initial?: {
    productoId: string
    nombreProducto?: string
    cantidadActual: number
    cantidadMinima: number
  } | null
  onClose: () => void
  onConfirm: (payload: { productoId: string; cantidadActual: number; cantidadMinima: number }) => void
}

export function InventarioModal({ open, initial, onClose, onConfirm }: InventarioModalProps) {
  const [cantidadActual, setCantidadActual] = useState<number>(0)
  const [cantidadMinima, setCantidadMinima] = useState<number>(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initial) {
      setCantidadActual(initial.cantidadActual)
      setCantidadMinima(initial.cantidadMinima)
    }
  }, [initial])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">
            Editar inventario {initial?.nombreProducto ? `- ${initial.nombreProducto}` : ""}
          </h3>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Cantidad actual</label>
            <input
              type="number"
              value={cantidadActual}
              onChange={(e) => setCantidadActual(Number(e.target.value))}
              className="mt-1 block w-full rounded border px-3 py-2"
              min={0}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cantidad mínima</label>
            <input
              type="number"
              value={cantidadMinima}
              onChange={(e) => setCantidadMinima(Number(e.target.value))}
              className="mt-1 block w-full rounded border px-3 py-2"
              min={0}
            />
          </div>
        </div>

        <div className="px-6 py-4 flex justify-end gap-3 border-t">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            onClick={async () => {
              if (!initial) return
              setLoading(true)
              try {
                await onConfirm({
                  productoId: initial.productoId,
                  cantidadActual,
                  cantidadMinima,
                })
              } finally {
                setLoading(false)
              }
            }}
            className="bg-[#f2a33c] hover:bg-[#e6932d] text-white"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Confirmar"}
          </Button>
        </div>
      </div>
    </div>
  )
}
