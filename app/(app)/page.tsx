import TechList from "@/components/TechList";
import Ilustracao from "@/components/Ilustracao";
import { Form } from "./form";
import React from "react";


export default function AuthPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen text-green-900 font-mono">
        {/* Conteúdo principal */}
        <main className="flex items-center justify-center flex-col w-full h-ful bg-[#F1EDE7]">
          {/* Conteúdo */}
          <div className="flex flex-col items-center justify-center p-20 w-full bg-[#1F2E24]">
            {/* Cabeçalho */}
            <div className="mb-8">
              <h1 className="text-5xl font-semibold text-lime-400">
                Gestão Inteligente
              </h1>
              <h2 className="text-5xl text-lime-400">na sua platação</h2>
              <p className="text-center text-xl font-mono text-green-300 mt-2">
                O AGRO DO FUTURO COMEÇA AQUI
              </p>
            </div>

            {/* Sobre */}
            <div className="text-left max-w-2xl mb-8">
              <h3 className="text-3xl font-semibold text-lime-400">
                Sobre o AgroTech
              </h3>
              <p className="text-green-100 text-xl mt-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Libero, ex.
              </p>
            </div>
            
            {/* Tecnologias */}
            <TechList/>

            {/* Ilustração do sistema */}
            <Ilustracao/>

          </div>
          
          <Form />

          {/* Funcionalidades */}
          <div className=" justify-center w-full bg-[#1F2E24] p-10">
            <div className="flex justify-center">
              
            </div>
            <div className="flex justify-center">
              <div className="flex gap-8 max-w-6xl w-full">
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
                    <p className="text-green-100 text-xl mt-4">{item.desc}</p>
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
