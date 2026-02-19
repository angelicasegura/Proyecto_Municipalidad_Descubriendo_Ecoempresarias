export interface Emprendedor {
  emprendedorId: number
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

export interface TipoActividad {
  tipoActividadId: number
  nombre: string
}

export interface Estado {
  estado_id: number
  nombre: string
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
