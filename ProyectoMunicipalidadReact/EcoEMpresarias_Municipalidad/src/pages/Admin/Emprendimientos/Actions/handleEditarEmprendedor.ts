
import type { Emprendedor } from "../../../../types/emprendedoresType"

interface Props {
  setEditDialogOpen: (open: boolean) => void
  setSelectedEmprendedor: (e: Emprendedor | null) => void
}

export function handleEditarEmprendedor({
  setEditDialogOpen,
  setSelectedEmprendedor,
}: Props) {
  return async (updatedEmprendedor: Emprendedor) => {
    //API 

    setEditDialogOpen(false)
    setSelectedEmprendedor(null)
  }
}