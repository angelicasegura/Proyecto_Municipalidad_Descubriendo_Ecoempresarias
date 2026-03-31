import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface Props {
  data: { mes: string; totalVentas: number }[];
}

export default function GraficoLinea({ data }: Props) {

  if (!data || data.length === 0) return <p>No hay datos</p>;

  const chartData = {
    labels: data.map(x => x.mes),
    datasets: [
      {
        label: "Crecimiento",
        data: data.map(x => x.totalVentas),
        borderColor: "rgba(59,130,246,1)",
        backgroundColor: "rgba(59,130,246,0.2)"
      }
    ]
  };

  return (
  <Line
    data={chartData}
    options={{
      responsive: true,
      maintainAspectRatio: false
    }}
  />
);
}