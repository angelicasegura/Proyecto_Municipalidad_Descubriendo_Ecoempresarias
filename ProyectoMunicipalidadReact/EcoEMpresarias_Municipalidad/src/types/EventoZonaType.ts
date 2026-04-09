export interface EventoZonaRequest {
    Evento_id: number
    Zona_id: number
    Estado_id: number
}

export interface EventoZonaResponse {
    evento_id: number
    zona_id: number
    estado_id: number
    nombreEvento: string
    fecha_inicio: string
    nombreZona: string
    nombre_piso: string
    numero_piso: number
    mapa_id: number
    nombreMapa: string
    estado: string | null
}

// ─── ZonaPiso (response de ObtenerZonasPorPisoActivas) ─────────────────

export interface ZonaPisoActiva {
    zona_id: number
    nombre: string
    descripcion: string
    nombrePiso: string
    nombreMapa: string | null
    estadoNombre: string
}