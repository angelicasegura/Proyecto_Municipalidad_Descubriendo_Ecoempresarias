import { authFetch } from "../../../../../auth/AuthFetch";

export async function handleTopProductos(emprendimientoId: number) {
  const res = await authFetch(
    `https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Reporte/top-productos/${emprendimientoId}`
  );

  return await res.json();
}