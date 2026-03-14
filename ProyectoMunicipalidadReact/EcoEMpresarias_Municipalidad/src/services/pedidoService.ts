import type { Pedido } from "../types/pedidoType"
import { authFetch } from "../auth/AuthFetch"

export async function agregarPedido(pedido: Pedido): Promise<Pedido> {
  const response = await authFetch("https://localhost:7050/api/Pedido", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pedido),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || "Error al crear el pedido")
  }

  return await response.json()
}