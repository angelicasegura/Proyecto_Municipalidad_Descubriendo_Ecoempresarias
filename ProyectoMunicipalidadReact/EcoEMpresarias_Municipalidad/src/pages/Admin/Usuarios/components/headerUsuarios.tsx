import { Button } from "../../../../components/ui/button"
import { Users, Plus } from "lucide-react"

interface HeaderUsuariosProps {
  onCreateClick: () => void
}

export function HeaderUsuarios({ onCreateClick }: HeaderUsuariosProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2 text-[#056F94]">
          <Users className="h-6 w-6  " stroke="#056F94"/>
          Gestion de Usuarios
        </h1>
        <p className=" mt-1 text-[#056F94]">
          Administra todos los usuarios del sistema
        </p>
      </div>
      <Button size="lg" onClick={onCreateClick}
       className="bg-[#056F94] hover:bg-[#045a7a]  text-white font-semibold cursor-pointer"
      >
        <Plus className="h-4 w-4 mr-2" />
        Crear Usuario
      </Button>
    </div>
  )
}