import { useState } from "react"
import { handleCrearEvento } from "../actions/handleCrearEvento"

interface Props {
  onClose: () => void
  onSuccess: () => void
}

export default function CrearEventoModal({ onClose, onSuccess }: Props) {

  const [nombreEvento, setNombreEvento] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFinal, setFechaFinal] = useState("")
  const [horario, setHorario] = useState("")
  const [cupos, setCupos] = useState(0)
  const lugarId = 1
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {

      await handleCrearEvento(
        nombreEvento,
        descripcion,
        fechaInicio,
        fechaFinal,
        horario,
        cupos,
        lugarId
      )

      onSuccess()
      onClose()

    } catch (error) {
      console.error(error)
      alert("Error creando evento")
    }
  }

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-20 overflow-y-auto z-50">

      <div className="bg-white p-6 rounded-lg w-[450px] shadow-lg max-h-[90vh] overflow-y-auto">

        <h2 className="text-xl font-bold mb-4">
          Crear Evento
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <label className="block text-sm font-medium mb-1">
            Nombre del evento:
          </label>
          <input
            className="w-full border p-2 rounded"
            value={nombreEvento}
            onChange={(e) => setNombreEvento(e.target.value)}
          />
          <label className="block text-sm font-medium mb-1">
            Descripcion:
          </label>
          <textarea
            className="w-full border p-2 rounded"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <label className="block text-sm font-medium mb-1">
            Fecha inicio:
          </label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
          <label className="block text-sm font-medium mb-1">
            Fecha final:
          </label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={fechaFinal}
            onChange={(e) => setFechaFinal(e.target.value)}
          />
          <label className="block text-sm font-medium mb-1">
            Horario:
          </label>
          <input
            type="time"
            className="w-full border p-2 rounded"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
          />
          <label className="block text-sm font-medium mb-1">
            Cupos:
          </label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            placeholder="Cupos"
            value={cupos}
            onChange={(e) => setCupos(Number(e.target.value))}
          />

          <div className="flex justify-end gap-3 mt-4">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}