import type { CategoriaProducto } from "../../../../types/productosType";


export async function handleFetchCategorias(emprendimiento_id: number): Promise<CategoriaProducto[] | any> {
  try {
     const params = new URLSearchParams({
        
        emprendimiento_id: emprendimiento_id.toString()
     });


      const response = await fetch(`https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/CategoriasProductos/Obtener?${params.toString()}`);
     if (!response.ok) throw new Error("Error al obtener categorías");
     return await response.json(); 

    
  } catch (error) {
    console.error("Error fetching productos:", error);
    throw error;
  }
}