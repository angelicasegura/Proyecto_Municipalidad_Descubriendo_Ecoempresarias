export default function KpiCards({ data }: any) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      <Card title="Ventas Totales" value={`₡${data.ventasTotales}`} color="bg-green-100" />
      <Card title="Facturas" value={data.totalFacturas} color="bg-blue-100" />
      <Card title="Productos" value={data.productosVendidos} color="bg-purple-100" />
      <Card title="Ticket Promedio" value={`₡${data.ticketPromedio}`} color="bg-yellow-100" />

    </div>
  );
}

function Card({ title, value, color }: any) {
  return (
    <div className={`${color} p-4 rounded-xl shadow-sm`}>
      <p className="text-sm text-gray-600">{title}</p>
      <h2 className="text-lg font-bold text-gray-800">{value}</h2>
    </div>
  );
}