import type { Evento } from "../actions/fetchEventos"
import { Calendar, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
interface Props {
  evento: Evento
}

export default function EventoCard({ evento }: Props) {

  return (
    <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-orange-400 hover:shadow-lg transition">

      <h3 className="text-blue-600 font-semibold text-lg mb-3">
        {evento.nombreEvento}
      </h3>

      <div className="flex items-center text-gray-600 text-sm mb-1">
        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
        {new Date(evento.fecha_inicio).toLocaleDateString()}
      </div>

      <div className="flex items-center text-gray-600 text-sm mb-3">
        <MapPin className="w-4 h-4 mr-2 text-pink-500" />
        {evento.lugar_id ?? "Lugar del evento"}
      </div>

      <p className="text-gray-600 text-sm mb-4">
        {evento.descripcion}
      </p>

      <div className="flex gap-2">


        <Link to={`/eventos/${evento.evento_id}`}
          className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700">
          Ver detalles
        </Link>

        <button
          className="bg-teal-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-teal-600"
        >
          Reservar
        </button>

      </div>

    </div>
  )
}