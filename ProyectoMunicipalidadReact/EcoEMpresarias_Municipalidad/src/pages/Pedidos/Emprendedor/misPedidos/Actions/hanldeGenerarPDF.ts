import jsPDF from "jspdf";
import type { Factura } from "../../../../../types/misPedidosType";
import type { Emprendimiento } from "../../../../../types/emprendedoresType";
import "../../../../../utils/fonts/Roboto-Regular-normal.js";
const estadoMap: Record<number, string> = {
  5: "Pendiente",
  6: "En Proceso",
  7: "Finalizado",
};

export const generarFacturaPDF = (
  factura: Factura,
  emprendimiento: Emprendimiento,
) => {
  const doc = new jsPDF();
  doc.setFont("Roboto-Regular", "normal");
  const formatCRC = (value: number) => `CRC ${value.toLocaleString("es-CR")}`;
  const fecha = new Date(factura.fecha);
  const fechaStr = fecha.toLocaleDateString("es-CR");
  const fechaArchivo = fecha.toISOString().split("T")[0];

  const estado = estadoMap[factura.estado_id] ?? "Desconocido";

  const filename = `factura_${factura.factura_id}_${fechaArchivo}.pdf`;

  doc.setFontSize(16);
  doc.text(emprendimiento.nombre, 10, 15);

  doc.setFontSize(10);
  doc.text(`Cédula Juridica: ${emprendimiento.cedulaJuridica}`, 10, 22);
  doc.text(`Email: ${emprendimiento.email}`, 10, 27);
  doc.text(`Tel: ${emprendimiento.telefono}`, 10, 32);
  doc.text(`Dirección: ${emprendimiento.direccion}`, 10, 37);

  doc.setFontSize(14);
  doc.text(`Factura #${factura.factura_id}`, 140, 15);

  doc.setFontSize(10);
  doc.text(`Fecha: ${fechaStr}`, 140, 22);
  doc.text(`Estado: ${estado}`, 140, 27);

  let y = 50;

  doc.setFontSize(11);
  doc.text("Producto", 10, y);
  doc.text("Cant", 90, y);
  doc.text("Precio", 110, y);
  doc.text("Subtotal", 150, y);

  y += 4;
  doc.line(10, y, 200, y);
  y += 6;

  factura.detalles.forEach((d) => {
    doc.setFontSize(10);

    doc.text(d.nombreProducto, 10, y);
    doc.text(String(d.cantidad), 90, y);
    doc.text(formatCRC(d.precioUnitario), 110, y);
    doc.text(formatCRC(d.subtotal), 150, y);

    y += 7;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  y += 10;
  doc.line(120, y, 200, y);
  y += 6;

  doc.text(`Subtotal: ${formatCRC(factura.subtotal)}`, 120, y);
  y += 6;
  doc.text(`IVA: ${formatCRC(factura.iva)}`, 120, y + 6);
  y += 6;

  doc.setFontSize(12);
  doc.text(`Total: ${formatCRC(factura.total)}`, 120, y + 12);

  doc.save(filename);
};
