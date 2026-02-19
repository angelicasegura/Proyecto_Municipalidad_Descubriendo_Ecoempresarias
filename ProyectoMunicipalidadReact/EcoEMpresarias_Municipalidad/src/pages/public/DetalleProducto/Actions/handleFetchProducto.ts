import type { Producto } from "../../../../types/productosType";

export async function handleFetchProducto(
  producto_id: string
): Promise<Producto | null> { 
  try {
    

    const response = await fetch(`https://localhost:7050/api/Producto/ObtenerProducto/${producto_id}`);
    
    if (!response.ok) throw new Error("Error al obtener productos");

    
    const text = await response.text(); 
    if (!text) return null; 

    return JSON.parse(text); 
    
  } catch (error) {
    console.error("Error fetching producto:", error);
    
    return null; 
  }
}