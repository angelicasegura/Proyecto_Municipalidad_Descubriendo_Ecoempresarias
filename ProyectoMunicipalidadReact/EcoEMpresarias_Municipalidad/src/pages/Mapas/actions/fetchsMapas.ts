import { authFetch } from "../../../auth/AuthFetch";
import type { MapaRequest, MapaResponse } from "../../../types/mapaType";

const BASE = "https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Mapa";

export async function fetchMapas(): Promise<MapaResponse[]> {
    const res = await authFetch(`${BASE}/ObtenerMapas`);
    if (res.status === 204) return [];
    if (!res.ok) throw new Error("Error al obtener mapas");
    return res.json();
}

export async function fetchMapaPorId(mapa_id: number): Promise<MapaResponse | null> {
    const res = await authFetch(`${BASE}/ObtenerMapaPorId/${mapa_id}`);
    if (res.status === 204) return null;
    if (!res.ok) throw new Error("Error al obtener mapa");
    return res.json();
}

export async function agregarMapa(mapa: MapaRequest): Promise<number> {
    const res = await authFetch(`${BASE}/AgregarMapa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mapa),
    });
    if (!res.ok) throw new Error("Error al agregar mapa");
    return res.json();
}

export async function editarMapa(id: number, mapa: MapaRequest): Promise<number> {
    const res = await authFetch(`${BASE}/EditarMapa/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mapa),
    });
    if (!res.ok) throw new Error("Error al editar mapa");
    return res.json();
}

export async function activarMapa(mapa_id: number): Promise<number> {
    const res = await authFetch(`${BASE}/ActivarMapa/${mapa_id}`, { method: "PUT" });
    if (!res.ok) throw new Error("Error al activar mapa");
    return res.json();
}

export async function inactivarMapa(mapa_id: number): Promise<number> {
    const res = await authFetch(`${BASE}/InactivarMapa/${mapa_id}`, { method: "PUT" });
    if (!res.ok) throw new Error("Error al inactivar mapa");
    return res.json();
}
