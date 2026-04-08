import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { handleKpi } from "./Actions/handleKpi";
import { handleVentasMensuales } from "./Actions/handleVetnasMensuales";
import { handleTicketPromedio } from "./Actions/handleTicketPromedio";
import { handleTopProductos } from "./Actions/handleTopProductos";
import { handleProductosBajo } from "./Actions/handleProductosBajo";
import { exportToExcel, exportToPDF } from "./Actions/handleExport";

import KpiCards from "./components/KpiCards";
import VentasChart from "./components/VentasChart";
import TicketChart from "./components/TicketChart";
import ProductosChart from "./components/ProductosChart";
import ProductosBajoChart from "./components/ProductosBajoChart";

export default function ReportesEmprendimiento() {
  const { id } = useParams();

  const [kpi, setKpi] = useState<any>(null);
  const [ventas, setVentas] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosBajo, setProductosBajo] = useState([]);
  const [exportingPDF, setExportingPDF] = useState(false);

  useEffect(() => {
    if (!id) return;
    const cargarDatos = async () => {
      const [kpiData, ventasData, ticketData, productosData, productosBajoData] =
        await Promise.all([
          handleKpi(Number(id)),
          handleVentasMensuales(Number(id)),
          handleTicketPromedio(Number(id)),
          handleTopProductos(Number(id)),
          handleProductosBajo(Number(id)),
        ]);
      setKpi(kpiData);
      setVentas(ventasData);
      setTicket(ticketData);
      setProductos(productosData);
      setProductosBajo(productosBajoData);
    };
    cargarDatos();
  }, [id]);

  const handleExportPDF = async () => {
    setExportingPDF(true);
    await exportToPDF("dashboard-content");
    setExportingPDF(false);
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* Header con botones */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-800">
          📊 Dashboard del Emprendimiento
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => exportToExcel(kpi, ventas, ticket, productos, productosBajo)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm"
          >
            📥 Exportar Excel
          </button>
          <button
            onClick={handleExportPDF}
            disabled={exportingPDF}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm disabled:opacity-60"
          >
            {exportingPDF ? "Generando..." : "📄 Exportar PDF"}
          </button>
        </div>
      </div>

      {/* Contenido del dashboard (capturado para PDF) */}
      <div id="dashboard-content" className="space-y-6">
        <KpiCards data={kpi} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VentasChart data={ventas} />
          <TicketChart data={ticket} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductosChart data={productos} />
          <ProductosBajoChart data={productosBajo} />
        </div>
      </div>

    </div>
  );
}