import { authFetch } from "../../../../../auth/AuthFetch";

export async function handleProductosBajo(emprendimientoId: number) {
  const res = await authFetch(
    `https://localhost:7050/api/Reporte/productos-bajo/${emprendimientoId}`
  );

  return await res.json();
}