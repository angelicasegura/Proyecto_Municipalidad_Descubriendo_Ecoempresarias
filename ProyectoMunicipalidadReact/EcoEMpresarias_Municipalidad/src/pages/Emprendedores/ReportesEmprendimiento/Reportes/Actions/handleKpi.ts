import { authFetch } from "../../../../../auth/AuthFetch";

export async function handleKpi(emprendimientoId: number) {
  const res = await authFetch(
    `https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Reporte/kpi/${emprendimientoId}`
  );

  return await res.json();
}