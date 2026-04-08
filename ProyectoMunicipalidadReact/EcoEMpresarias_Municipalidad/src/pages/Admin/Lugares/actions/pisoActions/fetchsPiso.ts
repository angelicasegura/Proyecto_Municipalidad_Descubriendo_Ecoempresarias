import { authFetch } from "../../../../../auth/AuthFetch"
import type { PisoRequest, PisoResponse } from "../../../../../types/lugarType"

const BASE = "https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Piso"

export async function fetchPisosPorLugar(lugar_id: number): Promise<PisoResponse[]> {
    const res = await authFetch(`${BASE}/ObtenerPisoPorLugar/${lugar_id}`)
    if (res.status === 204) return []
    if (!res.ok) throw new Error("Error al obtener pisos")
    return res.json()
}

export async function fetchPisoPorId(id: number): Promise<PisoResponse | null> {
    const res = await authFetch(`${BASE}/ObtenerPisoPorId/${id}`)
    if (res.status === 204) return null
    if (!res.ok) throw new Error("Error al obtener piso")
    return res.json()
}

export async function agregarPiso(piso: PisoRequest): Promise<number> {
    const res = await authFetch(`${BASE}/AgregarPiso`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(piso),
    })
    if (!res.ok) throw new Error("Error al agregar piso")
    return res.json()
}

export async function editarPiso(id: number, piso: PisoRequest): Promise<number> {
    const res = await authFetch(`${BASE}/EditarPiso/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(piso),
    })
    if (!res.ok) throw new Error("Error al editar piso")
    return res.json()
}

export async function inactivarPiso(id: number): Promise<number> {
    const res = await authFetch(`${BASE}/InactivarPiso/${id}`, { method: "PUT" })
    if (!res.ok) throw new Error("Error al inactivar piso")
    return res.json()
}