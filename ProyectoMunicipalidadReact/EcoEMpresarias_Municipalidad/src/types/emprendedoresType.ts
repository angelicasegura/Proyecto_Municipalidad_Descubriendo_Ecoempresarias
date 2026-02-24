import { authFetch } from "../auth/AuthFetch"

export interface Emprendedor {
  emprendimientoId: number
  nombre: string
  cedulaJuridica: string
  tipoActividadId: number
  email: string
  telefono: string
  direccion: string
  estadoId: number
  usuarioId: number        // 👈 agregá esto si no está
  ruta_Imagen_Logo?: string
  descripcion?: string
}

export interface TipoActividad {
  tipoActividadId: number
  nombre: string
}

export interface Estado {
  estado_id: number
  nombre: string
}

export interface Emprendimiento {
  emprendimientoId: number
  nombre: string
  cedulaJuridica: string
  tipoActividadId: number
  email: string
  telefono: string
  direccion: string
  estadoId: number // 1 = activo, 2 = inactivo
  ruta_Imagen_Logo?: string
  descripcion?: string
}


export const fetchTiposActividad = async (): Promise<TipoActividad[]> => {
    try {
        const response = await fetch("https://localhost:7050/api/TiposActividad");
        if (!response.ok) throw new Error("Error al cargar tipos de actividad");
        return await response.json();
    } catch (error) {
        console.error(error);
        return []; 
    }
};

export const ESTADOS: Estado[] = [
  { estado_id: 1, nombre: "Activo" },
  { estado_id: 2, nombre: "Inactivo" },
]


export const getEstadoNombre = (estado_id: number): string => {
  return ESTADOS.find((e) => e.estado_id === estado_id)?.nombre ?? "Desconocido";
};


export const getTipoActividadNombre = (id: number, listaTipos: TipoActividad[]): string => {
  if (!listaTipos || listaTipos.length === 0) return "Cargando...";
  return listaTipos.find((t) => t.tipoActividadId === id)?.nombre ?? "Desconocido";
};

export async function editarEmprendimiento(id: number, formData: FormData): Promise<void> {
  const token = localStorage.getItem("token")
  const res = await fetch(`https://localhost:7050/api/Emprendimientos/EditarEmprendimiento/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })
  if (!res.ok) throw new Error("Error al editar el emprendimiento")
}

// Inactivar/activar emprendimiento
export async function toggleEstadoEmprendimiento(id: number): Promise<void> {
  const res = await authFetch(
    `https://localhost:7050/api/Emprendimientos/EliminarEmprendimiento/${id}`,
    { method: "PUT" }
  )
  if (!res.ok) throw new Error("Error al cambiar estado del emprendimiento")
}


const BASE_URL = "https://localhost:7050"

export async function obtenerEmprendimientosPorUsuario(usuarioId: number): Promise<Emprendimiento[]> {
  const res = await authFetch(`${BASE_URL}/api/Emprendimientos/ObtenerPorUsuario/${usuarioId}`)
  if (!res.ok) throw new Error("Error al obtener emprendimientos")
  return res.json()
}
