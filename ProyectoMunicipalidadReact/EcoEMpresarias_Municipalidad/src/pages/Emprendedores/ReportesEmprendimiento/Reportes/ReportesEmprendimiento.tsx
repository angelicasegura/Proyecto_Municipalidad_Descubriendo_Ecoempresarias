import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { handleKpi } from "./Actions/handleKpi";
import { handleVentasMensuales } from "./Actions/handleVetnasMensuales";
import { handleTicketPromedio } from "./Actions/handleTicketPromedio";
import { handleTopProductos } from "./Actions/handleTopProductos";
import { handleProductosBajo } from "./Actions/handleProductosBajo";

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

  useEffect(() => {
    if (!id) return;

    const cargarDatos = async () => {
      const [
        kpiData,
        ventasData,
        ticketData,
        productosData,
        productosBajoData
      ] = await Promise.all([
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
console.log("ventas:", ventas);
console.log("ticket:", ticket);
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

  <h1 className="text-2xl font-bold text-gray-800">
    📊 Dashboard del Emprendimiento
  </h1>

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
  );
}