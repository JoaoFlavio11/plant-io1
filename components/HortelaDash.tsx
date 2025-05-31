// components/HortelaDash.tsx
'use client';

import { Card } from "@/components/Card";
import { db } from "@/services/firebase/firebaseConfig";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

type SensorData = {
  temperatura: number;
  umidade: number;
  status: string;
  regado: boolean;
  gases?: number;
  tempoDeLuz?: number;
  timestamp?: string;
};

const HortelaDash = () => {
  const [dados, setDados] = useState<SensorData | null>(null);
  const [timestampFormatado, setTimestampFormatado] = useState<string>("");

  const postData = async (dados: Omit<SensorData, "timestamp">) => {
    try {
      const res = await fetch("/api/postData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.statusText}`);
      }

      const result = await res.json();
      console.log("📤 Resultado do post:", result);
    } catch (error) {
      console.error("❌ Erro ao enviar dados:", error);
    }
  };

  useEffect(() => {
    const sensoresRef = collection(db, "hortela");
    const q = query(sensoresRef, orderBy("timestamp", "desc"), limit(1));

    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        const data = docSnap.data() as SensorData;

        const payload: Omit<SensorData, "timestamp"> = {
          gases: Math.floor(Math.random() * 100),
          umidade: data.umidade,
          tempoDeLuz: Math.floor(Math.random() * 300),
          temperatura: data.temperatura,
          status: data.status,
          regado: data.regado,
        };

        const now = new Date().toISOString();
        setDados({ ...payload, timestamp: now });
        postData(payload);

        // Formatação da data movida para o useEffect para evitar hydration error
        const formatado = new Date(now).toLocaleString("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        setTimestampFormatado(formatado);
      }
    });

    return () => unsub();
  }, []);

  return (
    <section className="w-full pt-20 pb-10 px-4">
      <div className="max-w-6xl mt-2 min-w-6xl">
        <h1 className="text-emerald-800 text-4xl font-bold font-mono">Plantação de hortelã</h1>
        <h2 className="text-emerald-800 text-2xl font-semibold mb-6 border-b border-lime-500 pb-2">
          Leituras em tempo real
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-10 pt-1">
          {dados ? (
            <>
              <Card title="Temperatura" value={`${dados.temperatura} °C`} />
              <Card title="Umidade solo" value={`${dados.umidade} %`} />
              <Card title="Status" value={dados.status} />
              <Card title="Regado" value={dados.regado ? "Sim" : "Não"} />
              <Card title="Exposição à luz" value={`${dados.tempoDeLuz ?? 0} s`} />
              {/* <Card title="Gases no ambiente" value={`${dados.gases ?? 0} %`} /> */}
              <Card title="Última leitura" value={timestampFormatado || "N/A"} />
            </>
          ) : (
            <p className="col-span-full text-white">Carregando dados...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HortelaDash;
  