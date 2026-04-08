import { authFetch } from "../../../auth/AuthFetch"
import type { EventoPisoActivoResponse, EventoZonaActivaResponse } from "../../../types/reservaType"

const BASE = "https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net"

// Pisos habilitados por el admin para este evento
export async function fetchPisosActivosEvento(evento_id: number): Promise<EventoPisoActivoResponse[]> {
    const res = await authFetch(`${BASE}/api/EventoPiso/ObtenerPisosEventoPorEstado/${evento_id}`)
    if (res.status === 204) return []
    if (!res.ok) throw new Error("Error al obtener pisos del evento")
    return res.json()
}

// Zonas habilitadas por el admin para este evento
export async function fetchZonasActivasEvento(evento_id: number): Promise<EventoZonaActivaResponse[]> {
    const res = await authFetch(`${BASE}/api/EventoZona/ObtenerZonaEventoActivos/${evento_id}`)
    if (res.status === 204) return []
    if (!res.ok) throw new Error("Error al obtener zonas del evento")
    return res.json()
}

// Emprendimiento del usuario logueado
export async function fetchEmprendimientoPorUsuario(usuarioId: number) {
    const res = await authFetch(`${BASE}/api/Emprendimientos/ObtenerPorUsuario/${usuarioId}`)
    if (res.status === 204) return null
    if (!res.ok) throw new Error("Error al obtener emprendimiento")
    return res.json()
}

// Stands de una zona en el evento (mismo endpoint que admin)
export async function fetchStandsEventoEmprendedor(evento_id: number, zona_id: number) {
    const res = await authFetch(
        `${BASE}/api/EventoZonaStand/ObtenerStandEvento/evento${evento_id}/zona${zona_id}`
    )
    if (res.status === 204) return []
    if (!res.ok) throw new Error("Error al obtener stands")
    return res.json()
}

// Ocupar stand (reservar)
export async function ocuparStand(data: {
    Stand_id: number
    Evento_id: number
    Zona_id: number
    Estado_id: number
    Emprendimiento_id: number
}): Promise<number> {
    const res = await authFetch(`${BASE}/api/EventoZonaStand/OcuparStandEvento`, {
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

// Desocupar stand (cancelar reserva)
export async function desocuparStandEmprendedor(data: {
    Stand_id: number
    Evento_id: number
    Zona_id: number
    Estado_id: number
    Emprendimiento_id: number | null
}): Promise<number> {
    const res = await authFetch(`${BASE}/api/EventoZonaStand/DesocuparStandEvento`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Error al cancelar reserva")
    return res.json()
}