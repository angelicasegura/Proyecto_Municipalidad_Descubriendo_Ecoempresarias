export async function handleDesactivarEvento(eventoId:number){

  const token = localStorage.getItem("token")

  const response = await fetch(
    `https://localhost:7050/api/Evento/InactivarEvento/${eventoId}`,
    {
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      }
    }
  )

  if(!response.ok){
    throw new Error("Error desactivando evento")
  }

  return await response.json()
}