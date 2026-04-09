export async function handleEditarEvento(
  eventoId: number,
  nombreEvento: string,
  descripcion: string,
  fecha_inicio: string,
  fecha_Final: string,
  horario: string,
  cupos: number,
  lugar_id: number
) {

  const token = localStorage.getItem("token")

  const response = await fetch(
    `https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Evento/EditarEvento/${eventoId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        nombreEvento: nombreEvento,
        descripcion: descripcion,
        fecha_inicio: fecha_inicio,
        fecha_Final: fecha_Final,
        horario: horario + ":00",
        cupos: cupos,
        cupos_actuales: cupos,
        lugar_id: lugar_id,
        estado_id: 1
      })
    }
  )

  if (!response.ok) {
    throw new Error("Error editando evento")
  }

  return await response.json()
}