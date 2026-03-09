import { authFetch } from "../../../../auth/AuthFetch"
import type { User } from "../../../../types/userType"
import toast from "react-hot-toast";
interface Props {
  setStatusDialogOpen: (open: boolean) => void
  setSelectedUser: (user: User | null) => void
  onSuccess?: () => void
}

export function handleToggleStatus({
  setStatusDialogOpen,
  setSelectedUser,
  onSuccess
}: Props) {
  return async(userData: User) => {
    // AQUÍ VA LA API EN EL FUTURO
    
          const response =  authFetch(`https://localhost:7050/api/Usuarios/EditEstado/${userData.idUsuario}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }).then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Error al cambiar el estado del usuario");
        }});
    
        toast.promise(response, {
      loading: "Actualizando estado del usuario...",
      success: "Estado del usuario actualizado correctamente 🎉",
      error: (err) => err.message || "No se pudo actualizar el estado del usuario",
    },{ duration: 2500 });  
    
    
    
        try {
          await response;
        setStatusDialogOpen(false)
      setSelectedUser(null)
    
        if (onSuccess) onSuccess()
        } catch (error) {
          console.error("Error en la edición:", error)
          alert("No se pudo actualizar el usuario. Revisa la consola.")
        }
    
  }
}
