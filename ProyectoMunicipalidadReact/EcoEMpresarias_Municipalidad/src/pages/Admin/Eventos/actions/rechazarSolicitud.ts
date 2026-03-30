export async function rechazarSolicitud(reservaId:number){

  const token = localStorage.getItem("token")

  const response = await fetch(
    `https://localhost:7050/api/ReservaEvento/Rechazar/${reservaId}`,
    {
      method:"PUT",
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  )

  if(!response.ok){
    throw new Error("Error rechazando solicitud")
  }

  return true
}