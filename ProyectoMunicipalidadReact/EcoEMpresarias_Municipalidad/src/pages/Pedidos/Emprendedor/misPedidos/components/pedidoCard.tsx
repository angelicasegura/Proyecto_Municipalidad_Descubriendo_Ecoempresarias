import type { Pedido } from "../../../../../types/misPedidosType";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent } from "../../../../../components/ui/card";
import { Badge } from "../../../../../components/ui/badge";
import { useState } from "react";
import { FacturaModal } from "./facturaModal";
import {
  handleCancelarPedido
} from "../Actions/handleCancelarPedido";
import { handleActualizarPedido } from "../Actions/handleActualizarEstadoPedido";
import { MapPin, Clock, Eye, RefreshCcw, XCircle } from "lucide-react";

interface Props {
  pedido: Pedido;
  reload: () => void;
}

const estadoConfig: Record<number, { label: string; className: string }> = {
  5: {
    label: "Pendiente",
    className: "bg-[#FFF3E0] text-[#FF8C42] border-[#FFD1A4]",
  },
  6: {
    label: "En Proceso",
    className: "bg-[#E0F7FA] text-[#00ACC1] border-[#80DEEA]",
  },
  7: {
    label: "Finalizado",
    className: "bg-[#E8F5E9] text-[#43A047] border-[#A5D6A7]",
  },
};

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("es-CR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function PedidoCard({ pedido, reload }: Props) {
  const [openFactura, setOpenFactura] = useState(false);

  const estado = estadoConfig[pedido.estado_id] ?? {
    label: "Desconocido",
    className: "",
  };

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
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* LEFT INFO */}
        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span>{formatTime(pedido.fechaPedido)}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span className="font-medium truncate">
              {pedido.direccionEntrega}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <Badge variant="outline" className={estado.className}>
              {estado.label}
            </Badge>

            <span className="text-sm font-semibold">
              Pedido #{pedido.pedido_id}
            </span>
          </div>
        </div>

        {/* acciones */}
        <div className="flex gap-2 sm:flex-col sm:items-end shrink-0">

          <Button
            size="sm"
            variant="outline"
            onClick={() => setOpenFactura(true)}
          >
            <Eye className="h-4 w-4 mr-1" />
            Factura
          </Button>

          <Button
            size="sm"
            onClick={actualizar}
            className="bg-[#00ACC1] text-white hover:bg-[#0097A7]"
          >
            <RefreshCcw className="h-4 w-4 mr-1" />
            Actualizar
          </Button>

          {pedido.estado_id === 5 && (
            <Button
              size="sm"
              variant="destructive"
              onClick={cancelar}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Cancelar
            </Button>
          )}
        </div>
      </CardContent>

      {openFactura && (
        <FacturaModal
          factura={pedido.factura}
          onClose={() => setOpenFactura(false)}
        />
      )}
    </Card>
  );
}