'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';


const componentesAtuais = [
  // 🔍 Sensores
  {
    id: 'dht11',
    title: 'Sensor DHT11',
    description: 'Sensor digital básico para medição de temperatura e umidade.',
    imageUrl: '/images/dht11.png',
    type: 'installed',
  },
  {
    id: 'hl69',
    title: 'Sensor de Umidade HL-69',
    description: 'Sensor resistivo para detecção de umidade no solo.',
    imageUrl: '/images/HL69.png',
    type: 'installed',
  },
  {
    id: 'mq135',
    title: 'Sensor de Gás MQ135',
    description: 'Sensor para detecção de gases tóxicos e qualidade do ar.',
    imageUrl: '/images/mq135.jpg',
    type: 'installed',
  },
  {
    id: 'sensor de luz',
    title: 'Sensor de Luz',
    description: 'Sensor para detecção de luz ambiente.',
    imageUrl: '/images/sensorluz.jpg',
    type: 'installed',
  },

  // ⚙️ Atuadores
  {
    id: 'bombaDagua',
    title: "Bomba d'água 120L/h",
    description: 'Mini bomba para sistemas de irrigação em pequena escala.',
    imageUrl: '/images/bomba.jpg',
    type: 'installed',
  },
  {
    id: 'rele',
    title: 'Módulo Relé 4 canais',
    description: 'Permite controle de dispositivos de maior corrente com isolamento.',
    imageUrl: '/images/rele.jpg',
    type: 'installed',
  },
  {
    id: 'cooler',
    title: 'Fan 12V',
    description: 'Ventilador de 12V para resfriamento.',
    imageUrl: '/images/fan.jpg',
    type: 'installed',
  },

  // 🔋 Fontes de Energia e Carregamento
  {
    id: 'fonte',
    title: 'Fonte 12V 2A',
    description: 'Fonte de alimentação para dispositivos de 12V.',
    imageUrl: '/images/fonte12v.jpg',
    type: 'installed',
  },
  {
    id: 'bateria',
    title: 'Bateria de lítio',
    description: 'Baterias para armazenamento de energia.',
    imageUrl: '/images/baterias.jpg',
    type: 'installed',
  },
  {
    id: 'painel solar',
    title: 'Painel Solar 6V 2W',
    description: 'Painel solar para carregamento de baterias.',
    imageUrl: '/images/solar.jpg',
    type: 'installed',
  },
  {
    id: 'carregador',
    title: 'Carregador de Baterias',
    description: 'Carregador das baterias do sistema.',
    imageUrl: '/images/carga.jpg',
    type: 'installed',
  },
  {
    id: 'indicador',
    title: 'Indicador da Bateria',
    description: 'Indicador de carga da bateria.',
    imageUrl: '/images/bat.jpg',
    type: 'installed',
  },
  {
    id: 'regulador de tensão',
    title: 'Regulador de Tensão',
    description: 'Regulador de tensão para estabilização de 5V.',
    imageUrl: '/images/regulador.jpg',
    type: 'installed',
  },

  // 🧠 Módulos Eletrônicos e Controle
  {
    id: 'esp32',
    title: 'ESP32 Wemos',
    description: 'Microcontrolador com conectividade avançada para aplicações IoT.',
    imageUrl: '/images/esp32.jpg',
    type: 'installed',
  },
  {
    id: 'relogio',
    title: 'Módulo RTC DS3231',
    description: 'Módulo de relógio em tempo real para rastreamento de tempo.',
    imageUrl: '/images/relogio.jpg',
    type: 'installed',
  },

  // 🖥️ Interface e Monitoramento
  {
    id: 'display LCD',
    title: 'Display LCD',
    description: 'Display LCD para exibição de informações.',
    imageUrl: '/images/display.jpg',
    type: 'installed',
  },
];


const sugestoesUpgrade = [
  {
    id: 'bme280',
    title: 'Sensor BME280',
    description: 'Sensor com maior precisão e suporte a pressão atmosférica.',
    imageUrl: '/images/bme280.jpg',
    type: 'upgrade',
  },
  {
    id: 'capacitivo-soil',
    title: 'Sensor de Umidade Capacitivo',
    description: 'Alternativa mais precisa e durável ao HL-69.',
    imageUrl: '/images/capacitivo.jpg',
    type: 'upgrade',
  },
  {
    id: 'esp32S2',
    title: 'ESP32-S2',
    description: 'Versão com mais GPIOs, USB nativo e segurança reforçada.',
    imageUrl: '/images/esp32s2.jpg',
    type: 'upgrade',
  },
];

const todosComponentes = [...componentesAtuais, ...sugestoesUpgrade];

function ComponentItem({
  title,
  description,
  imageUrl,
  destaque = false,
  filter,
}: {
  title: string;
  description: string;
  imageUrl: string;
  destaque?: boolean;
  filter: 'installed' | 'upgrade';
}) {
  const bgColor =
    filter === 'installed'
      ? 'bg-emerald-50 border-emerald-200'
      : 'bg-yellow-50 border-yellow-200';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center text-center gap-4 border rounded-xl p-6 shadow-sm hover:shadow-md transition ${bgColor}`}
    >
      <div className="relative w-24 h-24">
        <Image src={imageUrl} alt={title} fill className="object-contain" />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </motion.div>
  );
}

export default function SystemComponentList() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'installed' | 'upgrade'>('installed');

  const componentesFiltrados = useMemo(() => {
    return todosComponentes.filter((comp) => {
      const matchFilter = comp.type === filter;
      const matchSearch = comp.title.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [search, filter]);

  return (
    <div className="space-y-10">
      {/* Filtros */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Buscar componente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('installed')}
            className={`px-4 py-2 rounded-md ${
              filter === 'installed'
                ? 'bg-emerald-700 text-white'
                : 'bg-white border border-gray-300'
            }`}
          >
            Instalados
          </button>
          <button
            onClick={() => setFilter('upgrade')}
            className={`px-4 py-2 rounded-md ${
              filter === 'upgrade'
                ? 'bg-emerald-700 text-white'
                : 'bg-white border border-gray-300'
            }`}
          >
            Upgrade
          </button>
        </div>
      </div>

      {/* Lista */}
      {componentesFiltrados.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhum componente encontrado.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {componentesFiltrados.map((c) => (
            <ComponentItem
              key={c.id}
              title={c.title}
              description={c.description}
              imageUrl={c.imageUrl}
              destaque={c.type === 'upgrade'}
              filter={filter}
            />
          ))}
        </div>
      )}
    </div>
  );
}
