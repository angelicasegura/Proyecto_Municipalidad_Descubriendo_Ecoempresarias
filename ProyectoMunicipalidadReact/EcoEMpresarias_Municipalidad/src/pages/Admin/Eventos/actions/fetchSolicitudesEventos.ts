export async function fetchSolicitudesEventos(){

  const token = localStorage.getItem("token")

  const response = await fetch(
    "https://localhost:7050/api/ReservaEvento/Solicitudes",
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  )

  if(!response.ok){
    throw new Error("Error cargando solicitudes")
  }

  return await response.json()
}