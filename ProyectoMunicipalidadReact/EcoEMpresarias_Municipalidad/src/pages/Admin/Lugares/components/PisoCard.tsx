import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChevronDown, ChevronUp, MapPin, Plus, Pencil, PowerOff } from "lucide-react"
import type { PisoResponse, ZonaResponse, ZonaRequest } from "../../../../types/lugarType"
import { fetchZonasPorPiso, agregarZona, editarZona, inactivarZona } from "../actions/zonaActions/fetchsZona"
import ZonaForm from "./Zonaform"
import ModalConfirmar from "./ModalConfirmar"
import ModalAsignarMapa from "./ModalAsignarMapa"

interface Props {
    piso: PisoResponse
    onEditarPiso: (piso: PisoResponse) => void
    onInactivarPiso: (id: number) => void
}

export default function PisoCard({ piso, onEditarPiso, onInactivarPiso }: Props) {

    const queryClient = useQueryClient()
    const queryKey = ["zonas", piso.piso_id]

    const [abierto, setAbierto] = useState(false)
    const [showZonaForm, setShowZonaForm] = useState(false)
    const [zonaEditar, setZonaEditar] = useState<ZonaResponse | null>(null)
    const [zonaAInactivar, setZonaAInactivar] = useState<ZonaResponse | null>(null)
    const [inactivandoZona, setInactivandoZona] = useState(false)
    const [zonaAsignarMapa, setZonaAsignarMapa] = useState<ZonaResponse | null>(null)

    const { data: zonas = [], isLoading } = useQuery<ZonaResponse[]>({
        queryKey,
        queryFn: () => fetchZonasPorPiso(piso.piso_id),
        enabled: abierto,
    })

    const refrescar = () => queryClient.invalidateQueries({ queryKey })

    const handleGuardarZona: (zona: ZonaRequest, id?: number) => Promise<void> = async (zona, id) => {
        if (id) await editarZona(id, zona)
        else await agregarZona(zona)
        await refrescar()
        setShowZonaForm(false)
        setZonaEditar(null)
    }

    const handleConfirmarInactivarZona = async () => {
        if (!zonaAInactivar) return
        setInactivandoZona(true)
        try {
            await inactivarZona(zonaAInactivar.zona_id)
            await refrescar()
        } finally {
            setInactivandoZona(false)
            setZonaAInactivar(null)
        }
    }

    // Asignar mapa: llama a editarZona con el mapa_id seleccionado
    const handleAsignarMapa: (zona: ZonaRequest, id: number) => Promise<void> = async (zona, id) => {
        await editarZona(id, zona)
        await refrescar()
        setZonaAsignarMapa(null)
    }

    const esActivo = piso.nombreEstado === "Activo" || piso.nombreEstado === "ACTIVO"

    return (
        <>
            <div className="bg-white border rounded-lg overflow-hidden shadow-sm">

                {/* Header del piso */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">

                    <div className="flex items-center gap-3">
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">
                            Piso {piso.numero_Piso}
                        </span>
                        <span className="font-semibold text-gray-800">{piso.nombre_Piso}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                            ${esActivo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                            {piso.nombreEstado}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onEditarPiso(piso)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs font-semibold transition flex items-center gap-1"
                        >
                            <Pencil size={12} /> Editar
                        </button>
                        <button
                            onClick={() => onInactivarPiso(piso.piso_id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold transition flex items-center gap-1"
                        >
                            <PowerOff size={12} /> Inactivar
                        </button>
                        <button
                            onClick={() => setAbierto(!abierto)}
                            className="ml-2 text-gray-500 hover:text-gray-700 transition"
                            title={abierto ? "Colapsar" : "Ver zonas"}
                        >
                            {abierto ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                    </div>

                </div>

                {/* Zonas expandibles */}
                {abierto && (
                    <div className="p-4">

                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Zonas
                            </p>
                            <button
                                onClick={() => { setZonaEditar(null); setShowZonaForm(true) }}
                                className="bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-700 transition flex items-center gap-1"
                            >
                                <Plus size={12} /> Agregar Zona
                            </button>
                        </div>

                        {isLoading && <p className="text-sm text-gray-400">Cargando zonas...</p>}

                        {!isLoading && zonas.length === 0 && (
                            <p className="text-sm text-gray-400 text-center py-4">
                                No hay zonas en este piso. Agregá una.
                            </p>
                        )}

                        {!isLoading && zonas.length > 0 && (
                            <table className="w-full text-left text-sm">
                                <thead className="border-b">
                                    <tr className="text-gray-500 text-xs uppercase">
                                        <th className="pb-2">Nombre</th>
                                        <th className="pb-2">Descripción</th>
                                        <th className="pb-2">Mapa</th>
                                        <th className="pb-2">Estado</th>
                                        <th className="pb-2 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {zonas.map(zona => {
                                        const zonaActiva = zona.estadoNombre === "Activo" || zona.estadoNombre === "ACTIVO"
                                        return (
                                            <tr key={zona.zona_id} className="hover:bg-gray-50 transition">
                                                <td className="py-2 font-medium text-gray-800">{zona.nombre}</td>
                                                <td className="py-2 text-gray-500 max-w-[200px] truncate">{zona.descripcion || "—"}</td>
                                                <td className="py-2">
                                                    {zona.nombreMapa ? (
                                                        <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded font-medium">
                                                            {zona.nombreMapa}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400 text-xs">Sin mapa</span>
                                                    )}
                                                </td>
                                                <td className="py-2">
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                                                        ${zonaActiva ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                                                        {zona.estadoNombre}
                                                    </span>
                                                </td>
                                                <td className="py-2">
                                                    <div className="flex items-center gap-2 justify-center">
                                                        <button
                                                            onClick={() => { setZonaEditar(zona); setShowZonaForm(true) }}
                                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold transition"
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            onClick={() => setZonaAInactivar(zona)}
                                                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold transition"
                                                        >
                                                            Inactivar
                                                        </button>
                                                        <button
                                                            onClick={() => setZonaAsignarMapa(zona)}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold transition flex items-center gap-1"
                                                        >
                                                            <MapPin size={11} /> Asignar Mapa
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>

            {/* Modal agregar/editar zona */}
            {showZonaForm && (
                <ZonaForm
                    pisoId={piso.piso_id}
                    zonaEditar={zonaEditar}
                    onGuardar={handleGuardarZona}
                    onCancelar={() => { setShowZonaForm(false); setZonaEditar(null) }}
                />
            )}

            {/* Modal confirmar inactivar zona */}
            {zonaAInactivar && (
                <ModalConfirmar
                    titulo="Inactivar Zona"
                    mensaje={`¿Estás seguro que querés inactivar la zona "${zonaAInactivar.nombre}"?`}
                    onConfirmar={handleConfirmarInactivarZona}
                    onCancelar={() => setZonaAInactivar(null)}
                    cargando={inactivandoZona}
                />
            )}

            {/* Modal asignar mapa a zona */}
            {zonaAsignarMapa && (
                <ModalAsignarMapa
                    zona={zonaAsignarMapa}
                    pisoId={piso.piso_id}
                    onConfirmar={handleAsignarMapa}
                    onCancelar={() => setZonaAsignarMapa(null)}
                />
            )}
        </>
    )
}