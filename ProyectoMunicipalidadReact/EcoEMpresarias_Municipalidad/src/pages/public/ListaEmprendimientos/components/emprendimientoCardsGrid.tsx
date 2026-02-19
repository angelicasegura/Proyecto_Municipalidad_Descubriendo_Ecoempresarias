import { EmprendimientoCard } from "./emprendimientoCard"
import { Store } from "lucide-react"
import type { Emprendedor, TipoActividad } from "../../../../types/emprendedoresType"

interface EmprendimientosGridProps {
  emprendedores: Emprendedor[]
  tiposActividad: TipoActividad[]
}

export function EmprendimientosGrid({ emprendedores, tiposActividad }: EmprendimientosGridProps) {
  if (emprendedores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <Store className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">No se encontraron emprendimientos</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Intenta cambiar los filtros de busqueda o vuelve mas tarde.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {emprendedores.map((emprendedor) => (
        <EmprendimientoCard
          key={emprendedor.emprendedorId}
          emprendedor={emprendedor}
          tiposActividad={tiposActividad}
        />
      ))}
    </div>
  )
}