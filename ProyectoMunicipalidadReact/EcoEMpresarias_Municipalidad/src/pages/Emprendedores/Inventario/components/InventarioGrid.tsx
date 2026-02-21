// components/InventarioGrid.tsx
import { useMemo, useState } from "react"
import { Button } from "../../../../components/ui/button"
import { Pencil } from "lucide-react"
import { type Inventario, type InventarioRequest } from "../../../../types/productosType"
import { BannerInventario } from "./bannerInventario"
import { handleActualizarInventario } from "../Actions/hanldeActualizarInventario"
import { InventarioModal } from "./InventarioModal"

interface InventarioGridProps {
  items: Inventario[]
  CedulaJuridica: string
  emprendimientoId?: number
  onUpdated?: (updated: InventarioRequest) => void
}

export function InventarioGrid({ items, CedulaJuridica, emprendimientoId, onUpdated }: InventarioGridProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState<{
    productoId: string
    nombreProducto?: string
    cantidadActual: number
    cantidadMinima: number
    estadoId: number

  } | null>(null)

  const totalUnidades = useMemo(() => items.reduce((s, it) => s + (it.cantidadActual ?? 0), 0), [items])

  const openModalFor = (item: Inventario) => {
    setSelected({
      productoId: item.productoId,
      nombreProducto: item.nombreProducto,
      cantidadActual: item.cantidadActual,
      cantidadMinima: item.cantidadMinima,
      estadoId: item.estadoId,
    })
    setModalOpen(true)
  }

  const handleConfirm = async (payload: { productoId: string; cantidadActual: number; cantidadMinima: number; }) => {
    if (!selected || !emprendimientoId) {
      console.error("Falta emprendimientoId o selected")
      setModalOpen(false)
      return
    }

    const fullPayload: InventarioRequest = {
      ...payload,
      estadoId: selected.estadoId,
    }

    try {
      await handleActualizarInventario(fullPayload, CedulaJuridica, emprendimientoId)
      // notificar al padre para que actualice la UI si lo desea
      onUpdated?.(fullPayload)
      setModalOpen(false)
    } catch (err) {
      console.error("Error actualizando inventario:", err)
      // opcional: mostrar toast de error
      setModalOpen(false)
    }
  }

  return (
    <div >
      <BannerInventario />

      <div className="max-w-5xl mx-auto shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="gradient-hero text-white">
            <tr>
              <th className="px-6 py-3 text-left">Imagen</th>
              <th className="px-6 py-3 text-left">Producto</th>
              <th className="px-6 py-3 text-left">Descripción</th>
              <th className="px-6 py-3 text-center">Actual</th>
              <th className="px-6 py-3 text-center">Mínima</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const diferencia = item.cantidadActual - item.cantidadMinima
              let rowColor = "bg-white"
              if (diferencia < 0) rowColor = "bg-red-100"
              else if (diferencia >= 0 && diferencia <= 5) rowColor = "bg-yellow-100"

              const descripcionTruncada =
                item.descripcion && item.descripcion.length > 30
                  ? item.descripcion.substring(0, 30) + "..."
                  : item.descripcion

              return (
                <tr key={item.productoId} className={`${rowColor} border-b`}>
                  <td className="px-6 py-3">
                    <img
                      src={`https://localhost:7050/api/Images/Buscar/3/${item.ruta_Imagen}` || "/public/placeholder.png"}
                      alt={item.nombreProducto}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-3 font-semibold">{item.nombreProducto}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{descripcionTruncada}</td>
                  <td className="px-6 py-3 text-center">{item.cantidadActual}</td>
                  <td className="px-6 py-3 text-center">{item.cantidadMinima}</td>
                  <td className="px-6 py-3 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openModalFor(item)}
                      className="flex items-center gap-2 bg-[#f2a33c] hover:bg-[#e6932d] text-white"
                    >
                      <Pencil className="w-4 h-4" />
                      Editar
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="text-center text-gray-600 mt-6">
        Cantidad de productos: <span className="font-medium">{items.length}</span> | Total unidades:{" "}
        <span className="font-medium">{totalUnidades}</span>
      </p>

      <InventarioModal
        open={modalOpen}
        initial={selected}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  )
}
