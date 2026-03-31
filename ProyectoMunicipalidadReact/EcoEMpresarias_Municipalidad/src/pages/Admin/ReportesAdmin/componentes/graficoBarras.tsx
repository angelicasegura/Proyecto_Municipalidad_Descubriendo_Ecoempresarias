import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface Props {
  data: { sector: string; totalVentas: number }[];
}

export default function GraficoBarras({ data }: Props) {

  if (!data || data.length === 0) return <p>No hay datos</p>;

  const chartData = {
    labels: data.map(x => x.sector),
    datasets: [
      {
        label: "Ventas",
        data: data.map(x => x.totalVentas),
        backgroundColor: "rgba(34,197,94,0.6)"
      }
    ]
  };

  return (
  <Bar
    data={chartData}
    options={{
      responsive: true,
      maintainAspectRatio: false
    }}
  />
)
}