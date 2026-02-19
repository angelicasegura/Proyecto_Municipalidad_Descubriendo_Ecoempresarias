import type { Producto} from "../../../../types/productosType";


export async function handleFetchProductos(emprendimiento_id: number, categoria_id?: number, nombre?: string): Promise<Producto[] | any> {
  try {
     const params = new URLSearchParams({
        categoria_id: categoria_id ? categoria_id.toString() : "",
        nombre: nombre || "",
        emprendimiento_id: emprendimiento_id.toString()
     });


      const response = await fetch(`https://localhost:7050/api/Producto/ObtenerProductos/${params}`);
     if (!response.ok) throw new Error("Error al obtener emprendimiento");
     return await response.json(); 

    
  } catch (error) {
    console.error("Error fetching productos:", error);
    throw error;
  }
}