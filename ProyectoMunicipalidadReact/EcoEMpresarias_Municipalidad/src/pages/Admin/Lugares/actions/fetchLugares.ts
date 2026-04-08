export async function fetchLugares(){

  const token = localStorage.getItem("token")

  const response = await fetch(
    "https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Lugar/ObtenerLugares",
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