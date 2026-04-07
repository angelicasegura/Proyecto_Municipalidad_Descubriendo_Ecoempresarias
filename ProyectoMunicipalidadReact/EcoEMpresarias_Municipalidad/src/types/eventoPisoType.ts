// ─── Request ──────────────────────────────────────────────────────────────────
export interface EventoPisoRequest {
    evento_id: number
    piso_id: number
    estado_id: number
}

// ─── Response ─────────────────────────────────────────────────────────────────
export interface EventoPisoResponse {
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