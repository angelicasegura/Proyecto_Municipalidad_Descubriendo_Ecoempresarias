import type { Factura } from "../../../../../types/misPedidosType";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/ui/dialog";
import { useRef } from "react";

import { handleObtenerEmprendimientoPorId } from "../Actions/handleObtenerEmprendimientoFactura";
import { generarFacturaPDF } from "../Actions/hanldeGenerarPDF";
import { useQuery } from "@tanstack/react-query";

interface Props {
  factura: Factura;
  onClose: () => void;
}

export function FacturaModal({ factura, onClose }: Props) {
  const pdfRef = useRef<HTMLDivElement>(null);
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
  //
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Factura #{factura.factura_id}</DialogTitle>
        </DialogHeader>
        <button
          onClick={handleDescargarFactura}
          disabled={isLoading || !emprendimiento}
          className="bg-blue-600 text-white px-3 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? "Cargando..." : "Descargar PDF"}
        </button>
        <div ref={pdfRef} className="bg-white p-6 text-black">
          <h2 className="text-lg font-bold mb-4">
            Factura #{factura.factura_id}
          </h2>

          <div className="mb-4">
            <p>Subtotal: ₡{factura.subtotal.toLocaleString("es-CR")}</p>
            <p>IVA: ₡{factura.iva.toLocaleString("es-CR")}</p>
            <p>Total: ₡{factura.total.toLocaleString("es-CR")}</p>
          </div>

          <table className="w-full border border-black">
            <thead>
              <tr className="border-b border-black">
                <th className="text-left">Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {factura.detalles.map((d) => (
                <tr key={d.producto_id} className="border-b border-black">
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
