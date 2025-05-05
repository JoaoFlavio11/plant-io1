'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const sensores = [
  {
    id: 'dht11',
    title: 'Sensor de Temperatura e Umidade DHT11',
    description:
      'Sensor digital que fornece medições de temperatura e umidade, amplamente utilizado em sistemas de monitoramento ambiental.',
    imageUrl: '/images/dht11.png',
  },
  {
    id: 'hl69',
    title: 'Sensor de Umidade de Solo HL-69',
    description:
      'Sensor analógico utilizado para detectar a umidade no solo, fundamental para controle automático de irrigação.',
    imageUrl: '/images/HL69.png',
  },
  {
    id: 'bombaDagua',
    title: "Bomba d'água submersa 120L/hr",
    description:
      'Bomba submersa de 120L/hr, ideal para irrigação automática em pequenos sistemas de cultivo.',
    imageUrl: '/images/bomba.jpg',
  },
  {
    id: 'rele',
    title: 'Módulo Relé - 4 canais - 5V/10a',
    description:
      "Módulo relé de 4 canais, utilizado para controlar dispositivos elétricos, como bombas d'água, com segurança e eficiência.",
    imageUrl: '/images/rele.jpg',
  },
  {
    id: 'esp32',
    title: 'ESP32 - Módulo Wi-Fi e Bluetooth',
    description:
      'Microcontrolador com conectividade Wi-Fi e Bluetooth, ideal para projetos de IoT e automação residencial.',
    imageUrl: '/images/esp32.jpg',
  },
  {
    id:'gasMQ135',
    title: 'Sensor de Gás MQ135',
    description:
      'Sensor de gás MQ135, utilizado para detectar a presença de gases nocivos no ambiente, como amônia e benzeno.',
    imageUrl: '/images/mq135.jpg',
  }
];

const SensorCard = ({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
}) => (
  <motion.div
    initial={{ opacity: 0.8, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="keen-slider__slide flex justify-center"
  >
    <div className="sensor-card bg-neutral-900 p-12 rounded-3xl w-[66vw] md:w-[50vw] max-w-9xl shadow-2xl transition-transform duration-500 ease-in-out hover:scale-[1.01] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="relative w-full md:w-40 h-40 bg-black/20 rounded-xl overflow-hidden">
          <Image src={imageUrl} alt={title} fill className="object-contain" />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-lime-400 font-mono mb-2">
            {title}
          </h2>
          <p className="text-zinc-300 text-xl leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function SensorsClient() {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free',
    rubberband: false,
    slides: {
      perView: 1.7,
      spacing: 30,
      origin: 'center',
    },
    dragSpeed: 0.60,
    // Custom animation can be implemented using Keen Slider hooks if needed
    created(sliderInstance) {
      const move = () => {
        sliderInstance.next();
        timer.current = setTimeout(move, 8000);
      };
      move();
    },
  });

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-800 text-lime-400 font-mono">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-16">
          Componentes do Sistema de Irrigação Inteligente
        </h1>

        <div className="relative w-full overflow-visible">
          <div ref={sliderRef} className="keen-slider w-full">
            {sensores.map((sensor) => (
              <SensorCard
                key={sensor.id}
                title={sensor.title}
                description={sensor.description}
                imageUrl={sensor.imageUrl}
              />
            ))}
          </div>

          {/* Botões de navegação */}
          <button
            onClick={() => slider.current?.prev()}
            className="absolute top left-4 -translate-y-1/2 hover:bg-lime-500/90 text-white p-3 rounded-full shadow-xl transition-all z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => slider.current?.next()}
            className="absolute top right-4 -translate-y-1/2 hover:bg-lime-500/90 text-white p-3 rounded-full shadow-xl transition-all z-20"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
