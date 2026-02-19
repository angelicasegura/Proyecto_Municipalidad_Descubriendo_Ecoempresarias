export interface User {
  // Propiedades de UsuariosBase
  nombre: string;
  apellidos: string;
  telefono: string;
  ruta_Imagen_Perfil: string; // Nota: Respeta las mayúsculas de C# si no usas camelCase
  email: string;
  edad: string; // En tu C# es string, asegúrate de que así venga del SP

  // Propiedades de UsuarioResponse
  idUsuario: number;
  idEstado: number;
  idRol: number;

  // Opcional para procesos de login/registro
  contrasena?: string; 
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
  { estado_id: 0, nombre: "Inactivo" },
]

export const getRolNombre = (idRol: number): string => {
  return ROLES.find((r) => r.rol_id === idRol)?.nombre ?? "Desconocido";
};

export const getEstadoNombre = (idEstado: number): string => {
  return ESTADOS.find((e) => e.estado_id === idEstado)?.nombre ?? "Desconocido";
};
