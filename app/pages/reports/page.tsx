"use client";

import React, { useEffect, useState } from "react"; // Removido o useRef
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { db } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore"; // Removido doc e onSnapshot
import jsPDF from "jspdf";
import { Chart } from "chart.js";
import { ChartOptions } from "chart.js";

// Definindo o tipo SensorData com as propriedades corretas
type SensorData = {
  temperatura: number;
  umidade: number;
  status: string;
  regado: boolean;
  timestamp: number;
};

export default function Reports() {
  const [dados, setDados] = useState<SensorData[]>([]);
  const [generatedAt, setGeneratedAt] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "hortela"));
      if (!snapshot.empty) {
        const sensorData: SensorData[] = [];
        snapshot.forEach((docSnap) => {
          // Extraindo os dados corretos do documento Firestore
          const data = docSnap.data();
          sensorData.push({
            temperatura: data.temperatura, 
            umidade: data.umidade, 
            status: data.status, 
            regado: data.regado, 
            timestamp: parseInt(docSnap.id, 10) // Garantindo que o timestamp seja um número
          });
        });
        setDados(sensorData);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setGeneratedAt(new Date().toLocaleString());
  }, []);

  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.setFont("helvetica", "normal");

    // Adicionar título
    pdf.setFontSize(18);
    pdf.text("Relatório Histórico de Sensores", 10, 10);

    // Adicionar data de geração
    pdf.setFontSize(12);
    pdf.text(`Gerado em: ${generatedAt}`, 10, 20);

    // Adicionar histórico de dados
    pdf.setFontSize(10);
    let yOffset = 30;
    pdf.text("Histórico de Dados:", 10, yOffset);
    yOffset += 10;

    dados.forEach((data) => {
      pdf.text(
        `Data: ${new Date(data.timestamp).toLocaleString()} - Temperatura: ${data.temperatura}°C - Umidade: ${data.umidade}% - Status: ${data.status} - Regado: ${data.regado ? "Sim" : "Não"}`,
        10,
        yOffset
      );
      yOffset += 10;
    });

    // Gerar gráfico de temperatura
    const tempData = dados.map((data) => data.temperatura);
    const tempLabels = dados.map((data) => new Date(data.timestamp).toLocaleString());
    const chartTemp = document.createElement("canvas");

    const chartTempContext = chartTemp.getContext("2d");
    if (chartTempContext) {
      new Chart(chartTempContext, {
        type: "line",
        data: {
          labels: tempLabels,
          datasets: [
            {
              label: "Temperatura (°C)",
              data: tempData,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true },
          },
        } as ChartOptions,
      });
    }

    const tempImage = chartTemp.toDataURL("image/png");
    pdf.addImage(tempImage, "PNG", 10, yOffset, 180, 100);
    yOffset += 110;

    // Gerar gráfico de umidade
    const humidityData = dados.map((data) => data.umidade);
    const chartHumidity = document.createElement("canvas");

    const chartHumidityContext = chartHumidity.getContext("2d");
    if (chartHumidityContext) {
      new Chart(chartHumidityContext, {
        type: "line",
        data: {
          labels: tempLabels,
          datasets: [
            {
              label: "Umidade (%)",
              data: humidityData,
              borderColor: "rgba(153, 102, 255, 1)",
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true },
          },
        } as ChartOptions,
      });
    }

    const humidityImage = chartHumidity.toDataURL("image/png");
    pdf.addImage(humidityImage, "PNG", 10, yOffset, 180, 100);

    // Salvar PDF
    pdf.save("relatorio_sensores.pdf");
  };

  return (
    <div className="flex flex-col min-h-screen text-lime-400">
      <Navbar />

      <main className="flex-grow flex flex-col items-center p-10 pt-32">
        <h1 className="text-4xl font-bold font-mono mb-8">Relatórios</h1>

        <div className="w-full max-w-3xl bg-neutral-900 rounded-xl p-6 space-y-4">
          <h2 className="text-2xl font-bold text-lime-300">Dados dos Sensores</h2>

          <div className="space-y-2 text-zinc-300">
            <p><strong>Temperatura:</strong> {dados[0]?.temperatura ?? "Carregando..."} °C</p>
            <p><strong>Umidade do Solo:</strong> {dados[0]?.umidade ?? "Carregando..."} %</p>
            <p><strong>Status do Sensor:</strong> {dados[0]?.status ?? "Carregando..."}</p>
            <p><strong>Regado Automaticamente:</strong> {dados[0]?.regado ? "Sim" : "Não"}</p>
            {generatedAt && (
              <p className="text-sm text-neutral-500">
                Gerado em: {generatedAt}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={generatePDF}
          className="mt-8 bg-lime-500 hover:bg-lime-600 text-neutral-900 font-bold py-2 px-6 rounded-lg transition"
        >
          Gerar PDF
        </button>
      </main>

      <Footer />
    </div>
  );
}
