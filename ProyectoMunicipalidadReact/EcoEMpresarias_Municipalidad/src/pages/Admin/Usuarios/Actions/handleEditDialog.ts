import type { User } from "../../../../types/userType"

interface Props {
  setSelectedUser: (user: User) => void
  setEditDialogOpen: (open: boolean) => void
}

export function openEditDialog({
  setSelectedUser,
  setEditDialogOpen,
}: Props) {
  return (user: User) => {
    setSelectedUser(user)
    setEditDialogOpen(true)
  }
}
