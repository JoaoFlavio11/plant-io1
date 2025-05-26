import TechList from "@/components/TechList";
import Ilustracao from "@/components/Ilustracao";
import { Form } from "./form";
import React from "react";
import Image from "next/image";

export default function AuthPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen text-green-900 font-mono">
        {/* Conteúdo principal */}
        <main className="flex items-center justify-center flex-col w-full h-full bg-[#F1EDE7]">
          {/* Conteúdo */}
          <div className="flex flex-col items-center justify-center p-20 w-full bg-[#1F2E24]">

            {/* Cabeçalho */}
            <header className="w-full max-w-6xl mx-auto mb-20 text-left">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* Título e subtítulo */}
                <div className="flex-1 space-y-6">
                  <h1 className="text-6xl lg:text-7xl font-extrabold text-lime-400 leading-tight tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
                    Agro<span className="text-gray-500">Tech</span>
                  </h1>
                  <p className="text-2xl lg:text-3xl font-medium text-lime-200 drop-shadow-sm">
                    Solução inteligente para o futuro da agricultura
                  </p>
                  
                </div>

              </div>
            </header>

            {/* Sobre */}
            <div className="max-w-6xl mx-auto mb-16 flex flex-col lg:flex-row items-center p-2">
              {/* Texto */}
              <div className="lg:basis-1/2 text-left">
                <h3 className="text-4xl font-bold text-lime-400 mb-6 border-b border-lime-600 pb-2">
                  Sobre o nosso sistema
                </h3>
                <p className="text-green-100 text-lg leading-relaxed tracking-wide">
                  O <span className="font-bold text-lime-300">AgroTech</span> é um sistema inovador que integra sensores, atuadores e microcontroladores para otimizar a gestão de plantações.
                  Com ele, você pode <span className="text-lime-200 font-medium">monitorar em tempo real</span> as condições do solo e do ambiente,
                  <span className="text-lime-200 font-medium"> automatizar processos</span> de irrigação e supervisão,
                  e gerar <span className="text-lime-200 font-medium">relatórios detalhados</span> sobre o desempenho da sua plantação.
                  Tudo isso com uma interface <span className="italic text-green-200">amigável e acessível</span>.
                </p>
              </div>

              {/* Imagem */}
              <div className="lg:basis-1/2 flex justify-center">
                <Image
                  src="/images/logoAlt.png"
                  alt="Ilustração do sistema AgroTech"
                  width={300}
                  height={300}
                  className="transition-transform duration-500 ease-in-out hover:scale-105"
                />
              </div>
            </div>

            {/* Tecnologias */}
            <TechList />

            {/* Ilustração do sistema */}
            <Ilustracao />
          </div>

          <Form />

          {/* Funcionalidades */}
          <div className="justify-center w-full bg-[#1F2E24] p-10">
            <div className="flex justify-center">
              <div className="flex gap-8 max-w-6xl w-full flex-wrap justify-center">
                {[
                  {
                    title: "Sensores",
                    desc: "Monitore a umidade do solo, temperatura e luminosidade em tempo real.",
                  },
                  {
                    title: "Irrigação",
                    desc: "Controle a irrigação de forma automatizada e eficiente.",
                  },
                  {
                    title: "Supervisão",
                    desc: "Acompanhe o funcionamento do sistema com dados coletados dos sensores em tempo real.",
                  },
                  {
                    title: "Relatórios",
                    desc: "Acompanhe o desempenho do sistema e faça ajustes conforme necessário.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex-1 min-w-[250px] p-6 rounded-lg transition-all duration-500 ease-in-out hover:scale-[1.05]"
                  >
                    <h1 className="text-3xl font-semibold text-lime-400">
                      {item.title}
                    </h1>
                    <p className="leading-relaxed text-green-100 text-xl mt-4">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
