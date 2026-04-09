import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { handleCrearEvento } from "../actions/handleCrearEvento"
import { authFetch } from "../../../auth/AuthFetch"

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
  const [lugarId, setLugarId] = useState<number | null>(null)

  // traer lugares
  const { data: lugares = [] } = useQuery({
    queryKey: ["lugares"],
    queryFn: async () => {
      const res = await authFetch("https://localhost:7050/api/Lugar/ObtenerLugares")
      return res.json()
    }
  })

  // filtrar solo activos
  const lugaresActivos = lugares.filter((l: any) => l.nombreEstado === "ACTIVO")

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!lugarId) {
      alert("Debe seleccionar un lugar")
      return
    }

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

          <label className="block text-sm font-medium">
            Nombre del evento
          </label>

          <input
            className="w-full border p-2 rounded"
            value={nombreEvento}
            onChange={(e) => setNombreEvento(e.target.value)}
          />

          <label className="block text-sm font-medium">
            Descripción
          </label>

          <textarea
            className="w-full border p-2 rounded"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <label className="block text-sm font-medium">
            Fecha inicio
          </label>

          <input
            type="date"
            className="w-full border p-2 rounded"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />

          <label className="block text-sm font-medium">
            Fecha final
          </label>

          <input
            type="date"
            className="w-full border p-2 rounded"
            value={fechaFinal}
            onChange={(e) => setFechaFinal(e.target.value)}
          />

          <label className="block text-sm font-medium">
            Horario
          </label>

          <input
            type="time"
            className="w-full border p-2 rounded"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
          />

          <label className="block text-sm font-medium">
            Cupos
          </label>

          <input
            type="number"
            className="w-full border p-2 rounded"
            value={cupos}
            min={0}
            onChange={(e) => setCupos(Number(e.target.value))}
          />

          {/* SELECT DE LUGARES */}

          <label className="block text-sm font-medium">
            Lugar del evento
          </label>

          <select
            className="w-full border p-2 rounded"
            value={lugarId ?? ""}
            onChange={(e) => setLugarId(Number(e.target.value))}
          >

            <option value="">
              Seleccione un lugar
            </option>

            {lugaresActivos.map((l: any) => (

              <option key={l.lugar_id} value={l.lugar_id}>
                {l.nombre}
              </option>

            ))}

          </select>

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