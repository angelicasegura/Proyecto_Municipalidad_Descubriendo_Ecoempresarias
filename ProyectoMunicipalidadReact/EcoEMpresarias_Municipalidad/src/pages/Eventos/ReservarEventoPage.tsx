import { useParams } from "react-router-dom"
import { useState } from "react"
import { handleReservarEvento } from "./actions/handleReservarEvento"

export default function ReservarEventoPage(){

  const { eventoId,emprendimientoId } = useParams()

  const [nombre,setNombre] = useState("")
  const [apellidos,setApellidos] = useState("")
  const [cedula,setCedula] = useState("")
  const [nombreEmprendimiento,setNombreEmprendimiento] = useState("")
  const [productos,setProductos] = useState("")
  const [correo,setCorreo] = useState("")

  const handleSubmit = async(e:any)=>{
    e.preventDefault()

    try{
        if (!eventoId || !emprendimientoId) {
        return <p>Error: emprendimiento no seleccionado</p>
        }

      await handleReservarEvento({
        evento_id:Number(eventoId),
        emprendimiento_id:Number(emprendimientoId),
        estado_id:6,
        nombre,
        apellidos,
        cedula,
        nombreEmprendimiento,
        productos,
        correo
      })

      alert("Solicitud enviada correctamente")

    }catch(error){
      console.error(error)
      alert("Error enviando solicitud")
    }
  }

  return(

    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">

      <h1 className="text-xl font-bold mb-4">
        Solicitud de Reserva
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
        placeholder="Nombre"
        className="w-full border p-2 rounded"
        value={nombre}
        onChange={(e)=>setNombre(e.target.value)}
        />

        <input
        placeholder="Apellidos"
        className="w-full border p-2 rounded"
        value={apellidos}
        onChange={(e)=>setApellidos(e.target.value)}
        />

        <input
        placeholder="Cédula"
        className="w-full border p-2 rounded"
        value={cedula}
        onChange={(e)=>setCedula(e.target.value)}
        />

        <input
        placeholder="Nombre del emprendimiento"
        className="w-full border p-2 rounded"
        value={nombreEmprendimiento}
        onChange={(e)=>setNombreEmprendimiento(e.target.value)}
        />

        <input
        placeholder="Productos"
        className="w-full border p-2 rounded"
        value={productos}
        onChange={(e)=>setProductos(e.target.value)}
        />

        <input
        placeholder="Correo"
        className="w-full border p-2 rounded"
        value={correo}
        onChange={(e)=>setCorreo(e.target.value)}
        />

        <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Enviar solicitud
        </button>

      </form>

    </div>

  )
}