import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image-more";

/* =========================
   EXPORTAR A EXCEL
========================= */
export function exportToExcel(
  activos: number,
  ventas: any[],
  crecimiento: any[]
) {
  const wb = XLSX.utils.book_new();

  /* ===== HOJA RESUMEN ===== */
  const resumenSheet = XLSX.utils.json_to_sheet([
    {
      "Emprendimientos Activos": activos ?? 0
    }
  ]);
  XLSX.utils.book_append_sheet(wb, resumenSheet, "Resumen");

  /* ===== VENTAS POR SECTOR ===== */
  if (ventas?.length) {
    const ventasSheet = XLSX.utils.json_to_sheet(
      ventas.map((v: any) => ({
        Sector: v.sector,
        "Total Ventas": v.totalVentas ?? 0
      }))
    );
    XLSX.utils.book_append_sheet(wb, ventasSheet, "Ventas por Sector");
  }

  /* ===== CRECIMIENTO ===== */
  if (crecimiento?.length) {
    const crecimientoSheet = XLSX.utils.json_to_sheet(
      crecimiento.map((c: any) => ({
        Mes: c.mes,
        "Total Ventas": c.totalVentas ?? 0
      }))
    );
    XLSX.utils.book_append_sheet(wb, crecimientoSheet, "Crecimiento");
  }

  XLSX.writeFile(wb, "dashboard_general.xlsx");
}

/* =========================
   EXPORTAR A PDF
========================= */
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
      if (y < imgHeight) pdf.addPage();
    }

    pdf.save("dashboard_general.pdf");
  } catch (error) {
    console.error("Error al exportar el PDF:", error);
  }
}