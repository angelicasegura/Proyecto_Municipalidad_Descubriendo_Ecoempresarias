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
        
      </div>
    )
  }

  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
    <p className="col-span-full text-center text-[#056F94] font-medium mb-4">
      Tus emprendimientos se muestran aquí. Para ver el inventario de cada emprendimiento, haz clic en la tarjeta correspondiente.
    </p>

    {emprendedores.map((emprendedor) => (
      <EmprendimientoCard
        key={emprendedor.emprendimientoId}
        emprendedor={emprendedor}
        tiposActividad={tiposActividad}
      />
    ))}
  </div>
)

}