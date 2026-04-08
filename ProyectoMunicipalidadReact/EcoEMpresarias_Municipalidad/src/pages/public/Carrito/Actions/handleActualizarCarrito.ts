import { authFetch } from "../../../../auth/AuthFetch";

export async function handleActualizarCantidad(
  emprendimientoId: number,
  productoId: string,
  cantidad: number
) {
  try {
    const response = await authFetch(
      `https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Carrito/ActualizarCantidad`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emprendimientoId,
          productoId,
          Cantidad: cantidad,
        }),
      }
    );

    if (!response.ok) throw new Error("Error al actualizar cantidad");

    return await response.json();
  } catch (error) {
    console.error("Error actualizando cantidad:", error);
    throw error;
  }
}