import { Button } from "../../../../components/ui/button"
import { Users, Plus } from "lucide-react"

interface HeaderUsuariosProps {
  onCreateClick: () => void
}

export function HeaderUsuarios({ onCreateClick }: HeaderUsuariosProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Gestion de Usuarios
        </h1>
        <p className="text-muted-foreground mt-1">
          Administra todos los usuarios del sistema
        </p>
      </div>
      <Button size="lg" onClick={onCreateClick}>
        <Plus className="h-4 w-4 mr-2" />
        Crear Usuario
      </Button>
    </div>
  )
}