import { authFetch } from "../../../../../auth/AuthFetch";

export async function handleKpi(emprendimientoId: number) {
  const res = await authFetch(
    `https://localhost:7050/api/Reporte/kpi/${emprendimientoId}`
  );

  return await res.json();
}