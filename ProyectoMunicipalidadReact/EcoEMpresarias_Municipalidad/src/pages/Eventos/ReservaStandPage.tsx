import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Building2, Map, ChevronDown, ChevronUp, Calendar, MapPin } from "lucide-react"
import { useAuth } from "../../auth/AuthContext"
import { fetchPisosActivosEvento, fetchZonasActivasEvento, fetchEmprendimientoPorUsuario } from "./actions/fetchReservaStand"
import { authFetch } from "../../auth/AuthFetch"
import type { EventoPisoActivoResponse, EventoZonaActivaResponse } from "../../types/reservaType"
import MapaReservaStand from "./components/MapaReservaStand"
import SelectorEmprendimiento from "./components/SelectorEmpredimeinto"

export default function ReservarStandPage() {

    const { evento_id } = useParams()
    const eventoId = Number(evento_id)
    const navigate = useNavigate()
    const { user } = useAuth()

    const [pisoAbierto, setPisoAbierto] = useState<number | null>(null)
    const [zonaVerMapa, setZonaVerMapa] = useState<EventoZonaActivaResponse | null>(null)
    // emprendimientoId seleccionado — null = aún no eligió
    const [emprendimientoId, setEmprendimientoId] = useState<number | null>(null)
    const [mostrarSelector, setMostrarSelector] = useState(false)
    // zona pendiente mientras espera que el usuario elija emprendimiento
    const [zonaPendiente, setZonaPendiente] = useState<EventoZonaActivaResponse | null>(null)

    // Datos del evento
    const { data: evento } = useQuery({
        queryKey: ["evento", eventoId],
        queryFn: async () => {
            const res = await authFetch(`https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Evento/ObtenerEvento/${eventoId}`)
            if (!res.ok) throw new Error("Error al cargar evento")
            return res.json()
        },
        enabled: !!eventoId,
    })

    // Todos los emprendimientos del usuario
    const { data: emprendimientos = [], isLoading: loadingEmp } = useQuery<any[]>({
        queryKey: ["emprendimientosUsuario", user?.id],
        queryFn: () => fetchEmprendimientoPorUsuario(user!.id),
        enabled: !!user?.id,
    })

    // Pisos activos del evento
    const { data: pisos = [], isLoading: loadingPisos } = useQuery<EventoPisoActivoResponse[]>({
        queryKey: ["pisosActivosEvento", eventoId],
        queryFn: () => fetchPisosActivosEvento(eventoId),
        enabled: !!eventoId,
    })

    // Zonas activas del evento
    const { data: zonasEvento = [], isLoading: loadingZonas } = useQuery<EventoZonaActivaResponse[]>({
        queryKey: ["zonasActivasEvento", eventoId],
        queryFn: () => fetchZonasActivasEvento(eventoId),
        enabled: !!eventoId,
    })

    const getZonasDePiso = (piso_id: number): EventoZonaActivaResponse[] =>
        zonasEvento.filter(z => z.piso_id === piso_id)

    // Cuando el emprendedor hace clic en "Ver Mapa y Reservar"
    const handleVerMapa = (zona: EventoZonaActivaResponse) => {
        if (emprendimientos.length === 1) {
            // Solo un emprendimiento → usarlo directo
            setEmprendimientoId(emprendimientos[0].emprendimientoId)
            setZonaVerMapa(zona)
        } else {
            // Varios emprendimientos → mostrar selector
            setZonaPendiente(zona)
            setMostrarSelector(true)
        }
    }

    // Cuando elige el emprendimiento en el selector
    const handleSeleccionarEmprendimiento = (id: number) => {
        setEmprendimientoId(id)
        setMostrarSelector(false)
        if (zonaPendiente) {
            setZonaVerMapa(zonaPendiente)
            setZonaPendiente(null)
        }
    }

    const isLoading = loadingPisos || loadingZonas || loadingEmp

    return (
        <main className="min-h-screen bg-background">

            {/* Hero */}
            <section className="gradient-hero py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate(`/eventos/${eventoId}`)}
                        className="text-white/70 hover:text-white text-sm mb-4 flex items-center gap-1 transition"
                    >
                        ← Volver al evento
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <Map className="h-7 w-7 text-white" />
                        <h1 className="text-2xl md:text-3xl font-bold text-white">
                            Seleccionar Stand
                        </h1>
                    </div>
                    {evento && (
                        <div className="flex items-center gap-4 text-white/80 text-sm mt-2 flex-wrap">
                            <div className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                {new Date(evento.fecha_inicio).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <MapPin size={14} />
                                {evento.nombreLugar}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 py-8">

                {/* Sin emprendimientos */}
                {!loadingEmp && emprendimientos.length === 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                        <p className="text-yellow-700 font-semibold">No tenés emprendimientos registrados</p>
                        <p className="text-yellow-600 text-sm mt-1">
                            Necesitás tener un emprendimiento para reservar un stand.
                        </p>
                    </div>
                )}

                {isLoading && <p className="text-gray-400 text-sm">Cargando disponibilidad...</p>}

                {!isLoading && pisos.length === 0 && (
                    <div className="bg-white shadow rounded-lg p-10 text-center text-gray-400">
                        <Building2 size={36} className="mx-auto mb-3 opacity-30" />
                        <p>Este evento no tiene pisos habilitados aún.</p>
                    </div>
                )}

                {/* Emprendimiento seleccionado actualmente */}
                {emprendimientoId && emprendimientos.length > 1 && (
                    <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-lg px-4 py-3 mb-4">
                        <div className="flex items-center gap-2">
                            <Building2 size={15} className="text-orange-500" />
                            <span className="text-sm text-orange-700 font-medium">
                                Reservando como: <strong>
                                    {emprendimientos.find(e => e.emprendimientoId === emprendimientoId)?.nombre}
                                </strong>
                            </span>
                        </div>
                        <button
                            onClick={() => setMostrarSelector(true)}
                            className="text-xs text-orange-600 hover:underline font-medium"
                        >
                            Cambiar
                        </button>
                    </div>
                )}

                {/* Lista de pisos */}
                {!isLoading && pisos.length > 0 && emprendimientos.length > 0 && (
                    <div className="flex flex-col gap-4">

                        <p className="text-sm text-gray-500 mb-2">
                            Seleccioná un piso, luego una zona y elegí tu stand en el mapa.
                        </p>

                        {pisos.map(piso => {
                            const zonas = getZonasDePiso(piso.piso_id)
                            const abierto = pisoAbierto === piso.piso_id

                            return (
                                <div key={piso.piso_id} className="bg-white border rounded-lg overflow-hidden shadow-sm">

                                    <button
                                        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border-b hover:bg-gray-100 transition"
                                        onClick={() => setPisoAbierto(abierto ? null : piso.piso_id)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">
                                                Piso {piso.numero_piso}
                                            </span>
                                            <span className="font-semibold text-gray-800 text-sm">{piso.nombre_piso}</span>
                                            <span className="text-xs text-gray-400">
                                                {zonas.length} zona{zonas.length !== 1 ? "s" : ""}
                                            </span>
                                        </div>
                                        {abierto
                                            ? <ChevronUp size={18} className="text-gray-400" />
                                            : <ChevronDown size={18} className="text-gray-400" />}
                                    </button>

                                    {abierto && (
                                        <div className="p-4">
                                            {zonas.length === 0 ? (
                                                <p className="text-sm text-gray-400 text-center py-4">
                                                    No hay zonas habilitadas en este piso.
                                                </p>
                                            ) : (
                                                <div className="grid gap-3 sm:grid-cols-2">
                                                    {zonas.map(zona => (
                                                        <div
                                                            key={zona.zona_id}
                                                            className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition"
                                                        >
                                                            <p className="font-semibold text-gray-800 text-sm">{zona.nombreZona}</p>
                                                            {zona.nombreMapa && (
                                                                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded mt-1 inline-block">
                                                                    🗺 {zona.nombreMapa}
                                                                </span>
                                                            )}
                                                            <button
                                                                onClick={() => handleVerMapa(zona)}
                                                                className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-semibold transition flex items-center justify-center gap-1.5"
                                                            >
                                                                <Map size={13} /> Ver Mapa y Reservar
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </section>

            {/* Selector de emprendimiento */}
            {mostrarSelector && (
                <SelectorEmprendimiento
                    emprendimientos={emprendimientos}
                    onSeleccionar={handleSeleccionarEmprendimiento}
                    onCancelar={() => { setMostrarSelector(false); setZonaPendiente(null) }}
                />
            )}

            {/* Modal mapa de reserva */}
            {zonaVerMapa && emprendimientoId && (
                <MapaReservaStand
                    zona={zonaVerMapa}
                    emprendimientoId={emprendimientoId}
                    onCerrar={() => setZonaVerMapa(null)}
                />
            )}
        </main>
    )
}