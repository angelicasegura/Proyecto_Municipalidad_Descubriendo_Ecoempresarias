export async function fetchLugares(){

  const token = localStorage.getItem("token")

  const response = await fetch(
    "https://localhost:7050/api/Lugar/ObtenerLugares",
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  )

  if(!response.ok){
    throw new Error("Error cargando lugares")
  }

  return await response.json()
}