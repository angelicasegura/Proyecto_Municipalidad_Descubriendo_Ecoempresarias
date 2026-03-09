import  { authFetch } from "../auth/AuthFetch";

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
  usuarioDueño: number
  categoria_id: string
  emprendimientoNombre?: string
}

export interface CategoriaProducto {
  categoria_Id: string
  nombre: string
  ruta_imagen?: string
  estado_id: number
}

export interface Inventario {
  productoId: string;        
  cantidadActual: number;    
  nombreProducto?: string;   
  descripcion?: string;      
  ruta_Imagen?: string;       
  precio: number;            
  descuento: number;         
  cantidadMinima: number;   
  estadoId: number;          
}


export interface InventarioRequest {
  productoId: string
  cantidadActual: number
  cantidadMinima: number
  estadoId: number
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

export function formatearPrecio(precio: number): string {
  return `₡${precio.toLocaleString("es-CR")}`;
}



const BASE_URL = "https://localhost:7050"

// Trae todos los productos
export async function obtenerProductos(emprendimientoId?: number): Promise<Producto[]> {
  const params = emprendimientoId ? `?emprendimiento_id=${emprendimientoId}` : ""
  const res = await authFetch(`${BASE_URL}/api/Producto/ObtenerProductos${params}`)
  if (!res.ok) throw new Error("Error al obtener productos")
  return res.json()
}

export async function obtenerProductosEmprendedor(emprendimientoId?: number): Promise<Producto[]> {
  const params = emprendimientoId ? `?emprendimiento_id=${emprendimientoId}` : ""
  const res = await authFetch(`${BASE_URL}/api/Producto/ObtenerProductosEmprendedor${params}`)
  
  if (res.status === 204) return []
  
  if (!res.ok) throw new Error("Error al obtener productos")
  return res.json()
}

// Trae un solo producto por su ID
// Usamos el mismo endpoint pero filtrando — ajusta si tu API tiene un endpoint distinto
export async function obtenerProductoPorId(id: string): Promise<Producto> {
  const res = await authFetch(`${BASE_URL}/api/Producto/ObtenerProducto/${id}`)
  if (!res.ok) {
    throw new Error("Error al obtener el producto")
  }
  return res.json()
}


// Crear producto — usa multipart/form-data porque puede incluir imagen
export async function crearProducto(formData: FormData): Promise<void> {
  const token = localStorage.getItem("token")
  const res = await fetch(`${BASE_URL}/api/Producto/CrearProducto`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData, // NO ponemos Content-Type, el browser lo pone automático con el boundary
  })
  if (!res.ok) throw new Error("Error al crear el producto")
}

// Editar producto — también multipart/form-data
export async function editarProducto(id: string, formData: FormData): Promise<void> {
  const token = localStorage.getItem("token")
  const res = await fetch(`${BASE_URL}/api/Producto/EditarProducto/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })
  if (!res.ok) throw new Error("Error al editar el producto")
}

// Eliminar (inactivar) producto
export async function eliminarProducto(id: string): Promise<void> {
  const res = await authFetch(`${BASE_URL}/api/Producto/InactivarProducto/${id}`, {
    method: "PUT",
  })
  if (!res.ok) throw new Error("Error al eliminar el producto")
}

export async function obtenerCategorias(): Promise<CategoriaProducto[]> {
    const res = await authFetch(`${BASE_URL}/api/CategoriasProductos/Obtener`)
    if (!res.ok) throw new Error("Error al obtener categorías")
    return res.json()
}

// Productos creados pendientes (estado 3)
export async function obtenerProductosCreadosPendientes(): Promise<Producto[]> {
  const res = await authFetch(`${BASE_URL}/api/Producto/ObtenerProductosCreadosPendientes`)
  if (res.status === 204) return []
  if (!res.ok) throw new Error("Error al obtener productos pendientes")
  return res.json()
}

// Productos editados pendientes (estado 4)
export async function obtenerProductosEditadosPendientes(): Promise<Producto[]> {
  const res = await authFetch(`${BASE_URL}/api/Producto/ObtenerProductosEditadosPendientes`)
  if (res.status === 204) return []
  if (!res.ok) throw new Error("Error al obtener productos pendientes")
  return res.json()
}

// Aprobar producto
export async function aprobarProducto(id: string): Promise<void> {
  const res = await authFetch(`${BASE_URL}/api/Producto/AprobarProducto/${id}`)
  if (!res.ok) throw new Error("Error al aprobar producto")
}

// Rechazar producto
export async function rechazarProducto(id: string): Promise<void> {
  const res = await authFetch(`${BASE_URL}/api/Producto/RechazarProducto/${id}`)
  console.log(res.status)
  if (!res.ok) throw new Error("Error al rechazar producto")
}


