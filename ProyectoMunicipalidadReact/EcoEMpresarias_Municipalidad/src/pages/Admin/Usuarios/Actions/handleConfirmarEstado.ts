import type { User } from "../../../../types/userType"

interface Props {
  setStatusDialogOpen: (open: boolean) => void
  setSelectedUser: (user: User | null) => void
}

export function handleToggleStatus({
  setStatusDialogOpen,
  setSelectedUser,
}: Props) {
  return () => {
    // AQUÍ VA LA API EN EL FUTURO

    setStatusDialogOpen(false)
    setSelectedUser(null)
  }
}
