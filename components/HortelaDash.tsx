import { useEffect, useState } from "react";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/services/firebase";
import { Card } from "@/components/Card";

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
    const fetchData = async () => {
      try {
        const sensoresRef = collection(db, "hortela");
        const snapshot = await getDocs(sensoresRef);

        if (!snapshot.empty) {
          const firstDoc = snapshot.docs[0];
          const docRef = doc(db, "hortela", firstDoc.id); // Corrigido aqui!

          const unsub = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data() as SensorData;
              console.log("🔥 Dados recebidos do Firestore:", data);
              setDados(data);
            } else {
              console.warn("❌ Documento não encontrado!");
            }
          });

          return () => unsub();
        } else {
          console.warn('⚠️ Nenhum documento encontrado na coleção "hortela".');
        }
      } catch (error) {
        console.error("❌ Erro ao buscar dados do Firestore:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-800 text-lime-400">
      <main className="flex-grow p-6 pt-32 space-y-8">
        <h1 className="text-4xl font-bold font-mono">Platação de hortelã</h1>
        <h2 className="text-2xl font-semibold mb-4 border-b border-lime-500 pb-2">Leituras em tempo real</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dados && (
            <>
              <Card title="Temperatura" value={`${dados.temperatura} °C`} />
              <Card title="Umidade" value={`${dados.umidade} %`} />
              <Card title="Status" value={dados.status} />
              <Card title="Regado" value={dados.regado ? "Sim" : "Não"} />
            </>
          )}
        </div>

      </main>
    </div>
  );
};

export default HortelaDash;
