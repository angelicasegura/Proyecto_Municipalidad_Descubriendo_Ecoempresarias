export async function handleActualizarEstadoEvento(
  eventoId: number,
  estado: number
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Evento/ActualizarEstadoEvento/${eventoId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(estado),
    }
  );

  if (!response.ok) {
    const texto = await response.text();
    console.log(texto);
    throw new Error("Error actualizando");
  }


  return true;
}