'use client';

import { Card } from "@/components/Card";
import { db } from "@/services/firebase/firebaseConfig";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

type SensorData = {
  temperatura: number;
  umidade: number;
  qtdcooler: number;
  qtdbomba1: number;
  qtdbomba2: number;
  solo1: number;
  solo2: number;
  timestamp?: string;
};

const HortelaDash = () => {
  const [dados, setDados] = useState<SensorData | null>(null);
  const [timestampFormatado, setTimestampFormatado] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const buscarUltimoDado = useCallback(async () => {
    try {
      const sensoresRef = collection(db, "plant");
      const q = query(sensoresRef, orderBy("timestamp", "desc"), limit(1));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        const data = docSnap.data() as SensorData;

        const payload: Omit<SensorData, "timestamp"> = {
          temperatura: data.temperatura,
          umidade: data.umidade,
          qtdcooler: data.qtdcooler,
          qtdbomba1: data.qtdbomba1,
          qtdbomba2: data.qtdbomba2,
          solo1: data.solo1,
          solo2: data.solo2,
        };

        const now = new Date().toISOString();
        setDados({ ...payload, timestamp: now });
        postData(payload);

        const dataFormatada = new Date(now).toLocaleDateString("pt-BR", {
          timeZone: "America/Sao_Paulo",
          day: "2-digit",
          month: "2-digit",
        });

        const horaFormatada = new Date(now).toLocaleTimeString("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
        });

        setTimestampFormatado(`${dataFormatada} ${horaFormatada}`);
      }
    } catch (error) {
      console.error("❌ Erro ao buscar dados:", error);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      buscarUltimoDado();
    }
  }, [mounted, buscarUltimoDado]);

  if (!mounted) {
    return null;
  }

  return (
    <section className="w-full pt-20 pb-10 px-4">
      <div className="max-w-6xl mt-2 min-w-6xl">
        <h1 className="text-emerald-800 text-4xl font-bold font-mono">Plantação de hortelã</h1>
        <h2 className="text-emerald-800 text-2xl font-semibold mb-6 border-b border-lime-500 pb-2">
          Última leitura registrada
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10 pt-1">
          {dados ? (
            <>
              <Card title="Temperatura" value={`${dados.temperatura} °C`} />
              <Card title="Umidade ambiente" value={`${dados.umidade} %`} />
              <Card title="Umidade solo 1" value={`${dados.solo1} %`} />
              <Card title="Umidade solo 2" value={`${dados.solo2} %`} />
              <Card title="Ativações Cooler" value={`${dados.qtdcooler} vezes`} />
              <Card title="Ativações Bomba 1" value={`${dados.qtdbomba1} vezes`} />
              <Card title="Ativações Bomba 2" value={`${dados.qtdbomba2} vezes`} />
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
