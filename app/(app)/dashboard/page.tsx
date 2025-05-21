/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Footer from '@/components/Footer';
import HortelaDash from '@/components/HortelaDash';
import Navbar from '@/components/Navbar';
import { db } from '@/services/firebaseConfig';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

type SensorData = {
  temperatura: number;
  umidade: number;
  status: string;
  historico?: { timestamp: string; temperatura: number }[];
};

export default function DashboardPage() {
  const [dados, setDados] = useState<SensorData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sensoresRef = collection(db, 'sensores');
        const snapshot = await getDocs(sensoresRef);

        if (!snapshot.empty) {
          const firstDoc = snapshot.docs[0];
          const docRef = doc(db, 'sensores', firstDoc.id);

          // Agora sim: escuta em tempo real
          const unsub = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data() as SensorData;
              console.log('🔥 Dados recebidos do Firestore:', data);
              setDados(data);
            } else {
              console.warn('❌ Documento não encontrado!');
            }
          });

          return () => unsub();
        } else {
          console.warn('⚠️ Nenhum documento encontrado na coleção "sensores".');
        }
      } catch (error) {
        console.error('❌ Erro ao buscar dados do Firestore:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-lime-400">
      <Navbar />
      
      <HortelaDash/> 
       
         
      <Footer />
    </div>
  );
}
