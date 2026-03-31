import { authFetch } from "../../../../../auth/AuthFetch";

export async function handleTicketPromedio(emprendimientoId: number) {
  const res = await authFetch(
    `https://localhost:7050/api/Reporte/ticket-promedio/${emprendimientoId}`
  );

  return await res.json();
}