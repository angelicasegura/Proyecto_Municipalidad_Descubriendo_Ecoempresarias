import { Calendar, MapPin, Building2 } from "lucide-react";
import { useAuth } from "../../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { handleActualizarEstadoEvento } from "../actions/handleActualizarEstadoEvento";
import ConfirmarCambioEstado from "./modalConfirmarCambioEstado";
import { useState } from "react";
import ModalEditarEvento from "./ModalEditarEvento";
import ModalGestionarPisos from "./ModalGestionarPisos";

interface Props {
  evento: any;
}

export default function EventoDetalleCard({ evento }: Props) {
  const { user } = useAuth();
  const esAdmin = user?.rol === "ADMIN";
  const navigate = useNavigate();

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarGestionPisos, setMostrarGestionPisos] = useState(false);

  if (!evento) return null;

  const handleCambioEstado = async () => {
    try {
      await handleActualizarEstadoEvento(
        evento.evento_id,
        evento.estado_id === 1 ? 0 : 1,
      );

      navigate("/eventos");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{evento.nombreEvento}</h1>

          {esAdmin && (
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                evento.nombreEstado === "Activo" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {evento.nombreEstado}
            </span>
          )}
        </div>

        <div className="text-sm text-gray-600 mb-4 flex gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            Fecha: {new Date(evento.fecha_inicio).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            Lugar: {evento.nombreLugar}
          </div>
        </div>

        <hr className="mb-4" />

        <h3 className="font-semibold mb-2">Descripción del evento</h3>
        <p className="text-gray-600 mb-6">{evento.descripcion}</p>

        <div className="space-y-4 mt-6">
          <div>
            <p className="font-semibold">Lugar</p>
            <p className="text-gray-600">{evento.nombreLugar}</p>
          </div>

          <div>
            <p className="font-semibold">Horario</p>
            <p className="text-gray-600">{evento.horario}</p>
          </div>

          <div>
            <p className="font-semibold">Cupos disponibles</p>
            <p className="text-gray-600">
              {evento.cupos_actuales} / {evento.cupos}
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6 flex-wrap">
          <button
            onClick={() => navigate("/eventos")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            ← Volver a Eventos
          </button>

          {esAdmin && (
            <>
              {/* Botón gestionar pisos — solo si el evento tiene lugar asignado */}
              {evento.lugar_id && (
                <button
                  onClick={() => setMostrarGestionPisos(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2 transition"
                >
                  <Building2 size={16} />
                  Gestionar Pisos
                </button>
              )}

              <button
                onClick={() => setMostrarModalEditar(true)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Editar
              </button>

              <button
                onClick={() => setMostrarConfirmacion(true)}
                className={`text-white px-4 py-2 rounded ${
                  evento.estado_id === 1
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {evento.estado_id === 1 ? "Inactivar" : "Activar"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal confirmar eliminación */}
      {mostrarConfirmacion && (
        <ConfirmarCambioEstado
          nombreEvento={evento.nombreEvento}
          estado={evento.estado_id}
          onCancel={() => setMostrarConfirmacion(false)}
          onConfirm={handleCambioEstado}
        />
      )}

      {/* Modal editar */}
      {mostrarModalEditar && (
        <ModalEditarEvento
          evento={evento}
          onClose={() => setMostrarModalEditar(false)}
          onSuccess={() => navigate("/eventos")}
        />
      )}

      {/* Modal gestionar pisos */}
      {mostrarGestionPisos && (
        <ModalGestionarPisos
          eventoId={evento.evento_id}
          lugarId={evento.lugar_id}
          onCerrar={() => setMostrarGestionPisos(false)}
        />
      )}
    </>
  );
}
