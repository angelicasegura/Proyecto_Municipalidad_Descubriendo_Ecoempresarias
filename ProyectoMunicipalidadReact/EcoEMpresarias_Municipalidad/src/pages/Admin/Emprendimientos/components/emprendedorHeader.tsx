import { Button } from "../../../../components/ui/button"
import { UserPlus, Briefcase } from "lucide-react"

interface EmprendedoresHeaderProps {
  onCreateClick: () => void
}

export function EmprendedoresHeader({ onCreateClick }: EmprendedoresHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-[#056F94]" />
          <h1 className="text-2xl font-bold text-[#056F94]">Gestión de Emprendedores</h1>
        </div>
        <p className=" mt-1 text-[#056F94]">
          Administra el registro y estado de los emprendedores
        </p>
      </div>
      <Button onClick={onCreateClick} className="bg-[#056F94] hover:bg-[#045a7a] text-white font-semibold cursor-pointer">
        <UserPlus className="h-4 w-4 mr-2" />
        Registrar Emprendedor
      </Button>
    </div>
  )
}
