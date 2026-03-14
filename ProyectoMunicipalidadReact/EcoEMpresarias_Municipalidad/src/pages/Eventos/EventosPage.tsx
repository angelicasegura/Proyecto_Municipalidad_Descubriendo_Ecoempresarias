import { Calendar } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { fetchEventos } from "./actions/fetchEventos"
import { EventosGrid } from "./components/eventosCardsGrid"

import { useState } from "react"
import CrearEventoModal from "./components/CrearEventoModal"

export default function EventosPage() {

  const [showModal, setShowModal] = useState(false)

  const { data: eventos = [], isLoading, error, refetch } = useQuery({
    queryKey: ["eventos"],
    queryFn: fetchEventos,
    refetchInterval: 180000
  })

  return (
    <main className="min-h-screen bg-background">

      {/* Hero */}
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

      {/* Eventos */}

      <section className="max-w-6xl mx-auto px-4 py-8">

        {/* BOTÓN CREAR EVENTO */}
        <div className="flex justify-end mb-6">

          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Crear Evento
          </button>

        </div>

        {isLoading && <p>Cargando eventos...</p>}

        {error && <p>Error cargando eventos</p>}

        {!isLoading && !error && (
          <EventosGrid eventos={eventos}/>
        )}

      </section>

      {/* MODAL */}

      {showModal && (
        <CrearEventoModal
          onClose={() => setShowModal(false)}
          onSuccess={() => refetch()}
        />
      )}

    </main>
  )
}