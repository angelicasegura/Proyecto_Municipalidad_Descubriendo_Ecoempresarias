import { useEffect, useState } from "react";
import {
  obtenerVentasPorSector,
  obtenerCrecimiento,
  obtenerActivos
} from "./actions/reporteActions";

import { exportToExcel, exportToPDF } from "./actions/handleExport";

import CardResumen from "./componentes/cardResumen";
import GraficoBarras from "./componentes/graficoBarras";
import GraficoLinea from "./componentes/graficoLinea";

export default function Dashboard() {
  const [ventas, setVentas] = useState<any[]>([]);
  const [crecimiento, setCrecimiento] = useState<any[]>([]);
  const [activos, setActivos] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [exportingPDF, setExportingPDF] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const v = await obtenerVentasPorSector();
      const c = await obtenerCrecimiento();
      const a = await obtenerActivos();

      setVentas(
        v.map((x: any) => ({
          sector: x.sector ?? x.Sector,
          totalVentas: x.totalVentas ?? x.TotalVentas
        }))
      );

      setCrecimiento(
        c.map((x: any) => ({
          mes: `${x.mes ?? x.Mes}/${x.anio ?? x.Anio}`,
          totalVentas: x.totalVentas ?? x.TotalVentas
        }))
      );

      setActivos(a.totalActivos ?? a.TotalActivos);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    setExportingPDF(true);
    await exportToPDF("dashboard-content");
    setExportingPDF(false);
  };

  if (loading) return <p className="p-6">Cargando...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER + BOTONES */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <h1 className="text-3xl font-bold">📊 Dashboard</h1>

        <div className="flex gap-2">
          <button
            onClick={() => exportToExcel(activos, ventas, crecimiento)}
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

      {/* CONTENIDO EXPORTABLE */}
      <div id="dashboard-content">

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <CardResumen titulo="Emprendimientos Activos" valor={activos} />
        </div>

        {/* GRÁFICOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* BARRAS */}
          <div className="bg-white p-5 rounded-2xl shadow-md">
            <h2 className="font-semibold mb-4 text-gray-700">
              Ventas por Sector
            </h2>

            <div className="h-[300px]">
              <GraficoBarras data={ventas} />
            </div>
          </div>

          {/* LÍNEA */}
          <div className="bg-white p-5 rounded-2xl shadow-md">
            <h2 className="font-semibold mb-4 text-gray-700">
              Crecimiento Mensual
            </h2>

            <div className="h-[300px]">
              <GraficoLinea data={crecimiento} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}