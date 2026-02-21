import { useEffect, useState } from "react";

import { handleAgregarComentario } from "../Actions/handleAgregarComentario";
import { handleObtenerComentarios } from "../Actions/handleObtenerComentarios";

interface Comentario {
  comentario_id: number;
  texto: string;
  calificacion: number;
  fecha: string;
  usuarioNombre: string;
}

interface Props {
  emprendimientoId: number;
}

export default function ComentariosSection({ emprendimientoId }: Props) {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [open, setOpen] = useState(false);
  const [contenido, setContenido] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [hover, setHover] = useState(0);


  const obtenerComentarios = async () => {
    try {
      const data = await handleObtenerComentarios(emprendimientoId);
      setComentarios(data);
    } catch (error) {
      console.error("Error al obtener comentarios", error);
    }
  };


  useEffect(() => {
    if (emprendimientoId) {
      obtenerComentarios();
    }
  }, [emprendimientoId]);

  const handleGuardar = async () => {
    if (!contenido.trim()) return;
    try {
      await handleAgregarComentario(emprendimientoId, contenido, calificacion);

      setContenido("");
      setCalificacion(0);
      setOpen(false);
      await obtenerComentarios();
    } catch (error) {
      console.error("Error al guardar comentario", error);
    }
  };
  const promedio =
  comentarios.length > 0
    ? comentarios.reduce((acc, c) => acc + c.calificacion, 0) /
      comentarios.length
    : 0;
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Comentarios</h3>

        <button
          onClick={() => setOpen(true)}
          className="bg-[#0066aa] text-white px-4 py-2 rounded-md"
        >
          Agregar comentario
        </button>

      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-yellow-500 text-lg">
          {"⭐".repeat(Math.round(promedio))}
          {"☆".repeat(5 - Math.round(promedio))}
        </span>
        <span className="text-sm text-muted-foreground">
          {promedio.toFixed(1)} ({comentarios.length})
        </span>
      </div>


      {comentarios.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No hay comentarios aún.
        </p>
      )}

      {comentarios.map((c) => (
        <div
          key={c.comentario_id}
          className="border rounded-md p-3 mb-3 bg-white shadow-sm"
        >
          {/* Estrellas */}
          <div className="text-yellow-500 text-sm mb-1">
            {"⭐".repeat(c.calificacion)}
            {"☆".repeat(5 - c.calificacion)}
          </div>

          {/* Texto del comentario */}
          <p className="text-sm text-muted-foreground">
            {c.texto}
          </p>

          {/* Usuario y fecha */}
          <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
            <span>{c.usuarioNombre}</span>
            <span>
              {new Date(c.fecha).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h4 className="text-lg font-semibold mb-4">
              Nuevo comentario
            </h4>

            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="w-full border rounded-md p-2 mb-4"
              rows={4}
              placeholder="Escribe tu comentario..."
            />

            <div className="flex gap-1 mb-4">
  {[1, 2, 3, 4, 5].map((num) => (
    <span
      key={num}
      onClick={() => setCalificacion(num)}
      onMouseEnter={() => setHover(num)}
      onMouseLeave={() => setHover(0)}
      className={`cursor-pointer text-3xl transition-colors duration-200 ${
        num <= (hover || calificacion)
          ? "text-yellow-500"
          : "text-gray-300"
      }`}
    >
      ★
    </span>
  ))}
</div>


            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancelar
              </button>

              <button type="button"
                onClick={handleGuardar}
                className="bg-[#0066aa] text-white px-4 py-2 rounded-md"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}