import { useParams, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { authFetch } from "../../auth/AuthFetch"

export default function SeleccionarEmprendimientoReservaPage(){

  const { eventoId } = useParams()

  const { data: usuario } = useQuery({
    queryKey:["usuario"],
    queryFn: async ()=>{
      const res = await authFetch("https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/auth/me")
      return res.json()
    }
  })

  const { data: emprendimientos = [] } = useQuery({
    queryKey:["emprendimientos",usuario?.id],
    queryFn: async ()=>{
      const res = await authFetch(
        `https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/emprendimientos/Obtener/Cedula?cedula=${usuario.id}`
      )
      return res.json()
    },
    enabled:!!usuario?.id
  })
console.log (emprendimientos)
  return(

    <div className="max-w-6xl mx-auto mt-10">

      <h1 className="text-2xl font-bold mb-6">
        Selecciona el emprendimiento para reservar
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {emprendimientos.map((e:any)=>(

          <div key={e.emprendimiento_id}
          className="bg-white shadow rounded-lg p-4">

            <h3 className="text-lg font-bold">
              {e.nombreEmprendimiento}
            </h3>

            <p className="text-gray-500">
              {e.descripcion}
            </p>

            <Link
              to={`/reservar-evento/${eventoId}/${e.emprendimientoId}`}
              className="bg-green-600 text-white px-3 py-1 rounded mt-3 inline-block"
            >
              Usar este emprendimiento
            </Link>

          </div>

        ))}

      </div>

    </div>
  )
}
