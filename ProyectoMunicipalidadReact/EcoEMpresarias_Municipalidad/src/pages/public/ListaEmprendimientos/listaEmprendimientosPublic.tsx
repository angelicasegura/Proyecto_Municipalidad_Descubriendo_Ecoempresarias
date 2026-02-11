import {  useEffect, useState } from "react"
import { Leaf } from "lucide-react"

import { fetchTiposActividad, type Emprendedor, type TipoActividad } from "../../../types/emprendedoresType"

import { EmprendimientosSearch } from "./components/emprendimientosSearchBarSection"
import { EmprendimientosGrid } from "./components/emprendimientoCardsGrid"
import { Pagination } from "../../../components/ui/layout/Pagination"
import { authFetch } from "../../../auth/AuthFetch"

import { useQuery } from "@tanstack/react-query"

export default function EmprendimientosPage() {
  const [emprendedores, setEmprendedores] = useState<Emprendedor[]>([])
  
  const [searchTerm, setSearchTerm] = useState("")
  const [actividadFilter, setActividadFilter] = useState("all")
  const [tiposActividad, setTiposActividad] = useState<TipoActividad[]>([])

  const filteredEmprendedores = emprendedores.filter((emp) => {
    const matchesSearch = emp.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesActividad =
      !actividadFilter || actividadFilter === "all" || emp.tipoActividadId === Number(actividadFilter)
    return matchesSearch && matchesActividad
  })
  
  const [page, setPage] = useState(1);
  const limit = 10;



  //llamado api para cargar emprendedores 
  const { data, isLoading, error } = useQuery({ //esto es tanstack react query el cual es para guardar cosas en chache para no estar haiendo peticiones de cosas que no cambian tan seguido
    queryKey: ["emprendedores", page, searchTerm, actividadFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search: searchTerm || "",
        tipoActividadId:
          actividadFilter === "all" || !actividadFilter
            ? ""
            : String(actividadFilter),
        estadoId: "1",
      })

      const res = await authFetch(
        `https://localhost:7050/api/emprendimientos/paginados?${params.toString()}`
      )
      const data = await res.json()
      return {
        items: data.items || [],
        totalPages: Math.ceil((data.totalCount || 0) / limit),
      }
    },
    refetchInterval: 180_000, // 3 minutos
    gcTime: Infinity,
  })



   useEffect(() => {
       fetchTiposActividad().then((data) => setTiposActividad(data));
     }, []);

     useEffect(() => {
  if (data?.items) {
    setEmprendedores(data.items);
  }
}, [data]);

     console.log("Emprendedores cargados:", emprendedores);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero header */}
      <section className="gradient-hero py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Leaf className="h-7 w-7 text-white" />
            <h1 className="text-2xl md:text-3xl font-bold text-white text-balance">
              Emprendimientos Sostenibles
            </h1>
          </div>
          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto text-pretty">
            Descubre negocios que transforman comunidades con prácticas responsables y sostenibles.
          </p>
        </div>
      </section>

      {/* Search + filter + grid */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <EmprendimientosSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            actividadFilter={actividadFilter}
            onActividadChange={setActividadFilter}
            tiposActividad={tiposActividad}
          />
        </div>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredEmprendedores.length}{" "}
            {filteredEmprendedores.length === 1 ? "emprendimiento encontrado" : "emprendimientos encontrados"}
          </p>
        </div>

        {isLoading ? (
          <p>Cargando emprendedores...</p>
        ) : error ? (
          <p>Error al cargar los emprendedores</p>
        ) : (
          <EmprendimientosGrid
            emprendedores={filteredEmprendedores}
            tiposActividad={tiposActividad}
          />
        )}

        <Pagination
          currentPage={page}
          totalPages={data?.totalPages || 1}
          onPageChange={setPage}
        />
      </section>
    </main>
  )
}
