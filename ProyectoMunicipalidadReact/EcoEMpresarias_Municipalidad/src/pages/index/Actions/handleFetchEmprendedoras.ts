
import type { Emprendedora } from "../../../types/emprendedoresType";

export async function handleFetchEmprendedoras(): Promise<Emprendedora[]> { 
  try {
    
    const response = await fetch(`https://localhost:7050/api/Usuarios/10Empresarias`);
    
    if (!response.ok) {
      throw new Error(`Error al obtener emprendedoras: ${response.statusText}`);
    }

    
    const text = await response.text(); 
    if (!text) return []; 

   
    return JSON.parse(text); 
    
  } catch (error) {
    console.error("Error fetching emprendedoras:", error);
    
    
    return []; 
  }
}