import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image-more";

export function exportToExcel(
  kpi: any,
  ventas: any[],
  ticket: any[],
  productos: any[],
  productosBajo: any[]
) {
  const wb = XLSX.utils.book_new();

  if (kpi) {
    const kpiSheet = XLSX.utils.json_to_sheet([{
      "Ventas Totales (₡)": kpi.ventasTotales,
      "Total Facturas": kpi.totalFacturas,
      "Productos Vendidos": kpi.productosVendidos,
      "Ticket Promedio (₡)": kpi.ticketPromedio,
    }]);
    XLSX.utils.book_append_sheet(wb, kpiSheet, "KPI");
  }

  if (ventas.length) {
    const ventasSheet = XLSX.utils.json_to_sheet(
      ventas.map((d: any) => ({ Mes: `${d.mes}/${d.anio}`, "Total Ventas (₡)": d.totalVentas }))
    );
    XLSX.utils.book_append_sheet(wb, ventasSheet, "Ventas Mensuales");
  }

  if (ticket.length) {
    const ticketSheet = XLSX.utils.json_to_sheet(
      ticket.map((d: any) => ({ Mes: `${d.mes}/${d.anio}`, "Ticket Promedio (₡)": d.ticketPromedio }))
    );
    XLSX.utils.book_append_sheet(wb, ticketSheet, "Ticket Promedio");
  }

  if (productos.length) {
    const prodSheet = XLSX.utils.json_to_sheet(
      productos.map((d: any) => ({ Producto: d.nombreProducto, "Total Vendido": d.totalVendido }))
    );
    XLSX.utils.book_append_sheet(wb, prodSheet, "Top Productos");
  }

  if (productosBajo.length) {
    const bajoSheet = XLSX.utils.json_to_sheet(
      productosBajo.map((d: any) => ({ Producto: d.nombreProducto, "Total Vendido": d.totalVendido }))
    );
    XLSX.utils.book_append_sheet(wb, bajoSheet, "Bajo Rendimiento");
  }

  XLSX.writeFile(wb, "reporte_emprendimiento.xlsx");
}

export async function exportToPDF(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const scale = 2;
  const width = element.offsetWidth * scale;
  const height = element.offsetHeight * scale;

  const dataUrl = await (domtoimage as any).toPng(element, {
    width,
    height,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      width: `${element.offsetWidth}px`,
      height: `${element.offsetHeight}px`,
    },
  });

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const img = new Image();
  img.src = dataUrl;
  await new Promise((res) => (img.onload = res));

  const imgHeight = (img.height * pageWidth) / img.width;
  let y = 0;
  while (y < imgHeight) {
    pdf.addImage(dataUrl, "PNG", 0, -y, pageWidth, imgHeight);
    y += pageHeight;
    if (y < imgHeight) pdf.addPage();
  }

  pdf.save("reporte_emprendimiento.pdf");
}