import { AlertTriangle } from "lucide-react";

interface Props {
  titulo: string;
  mensaje: string;
  textoBoton: string;
  colorBoton: "red" | "green";
  onConfirmar: () => void;
  onCancelar: () => void;
  cargando?: boolean;
}

export default function ModalConfirmar({
  titulo,
  mensaje,
  textoBoton,
  colorBoton,
  onConfirmar,
  onCancelar,
  cargando,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[380px] p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-100 p-2 rounded-full">
            <AlertTriangle className="text-red-600" size={20} />
          </div>
          <h2 className="text-base font-bold text-gray-800">{titulo}</h2>
        </div>

        <p className="text-sm text-gray-600 mb-6">{mensaje}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancelar}
            disabled={cargando}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition text-sm font-medium disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            disabled={cargando}
            className={`text-white px-4 py-2 rounded transition text-sm font-medium disabled:opacity-50 ${
              colorBoton === "red"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {cargando ? "Procesando..." : textoBoton}
          </button>
        </div>
      </div>
    </div>
  );
}
