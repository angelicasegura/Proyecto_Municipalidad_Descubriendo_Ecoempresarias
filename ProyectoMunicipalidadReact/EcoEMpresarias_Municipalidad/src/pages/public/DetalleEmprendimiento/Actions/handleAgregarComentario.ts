

export async function handleAgregarComentario(
  emprendimientoId: number,
  texto: string, 
  calificacion: number
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `https://localhost:7050/api/comentarios/emprendimiento/${emprendimientoId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Texto: texto,
        Calificacion: calificacion,
        Fecha: new Date().toISOString(),
        Estado_id: 1,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Error al guardar comentario");
  }

  return await response.json();
}