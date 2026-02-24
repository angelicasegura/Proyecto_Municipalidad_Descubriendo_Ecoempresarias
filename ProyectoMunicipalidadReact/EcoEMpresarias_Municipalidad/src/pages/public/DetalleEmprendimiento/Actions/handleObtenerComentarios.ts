import { authFetch } from "../../../../auth/AuthFetch"

export async function handleObtenerComentarios(emprendimientoId: number) {
    const response = await authFetch(`https://localhost:7050/api/comentarios/emprendimiento/${emprendimientoId}`);
    if (!response.ok) {
        throw new Error("Error al obtener comentarios");
    }
    return await response.json();
}