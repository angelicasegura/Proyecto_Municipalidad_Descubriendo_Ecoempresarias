export async function handleReservarEvento(data:any){

  const token = localStorage.getItem("token")

  const response = await fetch(
    "https://localhost:7050/api/ReservaEvento/CrearReserva",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body: JSON.stringify({
        Evento_id: data.evento_id,
        NombreEvento: data.nombreEvento,
        Emprendimiento_id: data.emprendimiento_id,
        Estado_id: 8,
        Nombre: data.nombre,
        Apellidos: data.apellidos,
        Cedula: data.cedula,
        NombreEmprendimiento: data.nombreEmprendimiento,
        Productos: data.productos,
        Correo: data.correo
      })
    }
  )

  if(!response.ok){
    const errorText = await response.text()
    console.error("Error backend:", errorText)
    throw new Error("Error creando reserva")
  }

  return true
}