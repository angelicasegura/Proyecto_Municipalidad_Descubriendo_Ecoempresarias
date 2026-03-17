import type { FC } from "react";
import type { Factura } from "../../../../../types/misPedidosType";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../../../components/ui/dialog";
import {Button} from "../../../../../components/ui/button";
interface FacturaModalProps {
    factura: Factura;
    onClose: () => void;
}

export const FacturaModal: FC<FacturaModalProps> = ({ factura, onClose }) => (
  <Dialog open={true} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Factura #{factura.factura_id}</DialogTitle>
      </DialogHeader>
      <div className="overflow-auto max-h-96 mt-4">
        <table className="w-full table-auto border">
          <thead>
            <tr className="border-b">
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {factura.detalles.map(d => (
              <tr key={d.producto_id} className="border-b">
                <td>{d.nombreProducto}</td>
                <td>{d.cantidad}</td>
                <td>{d.precioUnitario}</td>
                <td>{d.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DialogFooter>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);