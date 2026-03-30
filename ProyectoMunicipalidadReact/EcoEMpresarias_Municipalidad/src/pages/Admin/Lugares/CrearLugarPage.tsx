import { useState, useEffect } from "react"
import { crearLugar } from "./actions/crearLugar"
import { useNavigate } from "react-router-dom"

import { Alert, AlertTitle, AlertDescription } from "../../../components/ui/alert"

export default function CrearLugarPage() {

  const navigate = useNavigate()

  const [nombre, setNombre] = useState("")
  const [provincia, setProvincia] = useState("")
  const [canton, setCanton] = useState("")
  const [distrito, setDistrito] = useState("")
  const [detalles, setDetalles] = useState("")

  const [alerta, setAlerta] = useState<{
    tipo: "success" | "error"
    mensaje: string
  } | null>(null)

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

      await crearLugar({
        nombre,
        provincia,
        canton,
        distrito,
        detalles,
        estado_id: 1
      })

      setAlerta({
        tipo: "success",
        mensaje: "Lugar creado correctamente"
      })

      setNombre("")
      setProvincia("")
      setCanton("")
      setDistrito("")
      setDetalles("")

      setTimeout(() => {
        navigate("/admin/lugares")
      }, 2000)

    } catch (error) {

      console.error(error)

      setAlerta({
        tipo: "error",
        mensaje: "Error creando el lugar"
      })

    }
  }

  return (

    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">

      <h1 className="text-xl font-bold mb-4">
        Crear Lugar
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

        <label className="block text-sm font-medium">
          Nombre del lugar:
        </label>

        <input
          className="w-full border p-2 rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label className="block text-sm font-medium">
          Provincia:
        </label>

        <input
          className="w-full border p-2 rounded"
          value={provincia}
          onChange={(e) => setProvincia(e.target.value)}
        />

        <label className="block text-sm font-medium">
          Cantón:
        </label>

        <input
          className="w-full border p-2 rounded"
          value={canton}
          onChange={(e) => setCanton(e.target.value)}
        />

        <label className="block text-sm font-medium">
          Distrito:
        </label>

        <input
          className="w-full border p-2 rounded"
          value={distrito}
          onChange={(e) => setDistrito(e.target.value)}
        />

        <label className="block text-sm font-medium">
          Detalles:
        </label>

        <textarea
          className="w-full border p-2 rounded"
          value={detalles}
          onChange={(e) => setDetalles(e.target.value)}
        />

        <div className="flex gap-3 mt-4">

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition"
          >
            Crear Lugar
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/lugares")}
            className="bg-gray-400 text-white px-4 py-2 rounded w-full hover:bg-gray-500 transition"
          >
            Cancelar
          </button>

        </div>

      </form>

    </div>

  )
}