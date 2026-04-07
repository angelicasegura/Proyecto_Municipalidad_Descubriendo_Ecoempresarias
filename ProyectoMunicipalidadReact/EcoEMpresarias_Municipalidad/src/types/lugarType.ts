// ─── Lugar ────────────────────────────────────────────────────────────────────
// El response de lugares ya lo tenés funcionando con any[], esto es solo para tiparlo

export interface LugarResponse {
    lugar_id: number
    nombre: string
    provincia: string
    canton: string
    distrito: string
    detalles: string
    nombreEstado: string
}

// ─── Piso ─────────────────────────────────────────────────────────────────────
// Response: camelCase (como devuelve C#)
// Request:  PascalCase (como espera C#)

export interface PisoRequest {
    Nombre_Piso: string
    Numero_Piso: number
    Lugar_id: number
    Estado_id: number
}

export interface PisoResponse {
    piso_id: number
    nombre_Piso: string   // C# serializa Nombre_Piso → nombre_Piso
    numero_Piso: number
    nombreLugar: string
    nombreEstado: string
}

// ─── Zona ─────────────────────────────────────────────────────────────────────

export interface ZonaRequest {
    Nombre: string
    Descripcion: string
    Piso_id: number
    Mapa_id: number | null
    Estado_id: number
}

export interface ZonaResponse {
    zona_id: number
    nombre: string
    descripcion: string
    nombrePiso: string
    nombreMapa: string | null
    estadoNombre: string
}