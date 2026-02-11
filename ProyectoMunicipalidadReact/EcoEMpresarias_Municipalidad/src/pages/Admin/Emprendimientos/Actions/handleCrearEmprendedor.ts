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
    try {
      console.log([...emprendimientoData.entries()]);
      const response = await authFetch(
        "https://localhost:7050/api/emprendimientos/crearAdmin",
        {
          method: "POST",
          body: emprendimientoData,
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
  console.log("ERROR BACKEND:", errorData)
  throw new Error("Error en la creación")
      }

      console.log("Emprendimiento creado correctamente")

      setCreateDialogOpen(false)
      await refreshData()

    } catch (error) {
      console.error("Error en la creación:", error)
      alert("No se pudo crear el emprendimiento. Revisa la consola.")
    }
  }
}