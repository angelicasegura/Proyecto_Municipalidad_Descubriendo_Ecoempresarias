import { authFetch } from "../../../auth/AuthFetch"
import type { EventoPisoRequest, EventoPisoResponse } from "../../../types/eventoPisoType"

const BASE = "https://localhost:7050/api/EventoPiso"

// Trae TODOS los pisos del evento (activos e inactivos) — vista admin
export async function fetchPisosEvento(evento_id: number): Promise<EventoPisoResponse[]> {
    const res = await authFetch(`${BASE}/ObtenerPisosEvento/${evento_id}`)
    if (res.status === 204) return []
    if (!res.ok) throw new Error("Error al obtener pisos del evento")
    return res.json()
}

// Agrega un piso al evento
export async function agregarPisoAEvento(data: EventoPisoRequest): Promise<number> {
    const res = await authFetch(`${BASE}/AgregarPisoAEvento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Error al agregar piso al evento")
    return res.json()
}

// Activa un piso en el evento
export async function activarPisoEvento(data: EventoPisoRequest): Promise<number> {
    const res = await authFetch(`${BASE}/ActivarPiso`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Error al activar piso en el evento")
    return res.json()
}

// Inactiva un piso en el evento
export async function inactivarPisoEvento(data: EventoPisoRequest): Promise<number> {
    const res = await authFetch(`${BASE}/InactivarPiso`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Error al inactivar piso en el evento")
    return res.json()
}