import type { Emprendedor } from "../../../../types/emprendedoresType";


export async function handleFetchEmprendimiento(id: string): Promise<Emprendedor> {
  try {
     
     const response = await fetch(`https://localhost:7050/api/emprendimientos/Obtener/${id}`);
     if (!response.ok) throw new Error("Error al obtener emprendimiento");
     return await response.json();

    
  } catch (error) {
    console.error("Error fetching emprendimiento:", error);
    throw error;
  }
}