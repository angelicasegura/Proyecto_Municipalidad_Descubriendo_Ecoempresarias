


import { authFetch } from "../../../../auth/AuthFetch";
import type { Inventario } from "../../../../types/productosType";


export async function handleFetchInventarioEmprendimientoFiltrado(
  emprendimiento_id: string,
  CedulaJuridica: string,
  nombre?: string
): Promise<Inventario[]> {
  try {
    const paramsObj: Record<string, string> = { emprendimiento_id, CedulaJuridica };
    if (nombre) paramsObj.nombre = nombre;

    const parameters = new URLSearchParams(paramsObj);
    const response = await authFetch(
      `https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Inventario/Mi-Inventario?${parameters.toString()}`
    );
    console.log(response);
    if (!response.ok) throw new Error("Error al obtener inventario filtrado");
    return await response.json();
  } catch (error) {
    console.error("Error fetching inventario filtrado:", error);
    throw error;
  }
}