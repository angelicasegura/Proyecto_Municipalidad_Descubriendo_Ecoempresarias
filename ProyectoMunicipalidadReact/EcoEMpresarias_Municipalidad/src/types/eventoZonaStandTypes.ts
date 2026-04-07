// ─── Request ────────
export interface EventoZonaStandRequest {
    Stand_id: number
    Evento_id: number
    Zona_id: number
    Estado_id: number
    Emprendimiento_id: number | null
}

// ─── Response ───────
export interface EventoZonaStandResponse {
    stand_id: number
    evento_id: number
    zona_id: number
    estado_id: number        // estado en EVENTOS_ZONAS_STANDS_TB (11=disponible, 12=ocupado, 13=bloqueado)
    emprendimiento_id: number | null
    nombreEvento: string
    nombreZona: string
    codigo: string
    x: number
    y: number
    ancho: number
    alto: number
    rotacion: number
    nombreEmprendimiento: string | null
    estado: string | null
}

// ─── Colores por estado_id ────────
export const STAND_EVENTO_COLOR: Record<number, string> = {
    11: "#22c55e",   // disponible → verde
    12: "#f97316",   // ocupado    → naranja
    13: "#ef4444",   // bloqueado  → rojo
}

export const STAND_EVENTO_LABEL: Record<number, string> = {
    11: "Disponible",
    12: "Ocupado",
    13: "Bloqueado",
}