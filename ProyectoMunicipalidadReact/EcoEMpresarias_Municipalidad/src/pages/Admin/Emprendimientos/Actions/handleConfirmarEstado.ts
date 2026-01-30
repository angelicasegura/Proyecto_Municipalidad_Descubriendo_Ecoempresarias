import type { Emprendedor } from "../../../../types/emprendedoresType"
interface Props {
  selectedEmprendedor: Emprendedor | null
  setStatusDialogOpen: (open: boolean) => void
  setSelectedEmprendedor: (e: Emprendedor | null) => void
}

export function handleToggleEstado({
  selectedEmprendedor,
  setStatusDialogOpen,
  setSelectedEmprendedor,
}: Props) {
  return async () => {
    if (!selectedEmprendedor) return

    //  API 

    setStatusDialogOpen(false)
    setSelectedEmprendedor(null)
  }
}
