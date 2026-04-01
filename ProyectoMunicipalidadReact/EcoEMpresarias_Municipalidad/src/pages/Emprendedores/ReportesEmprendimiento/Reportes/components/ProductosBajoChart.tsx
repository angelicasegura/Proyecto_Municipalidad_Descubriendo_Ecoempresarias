import { Bar } from "react-chartjs-2";

export default function ProductosBajoChart({ data }: any) {

  const chartData = {
    labels: data.map((d: any) => d.nombreProducto),
    datasets: [
      {
        label: "Bajo rendimiento",
        data: data.map((d: any) => d.totalVendido),
        backgroundColor: "#ef4444",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="font-semibold mb-2 text-gray-700">
        📉 Productos con Bajo Rendimiento
      </h2>
      <Bar data={chartData} />
    </div>
  );
}