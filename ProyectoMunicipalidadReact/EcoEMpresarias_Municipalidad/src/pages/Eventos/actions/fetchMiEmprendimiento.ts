export async function fetchMiEmprendimiento(usuarioId:number){

  const token = localStorage.getItem("token")

  const response = await fetch(
    `https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Emprendimiento/ObtenerPorUsuario/${usuarioId}`,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  )

  if(!response.ok){
    throw new Error("Error cargando emprendimiento")
  }

  return await response.json()
}