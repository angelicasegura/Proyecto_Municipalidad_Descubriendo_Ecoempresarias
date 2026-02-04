import type { Emprendedor } from "../../../../types/emprendedoresType"

interface Props {
  setSelectedEmprendedor: (e: Emprendedor) => void
  setStatusDialogOpen: (open: boolean) => void
}

export function handleToggleEstadoClick({
  setSelectedEmprendedor,
  setStatusDialogOpen,
}: Props) {
  return (emprendedor: Emprendedor) => {
    setSelectedEmprendedor(emprendedor)
    setStatusDialogOpen(true)
  }
}