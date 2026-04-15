import { authFetch } from "../../../auth/AuthFetch";
import  type { StandRequest, StandResponse } from "../../../types/mapaType";

const BASE = "https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Stand";

export async function fetchStandsPorMapa(mapa_id: number): Promise<StandResponse[]> {
    const res = await authFetch(`${BASE}/ObtenerStandPorMapa/${mapa_id}`);
    if (res.status === 204) return [];
    if (!res.ok) throw new Error("Error al obtener stands");
    return res.json();
}

export async function fetchStandPorId(stand_id: number): Promise<StandResponse> {
    const res = await authFetch(`${BASE}/ObtenerStandPorId/${stand_id}`);
    if (!res.ok) throw new Error("Error al obtener stand");
    return res.json();
}

export async function agregarStand(stand: StandRequest): Promise<number> {
    const res = await authFetch(`${BASE}/AgregarStand`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stand),
    });
    if (!res.ok) throw new Error("Error al agregar stand");
    return res.json();
}

export async function actualizarStand(id: number, stand: StandRequest): Promise<number> {
    const res = await authFetch(`${BASE}/EditarStand/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stand),
    });
    if (!res.ok) throw new Error("Error al actualizar stand");
    return res.json();
}

export async function activarStand(stand_id: number): Promise<number> {
    const res = await authFetch(`${BASE}/ActivarStand/${stand_id}`, { method: "PUT" });
    if (!res.ok) throw new Error("Error al activar stand");
    return res.json();
}

export async function inactivarStand(stand_id: number): Promise<number> {
    const res = await authFetch(`${BASE}/InactivarStand/${stand_id}`, { method: "PUT" });
    if (!res.ok) throw new Error("Error al inactivar stand");
    return res.json();
}
