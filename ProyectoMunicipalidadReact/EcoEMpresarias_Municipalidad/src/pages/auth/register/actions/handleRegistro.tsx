export async function registrarUsuario(data: any) {
  const response = await fetch("https://localhost:7050/auth/registro", {
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