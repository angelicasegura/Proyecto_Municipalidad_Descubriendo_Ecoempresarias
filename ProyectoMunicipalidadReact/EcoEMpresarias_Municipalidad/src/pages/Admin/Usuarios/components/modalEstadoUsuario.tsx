import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../../components/ui/dialog"
import { Button } from "../../../../components/ui/button"
import { Alert, AlertDescription } from "../../../../components/ui/alert"
import { AlertTriangle, Info, Check } from "lucide-react"
import type { User } from "../../../../types/userType"

interface ModalEstadoUsuariosProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
  onConfirm: (user: User) => void
}

export function ModalEstadoUsuarios({
  open,
  onOpenChange,
  user,
  onConfirm,
}: ModalEstadoUsuariosProps) {
  const isActivating = user?.idEstado === 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-100">
        <DialogHeader className="bg-amber-500 text-white -m-6 mb-0 p-6 rounded-t-lg">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5" />
            Confirmar Cambio de Estado
          </DialogTitle>
        </DialogHeader>
        <div className="pt-6">
          <p className="text-muted-foreground mb-4">
            {isActivating
              ? `Estas seguro de que deseas activar al usuario "${user?.nombre} ${user?.apellidos}"?`
              : `Estas seguro de que deseas desactivar al usuario "${user?.nombre} ${user?.apellidos}"?`}
          </p>
          <Alert variant="default" className="bg-amber-50 border-amber-200">
            <Info className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              Esta accion puede afectar el acceso del usuario al sistema.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter className="mt-6 border-t pt-4">
          <Button type="button" variant="secondary" className="bg-[#54b413] hover:bg-[#3c810e] text-white cursor-pointer" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            type="button"
            variant={"secondary"}
            onClick={() => user && onConfirm(user)} 
            className="bg-[#ff0707]  hover:bg-[#790000] text-white cursor-pointer"
          >
            <Check className="h-4 w-4 mr-2" />
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}