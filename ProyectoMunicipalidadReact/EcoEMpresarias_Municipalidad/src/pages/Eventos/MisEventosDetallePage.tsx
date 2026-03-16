import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchMisEventos } from "./actions/fetchMisEventos"

export default function MisEventosDetallePage(){

  const { emprendimientoId } = useParams()

  const { data:eventos = [], isLoading } = useQuery({
    queryKey:["misEventos",emprendimientoId],
    queryFn:()=>fetchMisEventos(Number(emprendimientoId)),
    enabled:!!emprendimientoId
  })

  if(isLoading) return <p>Cargando eventos...</p>
  console.log(eventos)
  return(

    <div className="max-w-5xl mx-auto mt-10">

      <h1 className="text-2xl font-bold mb-6">
        Mis eventos inscritos
      </h1>

      <div className="bg-white shadow rounded-lg p-6">

        <table className="w-full text-left">

          <thead className="border-b">

            <tr className="text-gray-600 text-sm">
              <th>#</th>
              <th>Evento</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>

          </thead>

          <tbody>

            {eventos.map((evento:any,index:number)=>{

              const estadoColor =
                evento.estado === "Reserva evento Pendiente"
                ? "bg-yellow-400"
                : evento.estado === "Reserva evento Aceptada"
                ? "bg-green-500"
                : "bg-red-500"

              return(

                <tr key={evento.evento_id} className="border-b text-sm">

                  <td className="py-3">{index + 1}</td>

                  <td>{evento.nombreEvento}</td>

                  <td>
                    <span className={`${estadoColor} text-white px-2 py-1 rounded text-xs`}>
                      {evento.estado}
                    </span>
                  </td>
                  <td>

                    {evento.estado === "Reserva evento Aceptada" && (

                      <Link
                        to={`/seleccionar-espacio/${evento.evento_id}/${emprendimientoId}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                      >
                        Seleccionar espacio
                      </Link>

                    )}

                  </td>


                </tr>

              )

            })}

          </tbody>

        </table>

      </div>

    </div>

  )
}