import { toast } from "react-hot-toast";
import { authFetch } from "../../../../auth/AuthFetch";



interface Props {
  setCreateDialogOpen: (open: boolean) => void;
  refreshData: () => Promise<void>;
}

export function handleCrearEmprendedor({
  setCreateDialogOpen,
  refreshData,
}: Props) {
  return async (emprendimientoData: any) => {
    
      console.log([...emprendimientoData.entries()]);
      const response = authFetch(
        "https://localhost:7050/api/emprendimientos/crearAdmin",
        {
          method: "POST",
          body: emprendimientoData,
        }
      ).then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Error al cambiar el estado del usuario");
        }
        return response;
      });

    toast.promise(response, {
      loading: "Creaciond e emprendimiento en proceso...",
      success: "Emprendimiento creado correctamente 🎉",
      error: (err) => err.message || "No se pudo crear el emprendimiento",
    },{ duration: 2500 });  
      
    try {
      await response;
      setCreateDialogOpen(false);
      await refreshData();

    } catch (error) {
      console.error("Error en la creación:", error)
      alert("No se pudo crear el emprendimiento. Revisa la consola.")
    }
  }
}