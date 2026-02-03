import { authFetch } from "../../../../auth/AuthFetch"
import type { User } from "../../../../types/userType"

interface Props {
  setEditDialogOpen: (open: boolean) => void
  setSelectedUser: (user: User | null) => void
  onSuccess?: () => void
}

export function handleEditarUser({
  setEditDialogOpen,
  setSelectedUser,
  onSuccess,
}: Props) {
  return async (userData: User) => {
    //  API 
    try {
      
      const response = await authFetch(`https://localhost:7050/api/Usuarios/EditAdmin/${userData.idUsuario}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || "Error al actualizar el usuario")
      }

      console.log("Usuario actualizado correctamente")


    setEditDialogOpen(false)
    setSelectedUser(null)

    if (onSuccess) onSuccess()
    } catch (error) {
      console.error("Error en la edición:", error)
      alert("No se pudo actualizar el usuario. Revisa la consola.")
    }
  }
}
