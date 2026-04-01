import { authFetch } from "../../../../auth/AuthFetch";

export async function handleEliminarItemCarrito(
  emprendimientoId: number,
  productoId: string
) {
  try {
    const response = await authFetch(
      `https://localhost:7050/api/Carrito/Eliminar`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emprendimientoId,
          productoId,
        }),
      }
    );

    if (!response.ok) throw new Error("Error al eliminar producto del carrito");

    return await response.json();
  } catch (error) {
    console.error("Error eliminando item del carrito:", error);
    throw error;
  }
}