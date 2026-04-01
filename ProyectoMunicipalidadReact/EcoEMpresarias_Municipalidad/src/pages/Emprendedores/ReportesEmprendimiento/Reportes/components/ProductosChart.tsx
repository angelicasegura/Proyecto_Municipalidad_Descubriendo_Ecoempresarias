import { Bar } from "react-chartjs-2";

export default function ProductosChart({ data }: any) {

  const chartData = {
    labels: data.map((d: any) => d.nombreProducto),
    datasets: [
      {
        label: "Más vendidos",
        data: data.map((d: any) => d.totalVendido),
        backgroundColor: "#22c55e",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="font-semibold mb-2 text-gray-700">
        🏆 Productos Más Vendidos
      </h2>
      <Bar data={chartData} />
    </div>
  );
}