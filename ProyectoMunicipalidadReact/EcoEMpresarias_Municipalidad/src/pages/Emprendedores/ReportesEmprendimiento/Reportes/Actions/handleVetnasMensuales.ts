import { authFetch } from "../../../../../auth/AuthFetch";

export async function handleVentasMensuales(emprendimientoId: number) {
  const res = await authFetch(
    `https://localhost:7050/api/Reporte/ventas-mensuales/${emprendimientoId}`
  );

  return await res.json();
}