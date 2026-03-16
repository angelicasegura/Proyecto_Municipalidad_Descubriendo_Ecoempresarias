import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import EventoDetalleCard from "./components/eventoDetalleCard"
import { fetchEventoPorId } from "./actions/fetchEventoPorId"

export default function EventoDetallePage(){

    const { id } = useParams()

    const { data, isLoading, error } = useQuery({
        queryKey:["evento", id],
        queryFn: () => fetchEventoPorId(Number(id)),
        enabled: !!id
    })

    if(isLoading) return <p>Cargando evento...</p>

    if(error) return <p>Error cargando evento</p>

    return(
        <div className="min-h-screen bg-background py-10 px-4">
            {data && <EventoDetalleCard evento={data} />}
        </div>
    )
}