// ─── Mapa ─────────────────────────────────────────────────────────────────────
// Response: camelCase (como devuelve C#)
// Request:  PascalCase (como espera C#)

export interface MapaRequest {
    Nombre: string;
    Alto: number;
    Ancho: number;
    Escala: number;
    Estado_id: number;
}

export interface MapaResponse {
    mapa_id: number;
    nombre: string;
    alto: number;
    ancho: number;
    escala: number;
    estadoNombre: string;
}

// ─── Stand ────────────────────────────────────────────────────────────────────

export interface StandRequest {
    Codigo: string;
    X: number;
    Y: number;
    Ancho: number;
    Alto: number;
    Rotacion: number;
    Mapa_id: number;
    Estado_id: number;
}

export interface StandResponse {
    stand_id: number;
    codigo: string;
    x: number;
    y: number;
    ancho: number;
    alto: number;
    rotacion: number;
    nombreEstado: string;
    estado_id: number; // 1 = activo, 0 = inactivo
}

// ─── Constantes ───────────────────────────────────────────────────────────────

export const ESTADO_ACTIVO = 1;
export const ESTADO_INACTIVO = 0;

// En el editor solo importa activo/inactivo.
// El estado disponible/ocupado se maneja desde evento_zona_stand.
export const STAND_COLOR: Record<number, string> = {
    1: "#22c55e", // activo   → verde
    0: "#ef4444", // inactivo → rojo (no debería verse, se filtra antes)
};

export type EditorTool = "select" | "add";