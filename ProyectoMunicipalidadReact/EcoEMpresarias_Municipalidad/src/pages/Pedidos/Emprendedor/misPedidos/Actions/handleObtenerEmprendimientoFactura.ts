import { authFetch } from "../../../../../auth/AuthFetch";
import type { Emprendimiento } from "../../../../../types/emprendedoresType";

export async function handleObtenerEmprendimientoPorId(
  emprendimientoId: number
): Promise<Emprendimiento | null> {
  try {
    if (!emprendimientoId) return null;

    const res = await authFetch(
      `https://localhost:7050/api/emprendimientos/Obtener/EMprendimientoID?id=${emprendimientoId}`
    );

    if (!res.ok) {
      throw new Error("Error al obtener emprendimiento");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error en handleObtenerEmprendimientoPorId:", error);
    return null;
  }
}