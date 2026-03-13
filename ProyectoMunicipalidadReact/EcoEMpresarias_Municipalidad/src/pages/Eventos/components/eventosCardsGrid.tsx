import EventoCard from "./eventoCard"
import type { Evento } from "../actions/fetchEventos"

interface Props {
  eventos: Evento[]
}

export function EventosGrid({ eventos }: Props) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {eventos.map((evento) => (
        <EventoCard
          key={evento.evento_id}
          evento={evento}
        />
      ))}

    </div>
  )
}