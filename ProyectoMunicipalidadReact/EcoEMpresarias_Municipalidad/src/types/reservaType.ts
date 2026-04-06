// ─── Pisos activos del evento ───────────────
export interface EventoPisoActivoResponse {
    evento_id: number
    piso_id: number
    estado_id: number
    nombreEvento: string
    fecha_inicio: string
    nombre_piso: string
    numero_piso: number
    nombreLugar: string
    estado: string
}

// ─── Zonas activas del evento ───────────
export interface EventoZonaActivaResponse {
    evento_id: number
    zona_id: number
    piso_id: number
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
