export async function handleCrearEvento(
  nombreEvento: string,
  descripcion: string,
  fecha_inicio: string,
  fecha_final: string,
  horario: string,
  cupos: number,
  lugar_id: number
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    "https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Evento/CrearEvento",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        NombreEvento: nombreEvento,
        Descripcion: descripcion,
        Fecha_inicio: fecha_inicio,
        Fecha_final: fecha_final,
        Horario: horario + ":00",
        Cupos: cupos,
        Lugar_id: lugar_id,
        Estado_id: 1
      })
    }
  );



  const texto = await response.text();
  console.log("Respuesta:", texto);

  if (!response.ok) {
    throw new Error(texto);
  }

  return texto;
}