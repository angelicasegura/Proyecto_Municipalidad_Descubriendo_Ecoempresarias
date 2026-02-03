import { authFetch } from "../../../../auth/AuthFetch"

interface Props {
  setCreateDialogOpen: (open: boolean) => void
  setPage: (page: number) => void
}

export function handleCrearUser({
  setCreateDialogOpen,
  setPage,
}: Props) {
  return async (userData: any) => {
    
    try {
          const response = await authFetch(`https://localhost:7050/api/Usuarios/AgregarAdmin`, {
            method: "POST",
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
    setCreateDialogOpen(false)
    setPage(1)
          
        } catch (error) {
          console.error("Error en la creación:", error)
          alert("No se pudo crear el usuario. Revisa la consola.")
        }
  }
}
