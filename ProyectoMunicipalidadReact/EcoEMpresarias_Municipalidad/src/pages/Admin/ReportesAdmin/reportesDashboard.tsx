import { useEffect, useState } from "react";
import {
  obtenerVentasPorSector,
  obtenerCrecimiento,
  obtenerActivos
} from "./actions/reporteActions";

import CardResumen from "./componentes/cardResumen";
import GraficoBarras from "./componentes/graficoBarras";
import GraficoLinea from "./componentes/graficoLinea";

export default function Dashboard() {
  const [ventas, setVentas] = useState<any[]>([]);
  const [crecimiento, setCrecimiento] = useState<any[]>([]);
  const [activos, setActivos] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const v = await obtenerVentasPorSector();
      const c = await obtenerCrecimiento();
      const a = await obtenerActivos();

      console.log("ventas:", v);
      console.log("crecimiento:", c);
      console.log("activos:", a);

      setVentas(v.map((x: any) => ({
        sector: x.sector ?? x.Sector,
        totalVentas: x.totalVentas ?? x.TotalVentas
      })));

      setCrecimiento(c.map((x: any) => ({
        mes: `${x.mes ?? x.Mes}/${x.anio ?? x.Anio}`,
        totalVentas: x.totalVentas ?? x.TotalVentas
      })));

      setActivos(a.totalActivos ?? a.TotalActivos);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Cargando...</p>;

 return (
  <div className="p-6 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold mb-6">📊 Dashboard</h1>

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
);
}