import { useState } from "react"
import type { MapaResponse } from "../../../types/mapaType"
import { Map } from "lucide-react"

interface Props {
  mapas: MapaResponse[]
  isLoading: boolean
  onEditar: (mapa: MapaResponse) => void
  onAbrir: (mapa: MapaResponse) => void
  onCambiarEstado: (mapa_id: number, activar: boolean) => Promise<void>
}

export default function MapaList({ mapas, isLoading, onEditar, onAbrir, onCambiarEstado }: Props) {

  const [procesando, setProcesando] = useState<number | null>(null)

  const handleEstado = async (mapa: MapaResponse) => {
    const activar = mapa.estadoNombre !== "ACTIVO"
    setProcesando(mapa.mapa_id)
    await onCambiarEstado(mapa.mapa_id, activar)
    setProcesando(null)
  }

  if (isLoading) return <p className="text-gray-500 text-sm">Cargando mapas...</p>

  if (mapas.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-12 text-center text-gray-400">
        <Map size={40} className="mx-auto mb-3 opacity-30" />
        <p>No hay mapas creados aún</p>
      </div>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <table className="w-full text-left">
        <thead className="border-b">
          <tr className="text-gray-600 text-sm">
            <th className="pb-2">#</th>
            <th className="pb-2">Nombre</th>
            <th className="pb-2">Dimensiones</th>
            <th className="pb-2">Escala</th>
            <th className="pb-2">Estado</th>
            <th className="pb-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mapas.map((mapa, index) => {
            const esActivo = mapa.estadoNombre === "ACTIVO"
            return (
              <tr key={mapa.mapa_id} className="border-b text-sm">
                <td className="py-3 text-gray-500">{index + 1}</td>
                <td className="py-3 font-medium text-gray-800">{mapa.nombre}</td>
                <td className="py-3 text-gray-600">{mapa.ancho} × {mapa.alto} px</td>
                <td className="py-3 text-gray-600">{mapa.escala}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold
                    ${esActivo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {mapa.estadoNombre}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => onAbrir(mapa)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition"
                    >
                      Abrir Editor
                    </button>
                    <button
                      onClick={() => onEditar(mapa)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-xs hover:bg-yellow-600 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEstado(mapa)}
                      disabled={procesando === mapa.mapa_id}
                      className={`px-3 py-1 rounded text-xs text-white transition disabled:opacity-50
                        ${esActivo ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"}`}
                    >
                      {procesando === mapa.mapa_id ? "..." : esActivo ? "Inactivar" : "Activar"}
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
