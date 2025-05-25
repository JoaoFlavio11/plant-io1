'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaMicrochip, FaDatabase  } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiExpress,
  SiTypescript,
  SiFirebase,
  SiTailwindcss,
  SiArduino,
} from 'react-icons/si';

const tecnologias = [
  {
    nome: 'Typescript',
    Icone: SiTypescript,
    cor: 'text-blue-600',
    descricao: 'Linguagem baseada em JavaScript com tipagem estática, que melhora a escalabilidade e confiabilidade do código.',
  },
  {
    nome: 'Tailwind CSS',
    Icone: SiTailwindcss,
    cor: 'text-blue-400',
    descricao: 'Framework de CSS utilitário que permite construir interfaces modernas e responsivas com agilidade.',
  },
  {
    nome: 'Node.js',
    Icone: FaNodeJs,
    cor: 'text-green-600',
    descricao: 'Ambiente de execução para JavaScript no lado do servidor, ideal para aplicações rápidas e escaláveis.',
  },
  {
    nome: 'Express',
    Icone: SiExpress,
    cor: 'text-gray-400',
    descricao: 'Framework web minimalista para Node.js, usado na criação de APIs e aplicações web robustas.',
  },
  {
    nome: 'React',
    Icone: FaReact,
    cor: 'text-blue-500',
    descricao: 'Biblioteca JavaScript declarativa para construção de interfaces de usuário interativas e reutilizáveis.',
  },
  {
    nome: 'Next.js',
    Icone: SiNextdotjs,
    cor: 'text-gray-400',
    descricao: 'Framework React para aplicações full-stack, com renderização híbrida e roteamento baseado em arquivos.',
  },
  {
    nome: 'Firebase',
    Icone: SiFirebase,
    cor: 'text-yellow-500',
    descricao: 'Plataforma da Google com serviços como autenticação, hospedagem, notificações e banco de dados em tempo real.',
  },
  {
    nome: 'Firestore Database',
    Icone: FaDatabase,
    cor: 'text-yellow-400',
    descricao: 'Banco de dados NoSQL escalável do Firebase, utilizado para armazenar e sincronizar dados em tempo real.',
  },
  {
    nome: 'ESP3366 Wemos',
    Icone: SiArduino,
    cor: 'text-red-600',
    descricao: 'Plataforma open-source para prototipagem eletrônica, utilizada no controle de hardware e sensores.',
  },
  {
    nome: 'Sensores',
    Icone: FaMicrochip,
    cor: 'text-blue-700',
    descricao: 'Dispositivos responsáveis pela coleta de dados físicos como temperatura, umidade, ou luminosidade.',
  },
];


const TechList = () => {
  const [visibleItems, setVisibleItems] = useState(2);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleItems((prev) => Math.min(prev + 1, tecnologias.length));
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-7xl px-4 pt-20">
      <h3 className="text-left text-3xl font-semibold text-lime-400 mb-10">
        Tecnologias integradas ao sistema:
      </h3>

      <div className="relative flex flex-col items-center">

        {/* Linha central da timeline */}
        <div className="absolute w-1 bg-lime-500 h-full left-1/2 transform -translate-x-1/2 rounded-full" />

        <div className="w-full space-y-12">
          {tecnologias.slice(0, visibleItems).map(({ nome, Icone, cor, descricao }, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={nome}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className={`relative w-full flex ${
                  isLeft ? 'justify-start pr-4' : 'justify-end pl-4'
                }`}
              >
                <div className="bg-zinc-800 p-5 rounded-xl shadow-lg w-full max-w-xl z-10">
                  <div className="flex items-center gap-3">
                    <Icone className={`${cor} text-4xl`} />
                    <h4 className="text-xl text-green-100 font-semibold">{nome}</h4>
                  </div>
                  <p className="mt-2 text-md text-gray-300">{descricao}</p>
                </div>

                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-lime-500 rounded-full border-4 border-[#1F2E24]" />
              </motion.div>

            );
          })}
          <div ref={loadMoreRef} className="h-16" />
        </div>
      </div>
    </div>
  );
};

export default TechList;
