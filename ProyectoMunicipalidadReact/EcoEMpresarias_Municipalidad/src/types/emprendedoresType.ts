export interface Emprendedor {
  emprendedor_id: number
  nombre: string
  cedula_juridica: string
  tipo_actividad_id: number
  correo: string
  telefono: string
  direccion: string
  estado_id: number // 1 = activo, 2 = inactivo
}

export interface TipoActividad {
  tipo_actividad_id: number
  nombre: string
}

export interface Estado {
  estado_id: number
  nombre: string
}

//TODO: Completar los tipos de actividades segun la base de datos
export const TIPOS_ACTIVIDAD: TipoActividad[] = [
  { tipo_actividad_id: 1, nombre: "Artesanía" },
  { tipo_actividad_id: 2, nombre: "Alimentos" },
  { tipo_actividad_id: 3, nombre: "Tecnología" },
  { tipo_actividad_id: 4, nombre: "Textiles" },
  { tipo_actividad_id: 5, nombre: "Servicios" },
]

export const ESTADOS: Estado[] = [
  { estado_id: 1, nombre: "Activo" },
  { estado_id: 2, nombre: "Inactivo" },
]

export const getTipoActividadNombre = (tipo_actividad_id: number): string => {
  return TIPOS_ACTIVIDAD.find((t) => t.tipo_actividad_id === tipo_actividad_id)?.nombre ?? "Desconocido"
}

export const getEstadoNombre = (estado_id: number): string => {
  return ESTADOS.find((e) => e.estado_id === estado_id)?.nombre ?? "Desconocido"
}
