// components/SensorList.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

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
      'Ideal para irrigação automática em pequenos sistemas de cultivo com excelente eficiência hidráulica.',
    imageUrl: '/images/bomba.jpg',
  },
  {
    id: 'rele',
    title: 'Módulo Relé - 4 canais - 5V/10a',
    description:
      "Permite o controle seguro de dispositivos elétricos como bombas, através de microcontroladores.",
    imageUrl: '/images/rele.jpg',
  },
  {
    id: 'esp32',
    title: 'ESP32 - Módulo Wi-Fi e Bluetooth',
    description:
      'Microcontrolador moderno para projetos conectados (IoT), com Wi-Fi e Bluetooth integrados.',
    imageUrl: '/images/esp32.jpg',
  },
  {
    id: 'gasMQ135',
    title: 'Sensor de Gás MQ135',
    description:
      'Detecta gases nocivos como amônia e benzeno, ideal para monitoramento da qualidade do ar.',
    imageUrl: '/images/mq135.jpg',
  },
];

export default function SensorsList() {
  return (
    <ul className="space-y-12">
      {sensores.map((sensor) => (
        <motion.li
          key={sensor.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white/80 border border-emerald-100 backdrop-blur-md rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-center gap-6 hover:shadow-lg transition"
        >
          <div className="relative w-full md:w-40 h-40 bg-white rounded-xl overflow-hidden">
            <Image
              src={sensor.imageUrl}
              alt={sensor.title}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#2F5D3A] mb-2">
              {sensor.title}
            </h3>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              {sensor.description}
            </p>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}

