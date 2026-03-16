import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"

import { authFetch } from "../../../auth/AuthFetch"
import { editarLugar } from "./actions/editarLugar"

import { Alert, AlertTitle, AlertDescription } from "../../../components/ui/alert"

export default function EditarLugarPage() {

  const { id } = useParams()
  const navigate = useNavigate()

  const { data: lugar } = useQuery({
    queryKey: ["lugar", id],
    queryFn: async () => {
      const res = await authFetch(`https://localhost:7050/api/Lugar/ObtenerLugarId/${id}`)
      return res.json()
    }
  })

  const [nombre, setNombre] = useState("")
  const [provincia, setProvincia] = useState("")
  const [canton, setCanton] = useState("")
  const [distrito, setDistrito] = useState("")
  const [detalles, setDetalles] = useState("")

  const [alerta, setAlerta] = useState<{
    tipo: "success" | "error"
    mensaje: string
  } | null>(null)

  // cargar datos del lugar
  useEffect(() => {
    if (lugar) {
      setNombre(lugar.nombre)
      setProvincia(lugar.provincia)
      setCanton(lugar.canton)
      setDistrito(lugar.distrito)
      setDetalles(lugar.detalles)
    }
  }, [lugar])

  // cerrar alerta automáticamente
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

      await editarLugar(Number(id), {
        nombre,
        provincia,
        canton,
        distrito,
        detalles,
        estado_id: 1
      })

      setAlerta({
        tipo: "success",
        mensaje: "Lugar actualizado correctamente"
      })

      setTimeout(() => {
        navigate("/admin/lugares")
      }, 2000)

    } catch (error) {

      console.error(error)

      setAlerta({
        tipo: "error",
        mensaje: "Error actualizando el lugar"
      })

    }
  }

  return (

    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">

      <h1 className="text-xl font-bold mb-4">
        Editar Lugar
      </h1>

      {/* ALERTA */}

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
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <label className="block text-sm font-medium">
          Provincia:
        </label>

        <input
          value={provincia}
          onChange={(e) => setProvincia(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <label className="block text-sm font-medium">
          Cantón:
        </label>

        <input
          value={canton}
          onChange={(e) => setCanton(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <label className="block text-sm font-medium">
          Distrito:
        </label>

        <input
          value={distrito}
          onChange={(e) => setDistrito(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <label className="block text-sm font-medium">
          Detalles:
        </label>

        <textarea
          value={detalles}
          onChange={(e) => setDetalles(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-3 mt-4">

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
          >
            Guardar cambios
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