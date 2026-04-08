export async function fetchMisEventos(emprendimientoId: number) {

  const token = localStorage.getItem("token")

  const response = await fetch(
    `https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/ReservaEvento/MisReservas/${emprendimientoId}`,
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