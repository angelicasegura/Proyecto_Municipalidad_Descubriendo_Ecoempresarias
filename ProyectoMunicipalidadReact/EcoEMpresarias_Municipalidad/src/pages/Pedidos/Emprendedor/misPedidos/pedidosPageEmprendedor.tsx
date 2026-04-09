import { useEffect, useState } from "react";
import { handleFetchPedidosPorEmprendimiento } from "./Actions/handleObtenerPedidos";
import { PedidoCard } from "./components/pedidoCard";
import { useParams } from "react-router-dom";
import type { Pedido } from "../../../../types/misPedidosType";

export default function PedidosPage() {
  const { cedulaJuridica } = useParams<{ cedulaJuridica: string }>();

  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  async function loadPedidos() {
    if (!cedulaJuridica) return;

    try {
      const data = await handleFetchPedidosPorEmprendimiento(cedulaJuridica);
        console.log(data)
      // protección si items viene undefined
      setPedidos(data?.items ?? []);
    } catch (error) {
      console.error("Error cargando pedidos", error);
      setPedidos([]);
    }
  }
  

  useEffect(() => {
    loadPedidos();
    
  }, [cedulaJuridica]);

  const pendientes = pedidos.filter((p) => p.estado_id === 5);
  const proceso = pedidos.filter((p) => p.estado_id === 6);

  return (
    <div className="p-6 space-y-6">
      {/* Contadores */}
      <div className="flex gap-6">
        <div className="bg-muted p-4 rounded-xl">
          Pendientes: {pendientes.length}
        </div>

        <div className="bg-muted p-4 rounded-xl">
          En proceso: {proceso.length}
        </div>
      </div>

      {/* Columnas */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Pendientes</h2>

          {pendientes.map((p) => (
            <PedidoCard key={p.pedido_id} pedido={p} reload={loadPedidos} />
          ))}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">En proceso</h2>

          {proceso.map((p) => (
            <PedidoCard key={p.pedido_id} pedido={p} reload={loadPedidos} />
          ))}
        </div>
      </div>
    </div>
  );
}