import { AlertTriangle, Info, X } from "lucide-react"

interface Props {
  nombreEvento: string
  onCancel: () => void
  onConfirm: () => void
}

export default function ConfirmarCambioEstado({
  nombreEvento,
  onCancel,
  onConfirm
}: Props) {

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-[450px] overflow-hidden">

        {/* Header */}
        <div className="bg-yellow-500 text-white px-5 py-3 flex items-center justify-between">

          <div className="flex items-center gap-2 font-semibold text-lg">
            <AlertTriangle size={20}/>
            Confirmar Cambio de Estado
          </div>

          <button onClick={onCancel}>
            <X size={20}/>
          </button>

        </div>

        {/* Body */}
        <div className="p-6 space-y-4">

          <p className="text-gray-700">
            ¿Estás seguro de que deseas desactivar el evento <b>{nombreEvento}</b>?
          </p>

          {/* Info box */}
          <div className="border border-yellow-300 bg-yellow-50 rounded-lg p-3 flex gap-2 items-start text-sm text-gray-700">

            <Info size={18} className="mt-0.5"/>

            <p>
              Esta acción puede afectar a los emprendedores que ya hayan reservado espacio en el evento.
            </p>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              onClick={onCancel}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>

            <button
              onClick={onConfirm}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Confirmar
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}