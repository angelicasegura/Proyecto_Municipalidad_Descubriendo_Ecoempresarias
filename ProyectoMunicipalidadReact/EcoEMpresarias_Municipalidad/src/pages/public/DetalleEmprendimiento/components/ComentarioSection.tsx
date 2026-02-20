import { useEffect, useState } from "react";

import CalificacionPromedio from "./CalifiacionPromedio";

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

  useEffect(() => {
    if (emprendimientoId){
        console.log("Cargando comentarios para emprendimientoId:", emprendimientoId);
        obtenerComentarios();
    }
    
  }, [emprendimientoId]);

  const obtenerComentarios = async () => {
    try {
      const response = await fetch(
        `https://localhost:7050/api/comentarios/emprendimiento/${emprendimientoId}`
      );
      if (!response.ok) {
        throw new Error("Error al cargar comentarios");
      }
      const data = await response.json();
      setComentarios(data);
    } catch (error) {
      console.error("Error cargando comentarios", error);
    }
  };

  const promedio =
    comentarios.length > 0
      ? comentarios.reduce((acc, c) => acc + c.calificacion, 0) /
        comentarios.length
      : 0;
  console.log ("Render comentarios para:", emprendimientoId);
  return (
    <div  className="border-t mt-3 pt-3">
      <CalificacionPromedio promedio={promedio} total={comentarios.length} />

      <div className="mt-2 space-y-2">
        {comentarios.slice(0, 3).map((c) => (
          <div key={c.comentario_id} className="text-sm">
            <div className="text-yellow-500">
              {"⭐".repeat(c.calificacion)}
            </div>
            <p className="text-muted-foreground">{c.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}