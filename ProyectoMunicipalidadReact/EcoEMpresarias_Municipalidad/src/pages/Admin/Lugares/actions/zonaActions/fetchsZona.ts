import { authFetch } from "../../../../../auth/AuthFetch"
import type { ZonaRequest, ZonaResponse } from "../../../../../types/lugarType"

const BASE = "https://localhost:7050/api/Zona"

export async function fetchZonasPorPiso(piso_id: number): Promise<ZonaResponse[]> {
    const res = await authFetch(`${BASE}/ObtenerZonasPorPiso/${piso_id}`)
    if (res.status === 204) return []
    if (!res.ok) throw new Error("Error al obtener zonas")
    return res.json()
}

export async function agregarZona(zona: ZonaRequest): Promise<number> {
    const res = await authFetch(`${BASE}/AgregarZona`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(zona),
    })
    if (!res.ok) throw new Error("Error al agregar zona")
    return res.json()
}

export async function editarZona(id: number, zona: ZonaRequest): Promise<number> {
    const res = await authFetch(`${BASE}/EditarZona/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(zona),
    })
    if (!res.ok) throw new Error("Error al editar zona")
    return res.json()
}

export async function activarZona(zona_id: number): Promise<number> {
    const res = await authFetch(`${BASE}/ActivarZona/${zona_id}`, { method: "PUT" })
    if (!res.ok) throw new Error("Error al activar zona")
    return res.json()
}

export async function inactivarZona(zona_id: number): Promise<number> {
    const res = await authFetch(`${BASE}/InactivarZona/${zona_id}`, { method: "PUT" })
    if (!res.ok) throw new Error("Error al inactivar zona")
    return res.json()
}