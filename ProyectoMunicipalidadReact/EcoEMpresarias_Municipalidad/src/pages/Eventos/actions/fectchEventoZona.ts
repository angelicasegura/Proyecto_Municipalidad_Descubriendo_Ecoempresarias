import { authFetch } from "../../../auth/AuthFetch"
import type { EventoZonaRequest, EventoZonaResponse } from "../../../types/EventoZonaType"

const BASE = "https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/EventoZona"

// Todas las zonas del evento (activas e inactivas) — vista admin
export async function fetchZonasEvento(evento_id: number): Promise<EventoZonaResponse[]> {
    const res = await authFetch(`${BASE}/ObtenerZonaEvento/${evento_id}`)
    if (res.status === 204) return []
    if (!res.ok) throw new Error("Error al obtener zonas del evento")
    return res.json()
}

// Agregar zona al evento (el backend valida mapa y piso habilitado)
export async function agregarZonaAEvento(data: EventoZonaRequest): Promise<number> {
    const res = await authFetch(`${BASE}/AgregarZonaAEvento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })

    // Devolvemos la respuesta completa para poder leer el mensaje de error del backend
    if (!res.ok) {
        const error = await res.json().catch(() => null)
        throw { status: res.status, data: error }
    }
    return res.json()
}

// Activar zona en el evento
export async function activarZonaEvento(data: EventoZonaRequest): Promise<number> {
    const res = await authFetch(`${BASE}/ActivarZonaAEvento`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Error al activar zona en el evento")
    return res.json()
}

// Inactivar zona en el evento
export async function inactivarZonaEvento(data: EventoZonaRequest): Promise<number> {
    const res = await authFetch(`${BASE}/InactivarZonaAEvento`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Error al inactivar zona en el evento")
    return res.json()
}