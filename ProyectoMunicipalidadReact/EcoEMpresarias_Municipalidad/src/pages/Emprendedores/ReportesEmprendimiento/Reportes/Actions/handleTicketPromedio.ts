import { authFetch } from "../../../../../auth/AuthFetch";

export async function handleTicketPromedio(emprendimientoId: number) {
  const res = await authFetch(
    `https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Reporte/ticket-promedio/${emprendimientoId}`
  );

  return await res.json();
}