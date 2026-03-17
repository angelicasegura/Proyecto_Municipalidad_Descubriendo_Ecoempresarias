import { authFetch } from "../../../../../auth/AuthFetch";
import toast from "react-hot-toast";

export async function handleActualizarPedido(pedidoId: number) {
  if (!pedidoId) throw new Error("Falta el pedidoId");

  const params = new URLSearchParams({ pedidoId: pedidoId.toString() });
  const url = `https://localhost:7050/api/Pedido?${params.toString()}`;

  const res = authFetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" }
  }).then(async (response) => {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "No se pudo actualizar el pedido");
    }
    return response.json();
  });

  toast.promise(res, {
    loading: "Actualizando pedido...",
    success: "Pedido actualizado correctamente 🎉",
    error: (err) => err.message || "No se pudo actualizar el pedido",
  }, { duration: 4000 });

  return res;
}