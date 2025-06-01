"use client";

import { db } from "@/services/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { SensorData } from "@/lib/models/SensorModel";

export default function ReportClient() {
  const [dados, setDados] = useState<SensorData[]>([]);
  const [generatedAt, setGeneratedAt] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "plant"));
      if (!snapshot.empty) {
        const sensorData: SensorData[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          sensorData.push({
            temperatura: data.temperatura,
            umidade: data.umidade,
            qtdcooler: data.qtdcooler,
            qtdbomba1: data.qtdbomba1,
            qtdbomba2: data.qtdbomba2,
            solo1: data.solo1,
            solo2: data.solo2,
            timestamp: docSnap.id, // Agora é string, conforme o schema
          });
        });
        // Ordenar do mais recente para o mais antigo
        sensorData.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
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
    pdf.text("Temp", 50, y);
    pdf.text("Umidade", 70, y);
    pdf.text("Solo1", 100, y);
    pdf.text("Solo2", 120, y);
    pdf.text("Cooler", 140, y);
    pdf.text("Bomba1", 160, y);
    pdf.text("Bomba2", 180, y);

    y += 6;
    pdf.setLineWidth(0.1);
    pdf.line(14, y, 200, y);
    y += 4;

    dados.forEach((data) => {
      const dataStr = new Date(Number(data.timestamp)).toLocaleString();
      pdf.text(dataStr, 14, y);
      pdf.text(`${data.temperatura}°C`, 50, y);
      pdf.text(`${data.umidade}%`, 70, y);
      pdf.text(`${data.solo1}%`, 100, y);
      pdf.text(`${data.solo2}%`, 120, y);
      pdf.text(`${data.qtdcooler}`, 140, y);
      pdf.text(`${data.qtdbomba1}`, 160, y);
      pdf.text(`${data.qtdbomba2}`, 180, y);

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
      Data: new Date(Number(item.timestamp)).toLocaleString(),
      Temperatura: `${item.temperatura} °C`,
      Umidade: `${item.umidade} %`,
      Solo1: `${item.solo1} %`,
      Solo2: `${item.solo2} %`,
      QtdCooler: item.qtdcooler,
      QtdBomba1: item.qtdbomba1,
      QtdBomba2: item.qtdbomba2,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório");
    XLSX.writeFile(workbook, "relatorio_sensores.xlsx");
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#d1cbc2] rounded-xl p-6 space-y-4 shadow-lg">
      <h2 className="text-2xl font-bold text-emerald-800">Última Leitura</h2>

      {dados.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 text-gray-700 text-md">
          <p><strong>Data:</strong> {new Date(Number(dados[0].timestamp)).toLocaleString()}</p>
          <p><strong>Temperatura:</strong> {dados[0].temperatura} °C</p>
          <p><strong>Umidade do Solo:</strong> {dados[0].umidade} %</p>
          <p><strong>Solo 1:</strong> {dados[0].solo1} %</p>
          <p><strong>Solo 2:</strong> {dados[0].solo2} %</p>
          <p><strong>Qtd Cooler:</strong> {dados[0].qtdcooler}</p>
          <p><strong>Qtd Bomba 1:</strong> {dados[0].qtdbomba1}</p>
          <p><strong>Qtd Bomba 2:</strong> {dados[0].qtdbomba2}</p>
        </div>
      ) : (
        <p className="text-gray-500">Carregando dados...</p>
      )}

      {generatedAt && (
        <p className="text-sm text-gray-900">
          Relatório gerado em: {generatedAt}
        </p>
      )}

      <div className="justify-end flex gap-4 mt-6">
        <button
          onClick={generatePDF}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg transition"
        >
          Baixar PDF
        </button>

        <button
          onClick={generateXLSX}
          className="bg-emerald-600 hover:bg-emerald-800 text-white font-bold py-2 px-6 rounded-lg transition"
        >
          Baixar XLSX
        </button>
      </div>
    </div>
  );
}
