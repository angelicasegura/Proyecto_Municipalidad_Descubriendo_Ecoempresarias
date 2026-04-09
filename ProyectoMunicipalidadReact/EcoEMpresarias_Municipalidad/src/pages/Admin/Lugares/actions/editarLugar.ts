export async function editarLugar(id:number,data:any){

  const token = localStorage.getItem("token")

  const response = await fetch(
    `https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Lugar/EditarLugar/${id}`,
    {
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify(data)
    }
  )

  if(!response.ok){
    throw new Error("Error editando lugar")
  }

  return await response.json()
}