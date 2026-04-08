type Props = {
  confirmarPedido: () => void
}

export default function CarritoFormularioPedido({
  confirmarPedido
}: Props) {

  return (

    <div className="mt-6 flex justify-end">

      <button
        className="px-4 py-2 rounded bg-blue-600 text-white"
        onClick={confirmarPedido}
      >
        Confirmar pedido
      </button>

    </div>

  )

}