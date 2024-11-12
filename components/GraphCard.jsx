"use client"; // Asegúrate de incluir esto si estás usando Next.js con React hooks

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Registrar los componentes necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphCard = () => {
  const [chartData, setChartData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/historical/close.json"
        );
        const data = response.data.bpi;

        setChartData({
          labels: Object.keys(data),
          datasets: [
            {
              label: "Bitcoin Price Index (USD)",
              data: Object.values(data),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#1f1f1f7a] p-6 rounded-lg shadow-md mt-8 max-w-3xl mx-auto">
        <div className="divbit" style={{paddingBottom: "10rem", paddingTop:"6rem", textAlign:"center"}}> <h3 style={{fontSize:"xxx-large"}}> Bitcoin </h3></div>
      <h2 className="text-2xl font-bold mb-4">Filtrar por fecha</h2>
      <input
        type="text"
        placeholder="Buscar... (YYYY-MM-DD)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
        style={{backgroundColor:"gray",}}
      />
      {chartData ? (
        <div className="relative" style={{ height: "30rem", width: "60rem" }}>
          <Line
            data={{
              ...chartData,
              labels: chartData.labels.filter((label) =>
                label.includes(search)
              ),
              datasets: chartData.datasets.map((dataset) => ({
                ...dataset,
                data: dataset.data.filter((_, idx) =>
                  chartData.labels[idx].includes(search)
                ),
              })),
            }}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Bitcoin Price Index (USD)",
                },
              },
            }}
          />
        </div>
      ) : (
        <p>Cargando gráfico...</p>
      )}
    </div>
  );
};

export default GraphCard;