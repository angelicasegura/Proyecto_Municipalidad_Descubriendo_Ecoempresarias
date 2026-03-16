import type { PedidoRequest } from "../../../../types/pedidoType"
import { authFetch } from "../../../../auth/AuthFetch"

export async function handleCrearPedido(
  usuarioId: number,
  emprendimientoId: number,
  direccionEntrega: string,
  observaciones?: string
): Promise<string> {

  try {

    const response = await authFetch(
      "https://localhost:7050/api/Pedido",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuarioId,
          emprendimientoId,
          direccionEntrega,
          observaciones
        })
      }
    );

    if (!response.ok) throw new Error("Error creando pedido");

    const data = await response.json();

    return data.pedidoId;

  } catch (error) {

    console.error("Error creando pedido:", error);
    throw error;

  }
}