import { Input } from "../../../../components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select"
import { Search } from "lucide-react"
import type { TipoActividad } from "../../../../types/emprendedoresType"

interface EmprendimientosSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  actividadFilter: string
  onActividadChange: (value: string) => void
  tiposActividad: TipoActividad[]
}

export function EmprendimientosSearch({
  searchTerm,
  onSearchChange,
  actividadFilter,
  onActividadChange,
  tiposActividad,
}: EmprendimientosSearchProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar emprendimientos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-11 bg-card border-border"
        />
      </div>
      <div className="sm:w-56">
        <Select value={actividadFilter} onValueChange={onActividadChange}>
          <SelectTrigger className="h-11 bg-card border-border">
            <SelectValue placeholder="Todas las actividades" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las actividades</SelectItem>
            {tiposActividad.map((tipo) => (
              <SelectItem key={tipo.tipoActividadId} value={String(tipo.tipoActividadId)}>
                {tipo.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}