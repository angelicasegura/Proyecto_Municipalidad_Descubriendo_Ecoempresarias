type Props = {
  item: any
  emprendimientoId: number
  actualizarCantidad: (
    emprendimientoId: number,
    productoId: string,
    cantidad: number
  ) => Promise<any>
  eliminarItem: (
    emprendimientoId: number,
    productoId: string
  ) => Promise<any>
  reload: () => void
}

export default function CarritoItemCard({
  item,
  emprendimientoId,
  actualizarCantidad,
  eliminarItem,
  reload
}: Props) {
  console.log("ITEM:", item) 👈 AQUI

  async function handleActualizar(cantidad: number) {

    await actualizarCantidad(
      emprendimientoId,
      item.producto_id,
      cantidad
    )

    reload()
  }

  async function handleEliminar() {

    await eliminarItem(
      emprendimientoId,
      item.producto_id
    )

    reload()
  }

  return (
    <div className="border rounded-lg p-4 flex gap-4 items-center">

      <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
       {item.Ruta_Imagen ? (
  <img
    src={`https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Images/Buscar/3/${item.Ruta_Imagen}`}
    alt={item.nombreProducto}
    className="w-full h-full object-cover"
  />
) : (
  <span className="text-xs text-gray-500">
    Sin imagen
  </span>
)}
      </div>

      <div className="flex-1">
        <div className="font-medium">
          {item.nombreProducto}
        </div>

        <div className="text-sm text-gray-600">
          ₡{Number(item.precio).toFixed(2)}
        </div>
      </div>

      <div className="flex items-center gap-2">

        <input
          type="number"
          min={1}
          value={item.cantidad}
          className="w-20 border rounded px-2 py-1"
          onChange={(e) => {
            const cantidad = Number(e.target.value)
            handleActualizar(cantidad)
          }}
        />

        <button
          className="px-3 py-1 border rounded text-red-600"
          onClick={handleEliminar}
        >
          Eliminar
        </button>

      </div>

    </div>
  )
}
