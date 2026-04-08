import { authFetch } from "../../../../../auth/AuthFetch";

export async function handleVentasMensuales(emprendimientoId: number) {
  const res = await authFetch(
    `https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Reporte/ventas-mensuales/${emprendimientoId}`
  );

  return await res.json();
}