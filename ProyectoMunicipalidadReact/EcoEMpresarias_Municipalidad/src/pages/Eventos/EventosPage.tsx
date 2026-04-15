import { Calendar } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { fetchEventos } from "./actions/fetchEventos"
import { EventosGrid } from "./components/eventosCardsGrid"
import CrearEventoModal from "./components/CrearEventoModal"

import { useAuth } from "../../auth/AuthContext"

export default function EventosPage() {

  const [showModal, setShowModal] = useState(false)

  const { user } = useAuth()

  const { data: eventos = [], isLoading, error, refetch } = useQuery({
    queryKey: ["eventos"],
    queryFn: fetchEventos,
    refetchInterval: 180000
  })

  // 🔹 FILTRAR EVENTOS SEGÚN ROL
  const eventosFiltrados =
    user?.rol === "ADMIN"
      ? eventos
      : eventos.filter((e: any) => e.estado_id === 1 || e.nombreEstado ==="Activo")

      console.log(eventos)

  return (
    <main className="min-h-screen bg-background">

      {/* HERO */}
      <section className="gradient-hero py-12 px-4">

        <div className="max-w-6xl mx-auto text-center">

          <div className="flex items-center justify-center gap-2 mb-3">

            <Calendar className="h-7 w-7 text-white"/>

            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Eventos Ecoempresariales
            </h1>

          </div>

          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto">
            Descubre actividades, ferias y oportunidades para conocer a nuestros emprendedores
          </p>

        </div>

      </section>

      {/* EVENTOS */}

      <section className="max-w-6xl mx-auto px-4 py-8">

        {/* BOTÓN CREAR EVENTO SOLO ADMIN */}

        {user?.rol === "ADMIN" && (

          <div className="flex justify-end mb-6">

            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Crear Evento
            </button>

          </div>

        )}

        {isLoading && <p>Cargando eventos...</p>}

        {error && <p>Error cargando eventos</p>}

        {!isLoading && !error && (
          <EventosGrid eventos={eventosFiltrados}/>
        )}

      </section>

      {/* MODAL CREAR EVENTO */}

      {showModal && user?.rol === "ADMIN" && (

        <CrearEventoModal
          onClose={() => setShowModal(false)}
          onSuccess={() => refetch()}
        />

      )}

    </main>
  )
}