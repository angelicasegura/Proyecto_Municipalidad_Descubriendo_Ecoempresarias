type Props = {
  direccionEntrega: string
  setDireccionEntrega: (value: string) => void
  observaciones: string
  setObservaciones: (value: string) => void
  confirmarPedido: () => void
}

export default function CarritoFormularioPedido({
  direccionEntrega,
  setDireccionEntrega,
  observaciones,
  setObservaciones,
  confirmarPedido
}: Props) {

  return (

    <div className="space-y-4 mt-6 max-w-2xl">

      <div>
        <label className="block text-sm font-medium mb-1">
          Dirección de entrega
        </label>

        <input
          type="text"
          value={direccionEntrega}
          onChange={(e) =>
            setDireccionEntrega(e.target.value)
          }
          placeholder="Escribí la dirección de entrega"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Observaciones
        </label>

        <textarea
          value={observaciones}
          onChange={(e) =>
            setObservaciones(e.target.value)
          }
          placeholder="Observaciones del pedido"
          className="w-full border rounded px-3 py-2 min-h-[100px]"
        />
      </div>

      <div className="flex justify-end">

        <button
          className="px-4 py-2 rounded bg-blue-600 text-white"
          onClick={confirmarPedido}
        >
          Confirmar pedido
        </button>

      </div>

    </div>

  )

}