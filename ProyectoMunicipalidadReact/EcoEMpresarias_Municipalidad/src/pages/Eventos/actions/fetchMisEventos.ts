export async function fetchMisEventos(emprendimientoId: number) {

  const token = localStorage.getItem("token")

  const response = await fetch(
    `https://localhost:7050/api/ReservaEvento/MisReservas/${emprendimientoId}`,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  )

  if(!response.ok){
    throw new Error("Error cargando eventos")
  }

  return await response.json()
}