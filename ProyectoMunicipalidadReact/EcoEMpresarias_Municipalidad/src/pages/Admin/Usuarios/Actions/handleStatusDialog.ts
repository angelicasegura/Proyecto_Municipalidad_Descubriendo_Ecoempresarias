import type { User } from "../../../../types/userType"

interface Props {
  setSelectedUser: (user: User) => void
  setStatusDialogOpen: (open: boolean) => void
}

export function openStatusDialog({
  setSelectedUser,
  setStatusDialogOpen,
}: Props) {
  return (user: User) => {
    setSelectedUser(user)
    setStatusDialogOpen(true)
  }
}

