import type { Emprendedor } from "../../../../types/emprendedoresType"

interface Props {
  setSelectedEmprendedor: (e: Emprendedor) => void
  setEditDialogOpen: (open: boolean) => void
}

export function handleEditar({
  setSelectedEmprendedor,
  setEditDialogOpen,
}: Props) {
  return (emprendedor: Emprendedor) => {
    setSelectedEmprendedor(emprendedor)
    setEditDialogOpen(true)
  }
}