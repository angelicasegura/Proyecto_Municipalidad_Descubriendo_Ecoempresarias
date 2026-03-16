import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchSolicitudesEventos } from "./actions/fetchSolicitudesEventos"
import { aprobarSolicitud } from "./actions/aprobarSolicitud"
import { rechazarSolicitud } from "./actions/rechazarSolicitud"

export default function SolicitudesEventosPage(){

  const queryClient = useQueryClient()

  const { data: solicitudes = [], isLoading } = useQuery({
    queryKey:["solicitudesEventos"],
    queryFn: fetchSolicitudesEventos
  })

  const aprobarMutation = useMutation({
    mutationFn: aprobarSolicitud,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["solicitudesEventos"]})
    }
  })

  const rechazarMutation = useMutation({
    mutationFn: rechazarSolicitud,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["solicitudesEventos"]})
    }
  })

  if(isLoading) return <p>Cargando solicitudes...</p>
// 🔹 SOLO SOLICITUDES PENDIENTES
  const solicitudesPendientes = solicitudes.filter((s:any)=> s.estado_id === 8)

  return(

    <div className="max-w-7xl mx-auto mt-10 px-6 mb-20">

      <h1 className="text-3xl font-semibold text-gray-700 mb-8">
        Solicitudes enviadas
      </h1>

      {/* 🔹 SI NO HAY SOLICITUDES */}

      {solicitudesPendientes.length === 0 && (

        <div className="bg-white shadow-md rounded-xl p-10 text-center">

          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            No hay solicitudes pendientes
          </h2>

          <p className="text-gray-500 text-sm">
            Cuando los emprendedores envíen solicitudes para eventos aparecerán aquí.
          </p>

        </div>

      )}

      {/* 🔹 TABLA */}

      {solicitudesPendientes.length > 0 && (

        <div className="bg-white rounded-xl shadow-md overflow-hidden">

          <table className="min-w-full text-sm text-left">

            <thead className="bg-gray-50 border-b">

              <tr className="text-gray-600 uppercase text-xs tracking-wider">

                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Evento</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Emprendimiento</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-center">Acciones</th>

              </tr>

            </thead>

            <tbody className="divide-y">

              {solicitudesPendientes.map((s:any,index:number)=>{

                const estadoColor =
                  s.estado_id === 8
                    ? "bg-yellow-400"
                    : s.estado_id === 9
                    ? "bg-green-500"
                    : "bg-red-500"

                return(

                  <tr key={s.numero} className="hover:bg-gray-50">

                    <td className="px-4 py-3">{index + 1}</td>

                    <td className="px-4 py-3 font-medium text-gray-700">
                      {s.evento}
                    </td>

                    <td className="px-4 py-3">{s.nombre}</td>

                    <td className="px-4 py-3">{s.emprendimiento}</td>

                    <td className="px-4 py-3">

                      <span className={`${estadoColor} text-white px-3 py-1 rounded-full text-xs`}>
                        {s.estado}
                      </span>

                    </td>

                    <td className="px-4 py-3 flex gap-2 justify-center">

                      <button
                        onClick={()=>aprobarMutation.mutate(s.numero)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                      >
                        Aprobar
                      </button>

                      <button
                        onClick={()=>rechazarMutation.mutate(s.numero)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                      >
                        Rechazar
                      </button>

                    </td>

                  </tr>

                )

              })}

            </tbody>

          </table>

        </div>

      )}

    </div>

  )
}
