export async function aprobarSolicitud(reservaId:number){

  const token = localStorage.getItem("token")

  const response = await fetch(
    `https://localhost:7050/api/ReservaEvento/Aprobar/${reservaId}`,
    {
      method:"PUT",
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  )

  if(!response.ok){
    throw new Error("Error aprobando solicitud")
  }

  return true
}