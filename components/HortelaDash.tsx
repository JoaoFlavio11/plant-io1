// components/HortelaDash.tsx
'use client';
import { Card } from "@/components/Card";
import { db } from "@/services/firebaseConfig";
import { collection, doc, onSnapshot, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

type SensorData = {
  temperatura: number;
  umidade: number;
  status: string;
  regado: boolean;
  pe: string;
  historico?: { timestamp: string; temperatura: number }[];
};

const HortelaDash = () => {
  const [dados, setDados] = useState<SensorData | null>(null);

  useEffect(() => {
    let unsub: (() => void) | undefined;

    const fetchData = async () => {
      try {
        const sensoresRef = collection(db, "hortela");
        const snapshot = await getDocs(sensoresRef);

        if (!snapshot.empty) {
          const firstDoc = snapshot.docs[0];
          const docRef = doc(db, "hortela", firstDoc.id);

          unsub = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data() as SensorData;
              console.log("🔥 Dados recebidos do Firestore:", data);
              setDados(data);
            } else {
              console.warn("❌ Documento não encontrado!");
              setDados(null);
            }
          });
        } else {
          console.warn('⚠️ Nenhum documento encontrado na coleção "hortela".');
        }
      } catch (error) {
        console.error("❌ Erro ao buscar dados do Firestore:", error);
      }
    };

    fetchData();

    return () => {
      if (unsub) unsub();
    };
  }, []);

  return (
    <section className="w-full pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-emerald-800 text-4xl font-bold font-mono">Plantação de hortelã</h1>
        <h2 className="text-emerald-800 text-2xl font-semibold mb-6 border-b border-lime-500 pb-2">
          Leituras em tempo real
        </h2>
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dados ? (
            <>
              <Card title="Temperatura do solo" value={`${dados.temperatura} °C`} />
              <Card title="Umidade do solo" value={`${dados.umidade} %`} />
              <Card title="Status" value={dados.status} />
              <Card title="Regado" value={dados.regado ? "Sim" : "Não"} />
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
