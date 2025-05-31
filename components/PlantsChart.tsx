// components/PlantsChart.tsx
'use client';

import { db } from '@/services/firebase/firebaseConfig';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

type SensorData = {
  temperatura: number;
  umidade: number;
  timestamp: number;
};

export default function PlantsChart() {
  const [historico, setHistorico] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'hortela'));
      if (!snapshot.empty) {
        const dados: SensorData[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          dados.push({
            temperatura: data.temperatura,
            umidade: data.umidade,
            timestamp: parseInt(docSnap.id, 10),
          });
        });
        dados.sort((a, b) => a.timestamp - b.timestamp);
        setHistorico(dados);
      }
    };

    fetchData();
  }, []);

  const labels = historico.map((item) =>
    new Date(item.timestamp).toLocaleTimeString()
  );
  const temperaturaData = historico.map((item) => item.temperatura);
  const umidadeData = historico.map((item) => item.umidade);

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#065f46', // Verde escuro
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#065f46',
        },
      },
      y: {
        ticks: {
          color: '#065f46',
        },
      },
    },
  };

  return (
    <section className="w-full py-12 pt-2">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6">
        {/* Temperatura */}
        <div className="bg-[#d1cbc2] p-6 rounded-xl shadow-lg w-full sm:w-[48%]">
          <h3 className="text-2xl font-bold text-emerald-800 mb-4">
            Temperatura do Solo (°C)
          </h3>
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: 'Temperatura',
                  data: temperaturaData,
                  fill: false,
                  borderColor: '#047857',
                  backgroundColor: '#065f46',
                  tension: 0.3,
                },
              ],
            }}
            options={commonOptions}
          />
        </div>

        {/* Umidade */}
        <div className="bg-[#d1cbc2] p-6 rounded-xl shadow-lg w-full sm:w-[48%]">
          <h3 className="text-2xl font-bold text-emerald-800 mb-4">
            Umidade do Solo (%)
          </h3>
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: 'Umidade',
                  data: umidadeData,
                  fill: false,
                  borderColor: '#065f46',
                  backgroundColor: '#047857',
                  tension: 0.3,
                },
              ],
            }}
            options={commonOptions}
          />
        </div>

        {/* exposição  luz 
        <div className="bg-[#d1cbc2] p-6 rounded-xl shadow-lg w-full sm:w-[48%]">
          <h3 className="text-2xl font-bold text-emerald-800 mb-4">
            Exposição á luz (s)
          </h3>
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: 'Exposição',
                  data: umidadeData,
                  fill: false,
                  borderColor: '#065f46',
                  backgroundColor: '#047857',
                  tension: 0.3,
                },
              ],
            }}
            options={commonOptions}
          />
        </div>
        */}

      </div>
    </section>
  );
}
