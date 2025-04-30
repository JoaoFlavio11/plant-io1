"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/services/firebase";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type SensorData = {
  temperatura: number;
  umidade: number;
  status: string;
  regado: boolean;
};

const SensorCard = ({
  title,
  description,
  dataLabels,
  dataValues,
  imageUrl,
}: {
  title: string;
  description: string;
  dataLabels: string[];
  dataValues: (string | number)[];
  imageUrl: string;
}) => (
  <div className="bg-neutral-900 p-6 rounded-2xl shadow-md w-full max-w-md flex flex-col space-y-6">
    <div className="flex flex-col md:flex-row md:items-center gap-6">
      <img src={imageUrl} alt={title} className="w-full md:w-40 h-40 object-contain" />
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-lime-400 font-mono mb-2">{title}</h2>
        <p className="text-zinc-300 text-md">{description}</p>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
      {dataLabels.map((label, index) => (
        <div
          key={index}
          className="bg-neutral-800 p-4 rounded-lg flex flex-col items-center text-center"
        >
          <span className="font-mono font-bold text-blue-600 text-sm">{label}</span>
          <span className="text-xl font-bold text-blue-500 mt-1">{dataValues[index]}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function SensorsClient() {
  const [dados, setDados] = useState<SensorData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "hortela"));
      if (!snapshot.empty) {
        const firstDoc = snapshot.docs[0];
        const docRef = doc(db, "hortela", firstDoc.id);

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setDados(docSnap.data() as SensorData);
          }
        });

        return () => unsubscribe();
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-800 text-lime-400">
      {/* Navbar */}
      <Navbar />

      <main className="flex-grow px-6 pt-32 pb-20 flex flex-col items-center">
        <h1 className="text-4xl font-bold font-mono text-center mb-16">
          Sensores Utilizados
        </h1>

        {/* Layout em grid flexível */}
        <div className="flex flex-wrap justify-center gap-10 w-full max-w-7xl">
          {/* Sensor de Temperatura e Umidade (DHT11) */}
          <SensorCard
            title="Sensor de Temperatura e Umidade DHT11"
            description="Sensor digital que fornece medições de temperatura e umidade, amplamente utilizado em sistemas de monitoramento ambiental."
            imageUrl="/images/dht11.png"
            dataLabels={["Temperatura (°C)", "Status do sensor:"]}
            dataValues={[
              dados?.temperatura ?? "Carregando...",
              dados?.status ?? "Carregando...",
            ]}
          />

          {/* Sensor de Umidade de Solo (HL-69) */}
          <SensorCard
            title="Sensor de Umidade de Solo HL-69"
            description="Sensor analógico utilizado para detectar a umidade no solo, fundamental para controle automático de irrigação."
            imageUrl="/images/HL69.png"
            dataLabels={["Umidade (%)", "Status do sensor:"]}
            dataValues={[
              dados?.umidade ?? "Carregando...",
              dados?.status ?? "Carregando...",
            ]}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
