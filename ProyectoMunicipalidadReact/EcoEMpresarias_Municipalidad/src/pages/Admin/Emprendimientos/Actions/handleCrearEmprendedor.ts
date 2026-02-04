import { authFetch } from "../../../../auth/AuthFetch";


interface Props {
  setCreateDialogOpen: (open: boolean) => void;
  refreshData: () => Promise<void>; // <-- Agregamos esto
}

export function handleCrearEmprendedor({
  setCreateDialogOpen,
  refreshData,
}: Props) {
  return async (newEmprendedor: any) => {
    try {
      const requestBody = {
        nombre: newEmprendedor.nombre,
        cedulaJuridica: newEmprendedor.cedulaJuridica,
        telefono: newEmprendedor.telefono,
        email: newEmprendedor.email,
        direccion: newEmprendedor.direccion ,
        tipoActividadId: Number(newEmprendedor.tipoActividadId),

        usuarioId: Number(newEmprendedor.usuarioId ),
        estadoId: 1,
      };

      const response = await authFetch(
        "https://localhost:7050/api/emprendimientos/crearAdmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );

      if (response.ok) {
        const idGenerado = await response.json();
        console.log("Emprendedor creado con ID:", idGenerado);

        setCreateDialogOpen(false);
        await refreshData(); 
      } else {
        const errorData = await response.text();
        console.log("error", errorData);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };
}
