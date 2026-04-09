export async function fetchSolicitudesEventos(){

  const token = localStorage.getItem("token")

  const response = await fetch(
    "https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/ReservaEvento/Solicitudes",
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