import { Line } from "react-chartjs-2";

export default function TicketChart({ data }: any) {
  const chartData = {
    labels: data.map((d: any) => `${d.mes}/${d.anio}`),
    datasets: [
      {
        label: "Ticket Promedio",
        data: data.map((d: any) => d.ticketPromedio),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="font-semibold mb-2 text-gray-700">💰 Ticket Promedio</h2>
      <Line data={chartData} />
    </div>
  );
}
