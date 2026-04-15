import { authFetch } from "../../../../../auth/AuthFetch";
import { type PedidosResponse } from "../../../../../types/misPedidosType";
import toast from "react-hot-toast";

export async function handleObtenerPedidosPendientes(
  
  estadoId?: number,
  fecha?: string,
  pagina: number = 1,
  registrosPorPagina: number = 10,
): Promise<PedidosResponse> {
  try {
    const params = new URLSearchParams({
     
      pagina: pagina.toString(),
      registrosPorPagina: registrosPorPagina.toString(),
    });

    if (estadoId) params.append("estadoId", estadoId.toString());
    if (fecha) params.append("fecha", fecha);

    const url = `https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Pedido?${params.toString()}`;

    const response = await authFetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast.error(`Error al obtener pedidos: ${response.statusText}`);
      return { items: [], totalCount: 0 };
    }

    const data: PedidosResponse = await response.json();

    return data;
  } catch (error: any) {
    toast.error(`Error al obtener pedidos: ${error.message || error}`);
    return { items: [], totalCount: 0 };
  }
}
