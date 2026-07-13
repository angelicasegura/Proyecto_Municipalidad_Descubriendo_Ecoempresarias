import { AlertTriangle, Info, X } from "lucide-react"

interface Props {
  nombreEvento: string
  estado: number
  onCancel: () => void
  onConfirm: () => void
}

export default function ConfirmarCambioEstado({
  nombreEvento,
  estado,
  onCancel,
  onConfirm
}: Props) {
  const esActivo = estado === 1;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-[450px] overflow-hidden">

        <div
          className={`text-white px-5 py-3 flex items-center justify-between ${
            esActivo ? "bg-red-600" : "bg-green-600"
          }`}
        >
          <div className="flex items-center gap-2 font-semibold text-lg">
            <AlertTriangle size={20} />
            {esActivo ? "Inactivar Evento" : "Activar Evento"}
          </div>

          <button onClick={onCancel}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-gray-700">
            ¿Estás seguro de que deseas{" "}
            <b>{esActivo ? "inactivar" : "activar"}</b> el evento{" "}
            <b>{nombreEvento}</b>?
          </p>

          <div className="border border-yellow-300 bg-yellow-50 rounded-lg p-3 flex gap-2 items-start text-sm text-gray-700">
            <Info size={18} className="mt-0.5" />

            <p>
              {esActivo
                ? "El evento dejará de estar disponible para nuevas reservas."
                : "El evento volverá a estar disponible para los emprendedores."}
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>

            <button
              onClick={onConfirm}
              className={`text-white px-4 py-2 rounded-lg ${
                esActivo
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {esActivo ? "Inactivar" : "Activar"}
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}