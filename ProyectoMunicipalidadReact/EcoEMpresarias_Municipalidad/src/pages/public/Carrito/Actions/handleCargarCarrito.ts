import { authFetch } from "../../../../auth/AuthFetch";

export async function handleFetchCarrito(
  emprendimientoId: number
) {
  try {
    const parameters = new URLSearchParams({
      emprendimientoId: emprendimientoId.toString(),
    });

    const response = await authFetch(
      `https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Carrito/MiCarrito?${parameters.toString()}`
    );

    if (!response.ok) throw new Error("Error al obtener carrito");

    return await response.json();
  } catch (error) {
    console.error("Error fetching carrito:", error);
    throw error;
  }
}