import { Calendar } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { fetchEventos } from "./actions/fetchEventos"
import { EventosGrid } from "./components/eventosCardsGrid"

export default function EventosPage() {

  const { data: eventos = [], isLoading, error } = useQuery({
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
            Participa en ferias, talleres y capacitaciones para emprendedores.
          </p>

        </div>

      </section>

      {/* Eventos */}

      <section className="max-w-6xl mx-auto px-4 py-8">

        {isLoading && <p>Cargando eventos...</p>}

        {error && <p>Error cargando eventos</p>}

        {!isLoading && !error && (
          <EventosGrid eventos={eventos}/>
        )}

      </section>

    </main>
  )
}