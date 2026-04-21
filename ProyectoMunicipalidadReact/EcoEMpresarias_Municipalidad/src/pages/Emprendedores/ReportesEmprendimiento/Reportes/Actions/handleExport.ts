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
    const kpiSheet = XLSX.utils.json_to_sheet([
      {
        "Ventas Totales (₡)": kpi.ventasTotales ?? 0,
        "Total Facturas": kpi.totalFacturas ?? 0,
        "Productos Vendidos": kpi.productosVendidos ?? 0,
        "Ticket Promedio (₡)": kpi.ticketPromedio ?? 0,
      },
    ]);
    XLSX.utils.book_append_sheet(wb, kpiSheet, "KPI");
  }

  if (ventas?.length) {
    const ventasSheet = XLSX.utils.json_to_sheet(
      ventas.map((d: any) => ({
        Mes: `${d.mes}/${d.anio}`,
        "Total Ventas (₡)": d.totalVentas ?? 0,
      }))
    );
    XLSX.utils.book_append_sheet(wb, ventasSheet, "Ventas Mensuales");
  }

  if (ticket?.length) {
    const ticketSheet = XLSX.utils.json_to_sheet(
      ticket.map((d: any) => ({
        Mes: `${d.mes}/${d.anio}`,
        "Ticket Promedio (₡)": d.ticketPromedio ?? 0,
      }))
    );
    XLSX.utils.book_append_sheet(wb, ticketSheet, "Ticket Promedio");
  }

  if (productos?.length) {
    const prodSheet = XLSX.utils.json_to_sheet(
      productos.map((d: any) => ({
        Producto: d.nombreProducto ?? "Sin nombre",
        "Total Vendido": d.totalVendido ?? 0,
      }))
    );
    XLSX.utils.book_append_sheet(wb, prodSheet, "Top Productos");
  }

  if (productosBajo?.length) {
    const bajoSheet = XLSX.utils.json_to_sheet(
      productosBajo.map((d: any) => ({
        Producto: d.nombreProducto ?? "Sin nombre",
        "Total Vendido": d.totalVendido ?? 0,
      }))
    );
    XLSX.utils.book_append_sheet(wb, bajoSheet, "Bajo Rendimiento");
  }

  // Si no hay datos en ninguna hoja, crea una hoja básica para evitar errores
  if (wb.SheetNames.length === 0) {
    const hojaVacia = XLSX.utils.json_to_sheet([
      { Mensaje: "No hay datos disponibles para exportar" },
    ]);
    XLSX.utils.book_append_sheet(wb, hojaVacia, "Reporte");
  }

  XLSX.writeFile(wb, "reporte_emprendimiento.xlsx");
}

export async function exportToPDF(elementId: string) {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`No se encontró ningún elemento con el id: ${elementId}`);
    return;
  }

  try {
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

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("No se pudo cargar la imagen para el PDF."));
    });

    const imgHeight = (img.height * pageWidth) / img.width;
    let y = 0;

    while (y < imgHeight) {
      pdf.addImage(dataUrl, "PNG", 0, -y, pageWidth, imgHeight);
      y += pageHeight;

      if (y < imgHeight) {
        pdf.addPage();
      }
    }

    pdf.save("reporte_emprendimiento.pdf");
  } catch (error) {
    console.error("Error al exportar el PDF:", error);
  }
}