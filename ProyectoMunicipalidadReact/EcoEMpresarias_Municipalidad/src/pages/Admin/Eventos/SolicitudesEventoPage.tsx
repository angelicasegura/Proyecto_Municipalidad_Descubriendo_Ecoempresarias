import { useQuery } from "@tanstack/react-query"
import { fetchSolicitudesEventos } from "./actions/fetchSolicitudesEventos"

export default function SolicitudesEventosPage(){

  const { data: solicitudes = [], isLoading } = useQuery({
    queryKey:["solicitudesEventos"],
    queryFn: fetchSolicitudesEventos
  })

  if(isLoading) return <p>Cargando solicitudes...</p>

  return(

    <div className="max-w-6xl mx-auto mt-10">

      <h1 className="text-2xl font-bold mb-6">
        Solicitudes enviadas
      </h1>

      <div className="bg-white shadow rounded-lg p-6">

        <table className="w-full text-left">

          <thead className="border-b">

            <tr className="text-gray-600 text-sm">
              <th>#</th>
              <th>Evento</th>
              <th>Nombre</th>
              <th>Emprendimiento</th>
              <th>Productos</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>

          </thead>

          <tbody>

            {solicitudes.map((s:any,index:number)=>(

              <tr key={s.reserva_id} className="border-b text-sm">

                <td>{index + 1}</td>

                <td>{s.evento}</td>

                <td>{s.nombre}</td>

                <td>{s.emprendimiento}</td>

                <td>{s.productos}</td>

                <td>{new Date(s.fecha).toLocaleDateString()}</td>

                <td>

                  <span className="bg-yellow-400 text-white px-2 py-1 rounded text-xs">
                    {s.estado}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )
}