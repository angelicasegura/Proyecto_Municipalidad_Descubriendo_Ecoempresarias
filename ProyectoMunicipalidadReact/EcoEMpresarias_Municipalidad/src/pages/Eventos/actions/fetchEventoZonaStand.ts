import { authFetch } from "../../../auth/AuthFetch"
import type { EventoZonaStandRequest, EventoZonaStandResponse } from "../../../types/eventoZonaStandTypes"

const BASE = "https://localhost:7050/api/EventoZonaStand"

// Obtener stands de una zona en un evento
export async function fetchStandsEvento(
    evento_id: number,
    zona_id: number
): Promise<EventoZonaStandResponse[]> {
    const res = await authFetch(
        `${BASE}/ObtenerStandEvento/evento${evento_id}/zona${zona_id}`
    )
    if (res.status === 204) return []
    if (!res.ok) throw new Error("Error al obtener stands del evento")
    return res.json()
}

// Bloquear stand (solo admin)
export async function bloquearStand(data: EventoZonaStandRequest): Promise<number> {
    const res = await authFetch(`${BASE}/BloquearStandEvento`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Error al bloquear stand")
    return res.json()
}

// Desocupar stand
export async function desocuparStand(data: EventoZonaStandRequest): Promise<number> {
    const res = await authFetch(`${BASE}/DesocuparStandEvento`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Error al desocupar stand")
    return res.json()
}

// Ocupar stand (emprendedor reserva)
export async function ocuparStand(data: EventoZonaStandRequest): Promise<number> {
    const res = await authFetch(`${BASE}/OcuparStandEvento`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) {
        const error = await res.json().catch(() => null)
        throw { status: res.status, data: error }
    }
    return res.json()
}