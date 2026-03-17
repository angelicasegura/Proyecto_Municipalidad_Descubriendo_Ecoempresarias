import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Map } from "lucide-react"

import MapaList from "../Mapas/components/MapaList"
import MapaForm from "../Mapas/components/MapaForm"
import MapaEditor from "../Mapas/components/MapaEditor"

import { fetchMapas, agregarMapa, editarMapa, activarMapa, inactivarMapa } from "../Mapas/actions/fetchsMapas"
import type { MapaResponse, MapaRequest } from "../../types/mapaType"

type Vista = "lista" | "editor"

export default function MapasPage() {

    const queryClient = useQueryClient()

    const { data: mapas = [], isLoading, error } = useQuery<MapaResponse[]>({
        queryKey: ["mapas"],
        queryFn: fetchMapas,
    })

    const [vista, setVista] = useState<Vista>("lista")
    const [showModal, setShowModal] = useState(false)
    const [mapaEditando, setMapaEditando] = useState<MapaResponse | null>(null)
    const [mapaAbierto, setMapaAbierto] = useState<MapaResponse | null>(null)

    const refrescar = () => queryClient.invalidateQueries({ queryKey: ["mapas"] })

    const handleGuardar = async (datos: MapaRequest, id?: number) => {
        if (id) await editarMapa(id, datos)
        else await agregarMapa(datos)
        await refrescar()
        setShowModal(false)
        setMapaEditando(null)
    }

    const handleCambiarEstado = async (mapa_id: number, activar: boolean) => {
        if (activar) await activarMapa(mapa_id)
        else await inactivarMapa(mapa_id)
        await refrescar()
    }

    // Vista editor
    if (vista === "editor" && mapaAbierto) {
        return (
            <MapaEditor
                mapa={mapaAbierto}
                onVolver={() => { setVista("lista"); setMapaAbierto(null) }}
            />
        )
    }

    // Vista lista
    return (
        <main className="min-h-screen bg-background">

            <section className="gradient-hero py-12 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Map className="h-7 w-7 text-white" />
                        <h1 className="text-2xl md:text-3xl font-bold text-white">
                            Gestión de Mapas
                        </h1>
                    </div>
                    <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto">
                        Creá y editá mapas con stands para los eventos de la municipalidad
                    </p>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 py-8">

                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => { setMapaEditando(null); setShowModal(true) }}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        + Nuevo Mapa
                    </button>
                </div>

                {isLoading && <p className="text-gray-500 text-sm">Cargando mapas...</p>}
                {error && <p className="text-red-500 text-sm">Error al cargar mapas</p>}

                {!isLoading && !error && (
                    <MapaList
                        mapas={mapas}
                        isLoading={isLoading}
                        onEditar={(mapa) => { setMapaEditando(mapa); setShowModal(true) }}
                        onAbrir={(mapa) => { setMapaAbierto(mapa); setVista("editor") }}
                        onCambiarEstado={handleCambiarEstado}
                    />
                )}

            </section>

            {showModal && (
                <MapaForm
                    mapaEditar={mapaEditando}
                    onGuardar={handleGuardar}
                    onCancelar={() => { setShowModal(false); setMapaEditando(null) }}
                />
            )}

        </main>
    )
}
