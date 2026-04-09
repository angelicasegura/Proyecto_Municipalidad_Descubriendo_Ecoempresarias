import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { handleReservarEvento } from "./actions/handleReservarEvento"
import { Alert, AlertTitle, AlertDescription } from "../../components/ui/alert"
export default function ReservarEventoPage() {
  const navigate = useNavigate()

  const { eventoId, emprendimientoId } = useParams()

  const [nombre, setNombre] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [cedula, setCedula] = useState("")
  const [nombreEmprendimiento, setNombreEmprendimiento] = useState("")
  const [productos, setProductos] = useState("")
  const [correo, setCorreo] = useState("")
  const [nombreEvento, setNombreEvento] = useState("")

  const [alerta, setAlerta] = useState<{
    tipo: "success" | "error"
    mensaje: string
  } | null>(null)

  const cerrarFormulario = () => {
    navigate("/mis-eventos")
  }

  // Auto cerrar alerta
  useEffect(() => {
    if (alerta) {
      const timer = setTimeout(() => {
        setAlerta(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [alerta])
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      if (!eventoId || !emprendimientoId) {
        return <p>Error: emprendimiento no seleccionado</p>
      }

      await handleReservarEvento({
        evento_id: Number(eventoId),
        emprendimiento_id: Number(emprendimientoId),
        nombreEvento,
        estado_id: 8,
        nombre,
        apellidos,
        cedula,
        nombreEmprendimiento,
        productos,
        correo
      })

      setAlerta({
        tipo: "success",
        mensaje: "Solicitud enviada correctamente"
      })

      // limpiar formulario
      setNombre("")
      setApellidos("")
      setCedula("")
      setNombreEmprendimiento("")
      setProductos("")
      setCorreo("")

    } catch (error) {

      console.error(error)

      setAlerta({
        tipo: "error",
        mensaje: "Error enviando la solicitud"
      })

    }
  }

  return (

    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">

      <h1 className="text-xl font-bold mb-4">
        Solicitud de Reserva
      </h1>
      {alerta && (

        <Alert
          variant={alerta.tipo === "error" ? "destructive" : "default"}
          className="mb-4"
        >

          <AlertTitle>
            {alerta.tipo === "success" ? "Éxito" : "Error"}
          </AlertTitle>

          <AlertDescription>
            {alerta.mensaje}
          </AlertDescription>

        </Alert>

      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-sm font-semibold mb-1">
          Nombre Evento:
        </label>
        <input
          placeholder="Nombre del evento"
          className="w-full border p-2 rounded"
          value={nombreEvento}
          onChange={(e) => setNombreEvento(e.target.value)}
        />
        <label className="block text-sm font-semibold mb-1">
          Nombre:
        </label>
        <input
          placeholder="Nombre"
          className="w-full border p-2 rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label className="block text-sm font-semibold mb-1">
          Apellidos:
        </label>
        <input
          placeholder="Apellidos"
          className="w-full border p-2 rounded"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
        />
        <label className="block text-sm font-semibold mb-1">
          Cedula:
        </label>
        <input
          placeholder="Cédula"
          className="w-full border p-2 rounded"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
        />
        <label className="block text-sm font-semibold mb-1">
          Nombre del emprendimiento:
        </label>
        <input
          placeholder="Nombre del emprendimiento"
          className="w-full border p-2 rounded"
          value={nombreEmprendimiento}
          onChange={(e) => setNombreEmprendimiento(e.target.value)}
        />
        <label className="block text-sm font-semibold mb-1">
          Productos
        </label>
        <input
          placeholder="Productos"
          className="w-full border p-2 rounded"
          value={productos}
          onChange={(e) => setProductos(e.target.value)}
        />
        <label className="block text-sm font-semibold mb-1">
          Correo
        </label>
        <input
          placeholder="Correo"
          className="w-full border p-2 rounded"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded w-full">
            Enviar solicitud
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded w-full hover:bg-gray-500 "
            onClick={cerrarFormulario}
          >
            Cerrar formulario
          </button>
        </div>



      </form>

    </div>

  )
}