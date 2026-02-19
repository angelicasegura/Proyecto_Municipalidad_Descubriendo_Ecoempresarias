


import { authFetch } from "../../../../auth/AuthFetch";
import type { Inventario } from "../../../../types/productosType";


export async function handleFetchInventarioEmprendimiento(emprendimiento_id: string, CedulaJuridica: string): Promise<Inventario[]> {
  try {
     const parameters = new URLSearchParams({ emprendimiento_id,CedulaJuridica });
     const response = await authFetch(`https://localhost:7050/api/Inventario/Mi-Inventario?${parameters.toString()}`);
     console.log(response);
     if (!response.ok) throw new Error("Error al obtener emprendimiento");
     return await response.json();

    
  } catch (error) {
    console.error("Error fetching emprendimiento:", error);
    throw error;
  }
}