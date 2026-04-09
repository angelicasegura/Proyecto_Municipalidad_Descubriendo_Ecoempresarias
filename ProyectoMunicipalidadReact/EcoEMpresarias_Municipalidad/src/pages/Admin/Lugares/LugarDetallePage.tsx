import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { authFetch } from "../../../auth/AuthFetch"
import { Building2, MapPin, Plus } from "lucide-react"
import type { LugarResponse, PisoResponse, PisoRequest } from "../../../types/lugarType"
import { fetchPisosPorLugar, agregarPiso, editarPiso, inactivarPiso } from "./actions/pisoActions/fetchsPiso"
import PisoCard from "./components/PisoCard"
import PisoForm from "./components/Pisoform"
import ModalConfirmar from "./components/ModalConfirmar"

export default function LugarDetallePage() {

    const { lugar_id } = useParams()
    const navigate = useNavigate()
    const lugarId = Number(lugar_id)
    const queryClient = useQueryClient()

    const [showPisoForm, setShowPisoForm]         = useState(false)
    const [pisoEditar, setPisoEditar]             = useState<PisoResponse | null>(null)
    const [pisoAInactivar, setPisoAInactivar]     = useState<PisoResponse | null>(null)
    const [inactivandoPiso, setInactivandoPiso]   = useState(false)

    // ─── Cargar datos del lugar ───────────────────────────────────────────────
    const { data: lugar, isLoading: loadingLugar } = useQuery<LugarResponse>({
        queryKey: ["lugar", lugarId],
        queryFn: async () => {
            const res = await authFetch(`https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Lugar/ObtenerLugarId/${lugarId}`)
            if (!res.ok) throw new Error("Error al cargar lugar")
            return res.json()
        },
        enabled: !!lugarId,
    })

    // ─── Cargar pisos del lugar ───────────────────────────────────────────────
    const pisosKey = ["pisos", lugarId]
    const { data: pisos = [], isLoading: loadingPisos } = useQuery<PisoResponse[]>({
        queryKey: pisosKey,
        queryFn: () => fetchPisosPorLugar(lugarId),
        enabled: !!lugarId,
    })

    const refrescarPisos = () => queryClient.invalidateQueries({ queryKey: pisosKey })

    // ─── CRUD pisos ───────────────────────────────────────────────────────────
    const handleGuardarPiso = async (piso: PisoRequest, id?: number) => {
        if (id) await editarPiso(id, piso)
        else    await agregarPiso(piso)
        await refrescarPisos()
        setShowPisoForm(false)
        setPisoEditar(null)
    }

    const handleConfirmarInactivarPiso = async () => {
        if (!pisoAInactivar) return
        setInactivandoPiso(true)
        try {
            await inactivarPiso(pisoAInactivar.piso_id)
            await refrescarPisos()
        } finally {
            setInactivandoPiso(false)
            setPisoAInactivar(null)
        }
    }

    if (loadingLugar) return <p className="p-10 text-gray-500">Cargando lugar...</p>
    if (!lugar)       return <p className="p-10 text-red-500">Lugar no encontrado</p>

    const esActivo = lugar.nombreEstado === "Activo" || lugar.nombreEstado === "ACTIVO"

    return (
        <div className="max-w-5xl mx-auto mt-10 mb-20 px-4">

            {/* Botón volver */}
            <button
                onClick={() => navigate("/admin/lugares")}
                className="text-sm text-blue-600 hover:underline mb-6 flex items-center gap-1"
            >
                ← Volver a Lugares
            </button>

            {/* Card info del lugar */}
            <div className="bg-white shadow-md rounded-xl p-6 mb-8">
                <div className="flex items-start justify-between gap-4 flex-wrap">

                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Building2 className="text-blue-600" size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{lugar.nombre}</h1>
                            <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                                <MapPin size={14} />
                                <span>{lugar.provincia}, {lugar.canton}, {lugar.distrito}</span>
                            </div>
                            {lugar.detalles && (
                                <p className="text-sm text-gray-500 mt-2">{lugar.detalles}</p>
                            )}
                        </div>
                    </div>

                    <span className={`px-3 py-1 text-xs font-semibold rounded-full self-start
                        ${esActivo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {lugar.nombreEstado}
                    </span>

                </div>
            </div>

            {/* Sección pisos */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-700">
                    Pisos ({pisos.length})
                </h2>
                <button
                    onClick={() => { setPisoEditar(null); setShowPisoForm(true) }}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm flex items-center gap-2"
                >
                    <Plus size={15} /> Agregar Piso
                </button>
            </div>

            {loadingPisos && <p className="text-gray-400 text-sm">Cargando pisos...</p>}

            {!loadingPisos && pisos.length === 0 && (
                <div className="bg-white border rounded-xl p-10 text-center text-gray-400">
                    <Building2 size={36} className="mx-auto mb-3 opacity-30" />
                    <p>Este lugar no tiene pisos aún. Agregá el primero.</p>
                </div>
            )}

            <div className="flex flex-col gap-4">
                {pisos.map(piso => (
                    <PisoCard
                        key={piso.piso_id}
                        piso={piso}
                        onEditarPiso={(p) => { setPisoEditar(p); setShowPisoForm(true) }}
                        onInactivarPiso={(id) => {
                            const encontrado = pisos.find(p => p.piso_id === id) ?? null
                            setPisoAInactivar(encontrado)
                        }}
                    />
                ))}
            </div>

            {/* Modal piso */}
            {showPisoForm && (
                <PisoForm
                    lugarId={lugarId}
                    pisoEditar={pisoEditar}
                    onGuardar={handleGuardarPiso}
                    onCancelar={() => { setShowPisoForm(false); setPisoEditar(null) }}
                />
            )}

            {/* Modal confirmar inactivar piso */}
            {pisoAInactivar && (
                <ModalConfirmar
                    titulo="Inactivar Piso"
                    mensaje={`¿Estás seguro que querés inactivar el piso "${pisoAInactivar.nombre_Piso}"? Esta acción también afectará sus zonas.`}
                    onConfirmar={handleConfirmarInactivarPiso}
                    onCancelar={() => setPisoAInactivar(null)}
                    cargando={inactivandoPiso}
                />
            )}

        </div>
    )
}