export async function inactivarLugar(id:number){

  const token = localStorage.getItem("token")

  const response = await fetch(
    `https://localhost:7050/api/Lugar/InactivarLugar/${id}`,
    {
      method:"PUT",
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  )

  if(!response.ok){
    throw new Error("Error inactivando lugar")
  }

  return true
}