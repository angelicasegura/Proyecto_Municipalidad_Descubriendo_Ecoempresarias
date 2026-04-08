export async function fetchEventoPorId(id: number) {
    const response = await fetch(`https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Evento/ObtenerEvento/${id}`);
    if (!response.ok) {
        throw new Error("Error cargando evento")
    }
    return response.json()
}