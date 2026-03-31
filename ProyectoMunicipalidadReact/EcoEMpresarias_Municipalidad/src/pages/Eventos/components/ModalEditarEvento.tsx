import { useState } from "react"
import { handleEditarEvento } from "../actions/handleEditarEvento"

interface Props {
  evento: any
  onClose: () => void
  onSuccess: () => void
}

export default function ModalEditarEvento({ evento, onClose, onSuccess }: Props) {

  const [nombreEvento, setNombreEvento] = useState(evento.nombreEvento)
  const [descripcion, setDescripcion] = useState(evento.descripcion)

  const [fechaInicio, setFechaInicio] = useState(
    evento.fecha_inicio ? evento.fecha_inicio.split("T")[0] : ""
  )

  const [fechaFinal, setFechaFinal] = useState(
    evento.fecha_Final ? evento.fecha_Final.split("T")[0] : ""
  )

  const [horario, setHorario] = useState(
    evento.horario ? evento.horario.substring(0,5) : ""
  )

  const [cupos, setCupos] = useState(evento.cupos)

  const lugarId = evento.lugar_id

  const handleSubmit = async (e:any) => {

    e.preventDefault()

    if(!fechaInicio || !fechaFinal){
      alert("Debe completar las fechas")
      return
    }

    try {

      await handleEditarEvento(
        evento.evento_id,
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
      alert("Error editando evento")

    }

  }
  console.log("Evento en ModalEditarEvento:", evento)
  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-lg shadow-lg w-[450px] p-6">

        <h2 className="text-xl font-bold mb-4">
          Editar Evento
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-semibold mb-1">
              Nombre del evento
            </label>

            <input
              className="w-full border p-2 rounded"
              value={nombreEvento}
              onChange={(e)=>setNombreEvento(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Descripción
            </label>

            <textarea
              className="w-full border p-2 rounded"
              value={descripcion}
              onChange={(e)=>setDescripcion(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Fecha inicio
            </label>

            <input
              type="date"
              className="w-full border p-2 rounded"
              value={fechaInicio}
              onChange={(e)=>setFechaInicio(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Fecha final
            </label>

            <input
              type="date"
              className="w-full border p-2 rounded"
              value={fechaFinal}
              onChange={(e)=>setFechaFinal(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Horario
            </label>

            <input
              type="time"
              className="w-full border p-2 rounded"
              value={horario}
              onChange={(e)=>setHorario(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Cupos
            </label>

            <input
              type="number"
              className="w-full border p-2 rounded"
              value={cupos}
              onChange={(e)=>setCupos(Number(e.target.value))}
            />
          </div>

          <div className="flex justify-end gap-3">

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
              Guardar Cambios
            </button>

          </div>

        </form>

      </div>

    </div>

  )

}