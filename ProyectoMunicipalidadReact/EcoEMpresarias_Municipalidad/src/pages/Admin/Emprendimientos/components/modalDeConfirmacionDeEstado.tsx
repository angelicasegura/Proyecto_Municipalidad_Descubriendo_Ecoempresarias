import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../../components/ui/dialog"
import { Button } from "../../../../components/ui/button"
import { Alert, AlertDescription } from "../../../../components/ui/alert"
import { AlertTriangle, Info } from "lucide-react"
import type { Emprendedor } from "../../../../types/emprendedoresType"

interface ConfirmStatusDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  emprendedor: Emprendedor | null
  onConfirm: () => void
}

export function ConfirmStatusDialog({
  open,
  onOpenChange,
  emprendedor,
  onConfirm,
}: ConfirmStatusDialogProps) {
  const isActivating = emprendedor?.estado_id === 2 // 2 = inactivo

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="bg-yellow-500 -m-6 mb-0 p-6 rounded-t-lg">
          <DialogTitle className="flex items-center gap-2 text-white">
            <AlertTriangle className="h-5 w-5" />
            Confirmar Cambio de Estado
          </DialogTitle>
        </DialogHeader>
        <div className="pt-4 space-y-4">
          <p className="text-foreground">
            ¿Estás seguro de que deseas {isActivating ? "activar" : "desactivar"} el emprendimiento de{" "}
            <strong>{emprendedor?.nombre}</strong>?
          </p>
          <Alert className="bg-yellow-50 border-yellow-200">
            <Info className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Esta acción puede afectar a la lista de emprendedores registrados.
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter className="gap-2 pt-4">
          <Button variant="secondary" className="bg-[#ff0707] hover:bg-[#790000] text-white cursor-pointer" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            variant={isActivating ? "default" : "destructive"}
            onClick={onConfirm}
            className={isActivating ? "bg-[#54b413] hover:bg-[#3c810e]" : ""}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
