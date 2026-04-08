export async function registrarUsuario(data: any) {
  const response = await fetch("https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/auth/registro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const msg = await response.text()
    throw new Error(msg || "Error al registrar")
  }

  return await response.json()
}