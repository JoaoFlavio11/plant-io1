"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { db } from "@/services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";

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
          const data = docSnap.data();
          sensorData.push({
            temperatura: data.temperatura,
            umidade: data.umidade,
            status: data.status,
            regado: data.regado,
            timestamp: parseInt(docSnap.id, 10),
          });
        });
        sensorData.sort((a, b) => b.timestamp - a.timestamp);
        setDados(sensorData);
      }
    };

    fetchData();
    setGeneratedAt(new Date().toLocaleString());
  }, []);

  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.setFont("helvetica", "normal");

    pdf.setFontSize(18);
    pdf.text("Relatório de Dados dos Sensores", 14, 20);

    pdf.setFontSize(10);
    pdf.text(`Gerado em: ${generatedAt}`, 14, 28);

    pdf.setFontSize(12);
    let y = 40;
    pdf.text("Data", 14, y);
    pdf.text("Temperatura", 60, y);
    pdf.text("Umidade", 100, y);
    pdf.text("Status", 140, y);
    pdf.text("Regado", 170, y);
    y += 6;
    pdf.setLineWidth(0.1);
    pdf.line(14, y, 195, y);
    y += 4;

    dados.forEach((data) => {
      const dataStr = new Date(data.timestamp).toLocaleString();
      pdf.text(dataStr, 14, y);
      pdf.text(`${data.temperatura}°C`, 60, y);
      pdf.text(`${data.umidade}%`, 100, y);
      pdf.text(data.status, 140, y);
      pdf.text(data.regado ? "Sim" : "Não", 170, y);
      y += 6;
      if (y > 280) {
        pdf.addPage();
        y = 20;
      }
    });

    pdf.save("relatorio_sensores.pdf");
  };

  const generateXLSX = () => {
    const worksheetData = dados.map((item) => ({
      Data: new Date(item.timestamp).toLocaleString(),
      Temperatura: `${item.temperatura} °C`,
      Umidade: `${item.umidade} %`,
      Status: item.status,
      Regado: item.regado ? "Sim" : "Não",
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório");
    XLSX.writeFile(workbook, "relatorio_sensores.xlsx");
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-lime-400">
      <Navbar />

      <main className="flex-grow flex flex-col items-center p-8 pt-32">
        <h1 className="text-4xl font-bold mb-8">Relatórios</h1>

        <div className="w-full max-w-3xl bg-neutral-900 rounded-xl p-6 space-y-4 shadow-lg">
          <h2 className="text-2xl font-bold text-lime-300">Última Leitura</h2>

          {dados.length > 0 ? (
            <div className="space-y-2 text-zinc-300">
              <p><strong>Data:</strong> {new Date(dados[0].timestamp).toLocaleString()}</p>
              <p><strong>Temperatura:</strong> {dados[0].temperatura} °C</p>
              <p><strong>Umidade do Solo:</strong> {dados[0].umidade} %</p>
              <p><strong>Status:</strong> {dados[0].status}</p>
              <p><strong>Regado Automaticamente:</strong> {dados[0].regado ? "Sim" : "Não"}</p>
            </div>
          ) : (
            <p className="text-zinc-400">Carregando dados...</p>
          )}

          {generatedAt && (
            <p className="text-sm text-neutral-500">
              Relatório gerado em: {generatedAt}
            </p>
          )}
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={generatePDF}
            className="bg-lime-500 hover:bg-lime-600 text-neutral-900 font-bold py-2 px-6 rounded-lg transition"
          >
            Baixar PDF
          </button>

          <button
            onClick={generateXLSX}
            className="bg-emerald-500 hover:bg-emerald-600 text-neutral-900 font-bold py-2 px-6 rounded-lg transition"
          >
            Baixar XLSX
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
