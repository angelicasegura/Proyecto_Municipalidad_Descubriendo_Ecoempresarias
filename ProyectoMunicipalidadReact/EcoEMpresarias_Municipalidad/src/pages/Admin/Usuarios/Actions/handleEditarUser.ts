
import { authFetch } from "../../../../auth/AuthFetch"
import type { User } from "../../../../types/userType"

import toast from "react-hot-toast";
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
    
      const response =  authFetch(`https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Usuarios/EditAdmin/${userData.idUsuario}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Error al crear el usuario");
        }

      });

      toast.promise(response, {
      loading: "Editando usuario...",
      success: "Usuario editado correctamente 🎉",
      error: (err) => err.message || "No se pudo editar el usuario",
    },{ duration: 2500 });
      

      try {
        await response;
    setEditDialogOpen(false)
    setSelectedUser(null)

    if (onSuccess) onSuccess()
    } catch (error) {
      console.error("Error en la edición:", error)
      alert("No se pudo actualizar el usuario. Revisa la consola.")
    }
  }
}
