import { authFetch } from "../../../../../auth/AuthFetch";
import toast from "react-hot-toast";


export async function handleCancelarPedido(pedidoId: string, descripcion: string) {
  if (!pedidoId) throw new Error("Falta el pedidoId");
  if (!descripcion) throw new Error("Debe ingresar un motivo de cancelación");

  const params = new URLSearchParams({ pedidoId });
  const url = `https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Pedido/Cancelar?${params.toString()}`;

  const res = authFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ descripcion })
  }).then(async (response) => {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "No se pudo cancelar el pedido");
    }
    return response.json();
  });

  toast.promise(res, {
    loading: "Cancelando pedido...",
    success: "Pedido cancelado correctamente 🎉",
    error: (err) => err.message || "No se pudo cancelar el pedido",
  }, { duration: 4000 });

  return res;
}