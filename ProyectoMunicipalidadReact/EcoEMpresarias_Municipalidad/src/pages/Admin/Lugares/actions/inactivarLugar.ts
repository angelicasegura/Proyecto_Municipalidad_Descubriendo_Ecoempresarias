export async function inactivarLugar(id:number){

  const token = localStorage.getItem("token")

  const response = await fetch(
    `https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Lugar/InactivarLugar/${id}`,
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