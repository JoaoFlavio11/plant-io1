'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
  }
];

export default function SensorsPage() {
  return (
    <div className="flex flex-col min-h-screen text-gray-800 font-mono">
      <Navbar />

      <main className="flex-grow ">
        {/* Ilustração do sistema */}
        <div className="pt-10 w-full bg-[#1F2E24]">
          <section className="mt-10 w-full py-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-lime-600  text-center mb-14">
                Planta do sistema de irrigação inteligente
              </h1>

              <div className="flex flex-col md:flex-row items-center gap-6 rounded-2xl p-6">
                {/* Imagem */}
                <div className="relative w-full md:w-110 h-70 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/diagrama2.png"
                    alt="Diagrama do sistema"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Texto */}
                <div className="flex-1 ">
                  <p className="font-semibold text-lg sm:text-xl text-white leading-relaxed">
                    Nosso sistema inteligente de irrigação utiliza sensores para medir a umidade do solo e controlar
                    automaticamente o fornecimento de água, otimizando recursos e promovendo a sustentabilidade.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>


        {/* Componentes */}
        <section className="mt-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 text-center mb-14">
              Componentes do Sistema
            </h2>

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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
