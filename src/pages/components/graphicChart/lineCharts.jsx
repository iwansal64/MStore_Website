import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Data } from "./Data";

Chart.register(CategoryScale);

export default function LineCharts() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const totalOrdersByDate = JSON.parse(localStorage.getItem("total_orders_by_date")) || {};

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Hancurkan chart sebelum membuat yang baru
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: Object.keys(totalOrdersByDate),
        datasets: [
          {
            label: "Orders",
            data: Object.values(totalOrdersByDate),
            backgroundColor: ["#fff"],
            borderColor: "#155e75",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });
  }, []);

  return (
    <div className="App w-full h-full mx-auto">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
