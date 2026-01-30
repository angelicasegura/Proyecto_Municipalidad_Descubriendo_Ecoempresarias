import { Input } from "../../../../components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select"
import { Search } from "lucide-react"
import { ROLES } from "../../../../types/userType"

interface FiltroUsuariosProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  roleFilter: string
  onRoleChange: (value: string) => void
}

export function FiltroUsuarios({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleChange,
}: FiltroUsuariosProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1 md:flex-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12"
        />
      </div>
      <div className="md:flex-1 ">
        <Select value={roleFilter} onValueChange={onRoleChange} >
          <SelectTrigger className="h-12 cursor-pointer">
            <SelectValue placeholder="Todos los Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los Roles</SelectItem>
            {ROLES.map((rol) => (
              <SelectItem key={rol.rol_id} value={String(rol.rol_id)}>
                {rol.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
