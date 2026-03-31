import type { Pedido } from "../../../../../types/misPedidosType";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../../../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";

import { Separator } from "../../../../../components/ui/separator";
import { MapPin } from "lucide-react";


import { handleObtenerEmprendimientoPorId } from "../../../Emprendedor/misPedidos/Actions/handleObtenerEmprendimientoFactura";
import { generarFacturaPDF } from "../../../Emprendedor/misPedidos/Actions/hanldeGenerarPDF";
import { useQuery } from "@tanstack/react-query";


interface ModalFacturaProps {
  pedido: Pedido | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatCurrency(amount: number) {
  return `₡${amount.toLocaleString("es-CR", { minimumFractionDigits: 2 })}`;
}

const ModalFactura = ({ pedido, open, onOpenChange }: ModalFacturaProps) => {
  if (!pedido) return null;
  const { factura } = pedido;

const { data: emprendimiento, isLoading } = useQuery({
    queryKey: ["emprendimiento", factura?.emprendimiento_id],
    queryFn: () => {
      if (!factura?.emprendimiento_id) return null;
      return handleObtenerEmprendimientoPorId(factura.emprendimiento_id);
    },
  });
  const handleDescargarFactura = () => {
    if (!factura) return;

    if (!emprendimiento) {
      alert("No se pudo cargar el emprendimiento");
      return;
    }

    generarFacturaPDF(factura, emprendimiento);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Factura #{factura.factura_id}</DialogTitle>
          <DialogDescription className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {pedido.direccionEntrega}
          </DialogDescription>
        </DialogHeader>
        <button
          onClick={handleDescargarFactura}
          disabled={isLoading || !emprendimiento}
          className="bg-blue-600 text-white px-3 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? "Cargando..." : "Descargar PDF"}
        </button>
        {pedido.observaciones && (
          <div className="rounded-md bg-muted p-3 text-sm">
            <span className="font-medium">Observaciones:</span> {pedido.observaciones}
          </div>
        )}

        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead className="text-center">Cant.</TableHead>
                <TableHead className="text-right">P. Unit.</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {factura.detalles.map((d) => (
                <TableRow key={d.producto_id}>
                  <TableCell className="font-medium">{d.nombreProducto}</TableCell>
                  <TableCell className="text-center">{d.cantidad}</TableCell>
                  <TableCell className="text-right">{formatCurrency(d.precioUnitario)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(d.subtotal)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Separator />

        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(factura.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">IVA</span>
            <span>{formatCurrency(factura.iva)}</span>
          </div>
          <div className="flex justify-between text-base font-bold pt-1">
            <span>Total</span>
            <span>{formatCurrency(factura.total)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFactura;
