import { Calendar, MapPin } from "lucide-react"
import { useAuth } from "../../../auth/AuthContext"
import { useNavigate } from "react-router-dom"
import { handleDesactivarEvento } from "../actions/handleDesactivarEvento"
import ConfirmarCambioEstado from "./modalConfirmarCambioEstado"
import { useState } from "react"

interface Props {
  evento: any
}

export default function EventoDetalleCard({ evento }: Props) {

  const { user } = useAuth()
  const esAdmin = user?.rol === "ADMIN"

  const navigate = useNavigate()

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)

  if (!evento) return null

  const handleEliminar = async () => {

    try {

      await handleDesactivarEvento(evento.evento_id)

      navigate("/eventos")

    } catch (error) {
      console.error(error)
    }

  }

  return (
    <>

      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">

        <h1 className="text-2xl font-bold mb-4">
          {evento.nombreEvento}
        </h1>

        <div className="text-sm text-gray-600 mb-4 flex gap-6">

          <div className="flex items-center gap-2">
            <Calendar size={16}/>
            Fecha: {new Date(evento.fecha_inicio).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16}/>
            Lugar: {evento.nombreLugar}
          </div>

        </div>

        <hr className="mb-4"/>

        <h3 className="font-semibold mb-2">Descripción del evento</h3>

        <p className="text-gray-600 mb-6">
          {evento.descripcion}
        </p>

        <div className="space-y-2">

          <p><strong>Tipo de evento</strong></p>
          <p>{evento.tipoEvento ?? "Feria"}</p>

          <p><strong>Lugar</strong></p>
          <p>{evento.nombreLugar}</p>

          <p><strong>Horario</strong></p>
          <p>{evento.horario}</p>

          <p><strong>Cupos</strong></p>
          <p>{evento.cupos}</p>

        </div>

        <div className="flex gap-3 mt-6">

          <button
            onClick={() => navigate("/eventos")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            ← Volver a Eventos
          </button>

          {esAdmin && (
            <>
              <button className="bg-green-600 text-white px-4 py-2 rounded">
                Editar
              </button>

              <button
                onClick={() => setMostrarConfirmacion(true)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Eliminar
              </button>
            </>
          )}

        </div>

      </div>


      {/* MODAL CONFIRMAR ELIMINACIÓN */}

      {mostrarConfirmacion && (

        <ConfirmarCambioEstado
          nombreEvento={evento.nombreEvento}
          onCancel={() => setMostrarConfirmacion(false)}
          onConfirm={handleEliminar}
        />

      )}

    </>
  )
}