

export interface Producto {
  producto_id: string 
  nombreProducto: string
  descripcion: string
  precio: number
  ruta_Imagen: string
  emprendimiento_id: number
  descuento?: number
  categoriaNombre: string
  nombreEstado: string
}

export interface CategoriaProducto {
  categoria_id: string
  nombre: string
  ruta_imagen?: string
  estado_id: number
}




export const fetchCategoriasProductos = async (): Promise<CategoriaProducto[]> => {
  try {
    const response = await fetch(
      "https://localhost:7050/api/CategoriasProductos/Obtener"
    )

    if (!response.ok) {
      throw new Error("Error al cargar categorias de productos")
    }

    return await response.json()
  } catch (error) {
    console.error("Error en fetchCategoriasProductos:", error)
    return []
  }
}







export const calcularPrecioFinal = (
  precio: number,
  descuento?: number
): number => {
  if (!descuento) return precio
  return precio * (1 - descuento / 100)
}


export const obtenerTextoDescuento = (descuento?: number): string => {
  if (!descuento) return ""
  return `${descuento}% OFF`
}