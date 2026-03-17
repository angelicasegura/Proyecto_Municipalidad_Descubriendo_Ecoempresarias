
import { authFetch } from "../../../../../auth/AuthFetch";
import type { PedidoResponse } from "../../../../../types/pedidoType";
import toast from "react-hot-toast";

export async function handleFetchPedidosPorEmprendimiento(
  CedulaJuridica: string,
  page: number = 1
): Promise<PedidoResponse[]> {
  if (!CedulaJuridica) throw new Error("Falta CedulaJuridica");

  const params = new URLSearchParams({ cedulaJuridica: CedulaJuridica, page: page.toString() });
  const url = `https://localhost:7050/api/Pedido/Emprendimiento?${params.toString()}`;

  const res = authFetch(url)
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al obtener los pedidos");
      }
      const data = await response.json();
      return data.items as PedidoResponse[];
    });

  toast.promise(res, {
    loading: "Cargando pedidos...",
    success: `Pedidos cargados correctamente 🎉`,
    error: (err) => err.message || "No se pudieron cargar los pedidos",
  }, { duration: 4000 });

  return res;
}

