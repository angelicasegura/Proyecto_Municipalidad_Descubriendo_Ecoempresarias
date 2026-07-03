import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { handleCrearEvento } from "../actions/handleCrearEvento";
import { authFetch } from "../../../auth/AuthFetch";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CrearEventoModal({ onClose, onSuccess }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [nombreEvento, setNombreEvento] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [horario, setHorario] = useState("");
  const [cupos, setCupos] = useState(0);
  const [lugarId, setLugarId] = useState<number | null>(null);

  // traer lugares
  const { data: lugares = [] } = useQuery({
    queryKey: ["lugares"],
    queryFn: async () => {
      const res = await authFetch(
        "https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Lugar/ObtenerLugares",
      );
      return res.json();
    },
  });

  // filtrar solo activos
  const lugaresActivos = lugares.filter(
    (l: any) => l.nombreEstado === "Activo",
  );
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!nombreEvento.trim())
      newErrors.nombreEvento = "El nombre del evento es obligatorio";

    if (!descripcion.trim())
      newErrors.descripcion = "La descripción es obligatoria";

    if (!fechaInicio)
      newErrors.fechaInicio = "La fecha de inicio es obligatoria";

    if (!fechaFinal) newErrors.fechaFinal = "La fecha final es obligatoria";

    if (!horario) newErrors.horario = "El horario es obligatorio";

    if (cupos <= 0) newErrors.cupos = "Debe ingresar al menos un cupo";

    if (!lugarId) newErrors.lugarId = "Debe seleccionar un lugar";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
 const handleSubmit = async (e: any) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    await handleCrearEvento(
      nombreEvento,
      descripcion,
      fechaInicio,
      fechaFinal,
      horario,
      cupos,
      lugarId!
    );

    onSuccess();
    onClose();
  } catch (error) {
    console.error(error);
    alert("Error creando evento");
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-20 overflow-y-auto z-50">
      <div className="bg-white p-6 rounded-lg w-[450px] shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Crear Evento</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block text-sm font-medium">Nombre del evento</label>
          <input
            className={`w-full border p-2 rounded ${
              errors.nombreEvento ? "border-red-500" : ""
            }`}
            value={nombreEvento}
            onChange={(e) => setNombreEvento(e.target.value)}
          />

          {errors.nombreEvento && (
            <p className="text-red-500 text-sm mt-1">{errors.nombreEvento}</p>
          )}

          <label className="block text-sm font-medium">Descripción</label>

          <textarea
            className={`w-full border p-2 rounded ${
              errors.descripcion ? "border-red-500" : ""
            }`}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          {errors.descripcion && (
            <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>
          )}

          <label className="block text-sm font-medium">Fecha inicio</label>

          <input
            type="date"
            className={`w-full border p-2 rounded ${
              errors.fechaInicio ? "border-red-500" : ""
            }`}
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />

          {errors.fechaInicio && (
            <p className="text-red-500 text-sm mt-1">{errors.fechaInicio}</p>
          )}
          <label className="block text-sm font-medium">Fecha final</label>

          <input
            type="date"
            className={`w-full border p-2 rounded ${
              errors.fechaFinal ? "border-red-500" : ""
            }`}
            value={fechaFinal}
            onChange={(e) => setFechaFinal(e.target.value)}
          />

          {errors.fechaFinal && (
            <p className="text-red-500 text-sm mt-1">{errors.fechaFinal}</p>
          )}
          <label className="block text-sm font-medium">Horario</label>

          <input
            type="time"
            className={`w-full border p-2 rounded ${
              errors.horario ? "border-red-500" : ""
            }`}
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
          />

          {errors.horario && (
            <p className="text-red-500 text-sm mt-1">{errors.horario}</p>
          )}

          <label className="block text-sm font-medium">Cupos</label>

          <input
            type="number"
            min={0}
            className={`w-full border p-2 rounded ${
              errors.cupos ? "border-red-500" : ""
            }`}
            value={cupos}
            onChange={(e) => setCupos(Number(e.target.value))}
          />

          {errors.cupos && (
            <p className="text-red-500 text-sm mt-1">{errors.cupos}</p>
          )}

          {/* SELECT DE LUGARES */}

          <label className="block text-sm font-medium">Lugar del evento</label>

          <select
            className={`w-full border p-2 rounded ${
              errors.lugarId ? "border-red-500" : ""
            }`}
            value={lugarId ?? ""}
            onChange={(e) => setLugarId(Number(e.target.value))}
          >
            <option value="">Seleccione un lugar</option>

            {lugaresActivos.map((l: any) => (
              <option key={l.lugar_id} value={l.lugar_id}>
                {l.nombre}
              </option>
            ))}
          </select>

          {errors.lugarId && (
            <p className="text-red-500 text-sm mt-1">{errors.lugarId}</p>
          )}

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
  );
}
