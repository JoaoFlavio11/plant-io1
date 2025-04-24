"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/services/firebase";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";

type SensorData = {
  temperatura: number;
  umidade: number;
  status: string;
  regado: boolean;
  pe: string;
};

const SensorCard = ({
  title,
  description,
  data,
}: {
  title: string;
  description: string;
  data: string[];
}) => (
  <div className="bg-neutral-900 p-6 rounded-xl border border-lime-500 shadow-md max-w-4xl w-full space-y-2">
    <h2 className="text-2xl font-bold text-lime-400 font-mono">{title}</h2>
    <p className="text-zinc-300">{description}</p>
    <ul className="list-disc list-inside text-zinc-200">
      {data.map((item, index) => (
        <li key={index} className="font-mono">
          {item}
        </li>
      ))}
    </ul>
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
    <main className="flex-grow px-6 pt-32 pb-20 space-y-16">
      <section className="space-y-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold font-mono text-center">
          Sensores Utilizados
        </h1>

        <SensorCard
          title="Sensor de Umidade de Solo HL-69"
          description="Sensor analógico que mede a umidade do solo, ideal para sistemas automatizados de irrigação."
          data={["Umidade do solo em tempo real", "Detecção de solo seco ou úmido"]}
        />

        <SensorCard
          title="Sensor de Temperatura e Umidade DHT11"
          description="Sensor digital que fornece dados precisos de temperatura ambiente e umidade relativa do ar."
          data={["Temperatura em °C", "Umidade relativa do ar em %"]}
        />
      </section>

      <section className="space-y-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold font-mono text-lime-400">
          📊 Dados em tempo real
        </h2>

        {dados ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
            <div className="bg-neutral-900 p-4 rounded-lg border border-lime-400">
              <h3 className="font-mono text-lime-300">Temperatura</h3>
              <p className="text-2xl font-bold">{dados.temperatura} °C</p>
            </div>

            <div className="bg-neutral-900 p-4 rounded-lg border border-lime-400">
              <h3 className="font-mono text-lime-300">Umidade</h3>
              <p className="text-2xl font-bold">{dados.umidade} %</p>
            </div>

            <div className="bg-neutral-900 p-4 rounded-lg border border-lime-400">
              <h3 className="font-mono text-lime-300">Status</h3>
              <p className="text-2xl font-bold">{dados.status}</p>
            </div>

            <div className="bg-neutral-900 p-4 rounded-lg border border-lime-400">
              <h3 className="font-mono text-lime-300">Regado</h3>
              <p className="text-2xl font-bold">
                {dados.regado ? "Sim" : "Não"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-zinc-400">Carregando dados...</p>
        )}
      </section>
    </main>
  );
}
