import { authFetch } from "../../../../auth/AuthFetch"

import toast from "react-hot-toast";

interface Props {
  setCreateDialogOpen: (open: boolean) => void
  setPage: (page: number) => void
}

export function handleCrearUser({
  setCreateDialogOpen,
  setPage,
}: Props) {
  return async (userData: any) => {

    
      const response =  authFetch(`https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Usuarios/AgregarAdmin`, {
        method: "POST",
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
      loading: "Creando usuario...",
      success: "Usuario creado correctamente 🎉",
      error: (err) => err.message || "No se pudo crear el usuario",
    },{ duration: 2500 });

    try {

      await response;
      
      setCreateDialogOpen(false)
      setPage(1)

    } catch (error) {
      console.error("Error en la creación:", error)
      alert("No se pudo crear el usuario. Revisa la consola.")
    }
  }
}
