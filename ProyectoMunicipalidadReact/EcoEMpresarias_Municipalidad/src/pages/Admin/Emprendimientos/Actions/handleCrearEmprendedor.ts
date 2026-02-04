// TODO: Conectar con API - POST /api/emprendedores

import type { Emprendedor } from "../../../../types/emprendedoresType"

interface Props {
  setCreateDialogOpen: (open: boolean) => void
}

  export function handleCrearEmprendedor({ setCreateDialogOpen }: Props) {
  return async (
    newEmprendedor: Omit<Emprendedor, "emprendedor_id" | "estado_id">
  ) => {
    // API 

    setCreateDialogOpen(false)
  }
}