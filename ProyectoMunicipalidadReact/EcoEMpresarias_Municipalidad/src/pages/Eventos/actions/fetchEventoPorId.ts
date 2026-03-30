export async function fetchEventoPorId(id: number) {
    const response = await fetch(`https://localhost:7050/api/Evento/ObtenerEvento/${id}`);
    if (!response.ok) {
        throw new Error("Error cargando evento")
    }
    return response.json()
}