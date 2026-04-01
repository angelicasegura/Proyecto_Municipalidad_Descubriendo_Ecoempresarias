import { Line } from "react-chartjs-2";

export default function VentasChart({ data }: any) {

  const chartData = {
  labels: data.map((d: any) => `${d.mes}/${d.anio}`),
  datasets: [
    {
      label: "Ventas Mensuales",
      data: data.map((d: any) => d.totalVentas),
      borderColor: "#22c55e",
      backgroundColor: "rgba(34,197,94,0.2)",
      tension: 0.4,
      pointRadius: 6,          
      pointBackgroundColor: "#22c55e",
    },
  ],
};

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="font-semibold mb-2 text-gray-700">
        📈 Ventas Mensuales
      </h2>
      <Line data={chartData} />
    </div>
  );
}