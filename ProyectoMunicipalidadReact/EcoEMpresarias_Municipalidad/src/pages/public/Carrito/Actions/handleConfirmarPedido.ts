import { authFetch } from "../../../../auth/AuthFetch"

export async function handleCrearPedido(
  emprendimientoId: number
): Promise<number> {
  const response = await authFetch(
    "/api/Pedido",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emprendimientoId })
    }
  );

  if (!response.ok) throw new Error("Error creando pedido");

  const data = await response.json();
  return data.pedido_id; // ahora también podés usar data.factura_id o data.total
}