export interface User {
  usuario_id: number
  nombre: string
  apellidos: string
  telefono: string
  contrasena?: string
  email: string
  ruta_imagen_perfil?: string
  edad: number
  estado_id: number // 1 = activo, 2 = inactivo
  rol_id: number // 1 = administrador, 2 = emprendedor, 3 = usuario
}

export interface Rol {
  rol_id: number
  nombre: string
}

export interface Estado {
  estado_id: number
  nombre: string
}

export const ROLES: Rol[] = [
  { rol_id: 1, nombre: "Administrador" },
  { rol_id: 2, nombre: "Emprendedor" },
  { rol_id: 3, nombre: "Usuario" },
]

export const ESTADOS: Estado[] = [
  { estado_id: 1, nombre: "Activo" },
  { estado_id: 2, nombre: "Inactivo" },
]

export const getRolNombre = (rol_id: number): string => {
  return ROLES.find((r) => r.rol_id === rol_id)?.nombre ?? "Desconocido"
}

export const getEstadoNombre = (estado_id: number): string => {
  return ESTADOS.find((e) => e.estado_id === estado_id)?.nombre ?? "Desconocido"
}
