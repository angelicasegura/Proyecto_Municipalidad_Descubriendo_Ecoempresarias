import type { Factura } from "../../../../../types/misPedidosType";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/ui/dialog";

interface Props {
  factura: Factura;
  onClose: () => void;
}

export function FacturaModal({ factura, onClose }: Props) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Factura #{factura.factura_id}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p>Subtotal: {factura.subtotal}</p>
            <p>IVA: {factura.iva}</p>
            <p>Total: {factura.total}</p>
          </div>

          <table className="w-full border">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {factura.detalles.map((d) => (
                <tr key={d.producto_id}>
                  <td>{d.nombreProducto}</td>
                  <td>{d.cantidad}</td>
                  <td>{d.precioUnitario}</td>
                  <td>{d.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}