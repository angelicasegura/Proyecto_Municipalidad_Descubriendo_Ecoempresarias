import { type Pedido } from "../../../../../types/misPedidosType";
import { Badge } from "../../../../../components/ui/badge";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent } from "../../../../../components/ui/card";
import { MapPin, Clock, MessageCircle, Eye } from "lucide-react";

interface CardPedidoProps {
  pedido: Pedido;
  onVerDetalles: (pedido: Pedido) => void;
  mostrarConfirmarPago?: boolean;
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

function formatCurrency(amount: number) {
  return `₡${amount.toLocaleString("es-CR", { minimumFractionDigits: 0 })}`;
}

const CardPedido = ({
  pedido,
  onVerDetalles,
  mostrarConfirmarPago = true,
}: CardPedidoProps) => {
  const estado = estadoConfig[pedido.estado_id] ?? {
    label: "Desconocido",
    className: "",
  };

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Info */}
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
              {formatCurrency(pedido.factura.total)}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex gap-2 sm:flex-col sm:items-end shrink-0">
          {Number(pedido.estado_id) === 5 && mostrarConfirmarPago && (
            <Button
              size="sm"
              className="bg-[#FF8C42] text-white hover:bg-[#FF7043]" // naranja pastel
              onClick={() => {
                console.log("Confirmar Pago");
              }}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Confirmar Pago
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => onVerDetalles(pedido)}
          >
            <Eye className="h-4 w-4 mr-1" />
            Ver Detalles
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPedido;
