import { authFetch } from "../../../../../auth/AuthFetch";

export async function handleTopProductos(emprendimientoId: number) {
  const res = await authFetch(
    `https://localhost:7050/api/Reporte/top-productos/${emprendimientoId}`
  );

  return await res.json();
}