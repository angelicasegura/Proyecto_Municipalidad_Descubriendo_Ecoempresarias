import type { Producto } from "../../../../types/productosType";

export async function handleFetchProductos(
  emprendimiento_id: number, 
  categoria_id?: string, 
  nombre?: string
): Promise<Producto[]> { // Cambiamos a Promise<Producto[]> para mayor seguridad
  try {
    const params = new URLSearchParams({
      categoria_id: categoria_id ? categoria_id.toString() : "",
      nombre: nombre || "",
      emprendimiento_id: emprendimiento_id.toString()
    });

    const response = await fetch(`https://localhost:7050/api/Producto/ObtenerProductos?${params.toString()}`);
    
    if (!response.ok) throw new Error("Error al obtener productos");

    
    const text = await response.text(); 
    if (!text) return []; 

    return JSON.parse(text); 
    
  } catch (error) {
    console.error("Error fetching productos:", error);
    
    return []; 
  }
}