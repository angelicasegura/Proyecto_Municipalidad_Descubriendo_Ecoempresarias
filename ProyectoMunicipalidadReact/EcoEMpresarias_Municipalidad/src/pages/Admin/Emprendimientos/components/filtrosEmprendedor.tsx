import { Card, CardContent } from "../../../../components/ui/card"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select"
import { Button } from "../../../../components/ui/button"
import { Search } from "lucide-react"
import { TIPOS_ACTIVIDAD, ESTADOS } from "../../../../types/emprendedoresType"

interface EmprendedoresFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  tipoFilter: string
  onTipoChange: (value: string) => void
  estadoFilter: string
  onEstadoChange: (value: string) => void
  onSearch: () => void
}

export function EmprendedoresFilters({
  searchTerm,
  onSearchChange,
  tipoFilter,
  onTipoChange,
  estadoFilter,
  onEstadoChange,
  onSearch,
}: EmprendedoresFiltersProps) {
  return (
    <Card className="mb-6 shadow-sm">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="buscar" className="font-semibold">Buscar</Label>
            <Input
              id="buscar"
              type="text"
              placeholder="Nombre, cédula o correo..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipo" className="font-semibold">Tipo de Actividad</Label>
            <Select value={tipoFilter} onValueChange={onTipoChange}>
              <SelectTrigger id="tipo">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {TIPOS_ACTIVIDAD.map((tipo) => (
                  <SelectItem key={tipo.tipo_actividad_id} value={String(tipo.tipo_actividad_id)}>
                    {tipo.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="estado" className="font-semibold">Estado</Label>
            <Select value={estadoFilter} onValueChange={onEstadoChange}>
              <SelectTrigger id="estado">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {ESTADOS.map((estado) => (
                  <SelectItem key={estado.estado_id} value={String(estado.estado_id)}>
                    {estado.nombre}s
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button onClick={onSearch} className="w-full bg-[#056F94] border-[#056F94] hover:bg-[#045a7a] hover:text-white font-semibold cursor-pointer">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
