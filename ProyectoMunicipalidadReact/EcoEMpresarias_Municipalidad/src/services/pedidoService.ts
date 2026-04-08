import type { PedidoRequest } from "../types/pedidoType"
import { authFetch } from "../auth/AuthFetch"

export async function agregarPedido(pedido: PedidoRequest): Promise<PedidoRequest> {
  const response = await authFetch("https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Pedido", {
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