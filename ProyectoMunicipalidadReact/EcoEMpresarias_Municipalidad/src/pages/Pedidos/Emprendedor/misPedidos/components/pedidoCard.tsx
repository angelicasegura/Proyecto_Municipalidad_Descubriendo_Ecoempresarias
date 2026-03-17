import type { Pedido } from "../../../../../types/misPedidosType";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../../../../components/ui/card";
import { useState } from "react";
import { FacturaModal } from "./facturaModal";
import {
  handleCancelarPedido
} from "../Actions/handleCancelarPedido";
import { handleActualizarPedido } from "../Actions/handleActualizarEstadoPedido";

interface Props {
  pedido: Pedido;
  reload: () => void;
}

export function PedidoCard({ pedido, reload }: Props) {
  const [openFactura, setOpenFactura] = useState(false);

  async function cancelar() {
    const descripcion = prompt("Motivo de cancelación");
    if (!descripcion) return;

    await handleCancelarPedido(pedido.pedido_id, descripcion);
    reload();
  }

  async function actualizar() {
    await handleActualizarPedido(pedido.pedido_id);
    reload();
  }

  return (
    <Card>
      <CardContent className="space-y-2">
        <p>Pedido: {pedido.pedido_id}</p>
        <p>Fecha: {pedido.fechaPedido}</p>
        <p>Dirección: {pedido.direccionEntrega}</p>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button variant="outline" onClick={() => setOpenFactura(true)}>
          Ver factura
        </Button>

        <Button onClick={actualizar}>Actualizar</Button>

        {pedido.estado_id === 5 && (
          <Button variant="destructive" onClick={cancelar}>
            Cancelar
          </Button>
        )}
      </CardFooter>

      {openFactura && (
        <FacturaModal
          factura={pedido.factura}
          onClose={() => setOpenFactura(false)}
        />
      )}
    </Card>
  );
}