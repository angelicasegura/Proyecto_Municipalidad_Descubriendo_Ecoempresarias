import type { User } from "../../../../types/userType"

interface Props {
  setEditDialogOpen: (open: boolean) => void
  setSelectedUser: (user: User | null) => void
}

export function handleEditarUser({
  setEditDialogOpen,
  setSelectedUser,
}: Props) {
  return () => {
    //  API 

    setEditDialogOpen(false)
    setSelectedUser(null)
  }
}
