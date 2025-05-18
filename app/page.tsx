 'use client';
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";


export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-800 text-green-900 font-mono">

      {/* Navbar */}
      

      {/* Conteúdo principal */}
      <main className="flex items-center justify-center flex-col w-full h-ful bg-[#F1EDE7]">

        {/* Conteúdo */}
        <div className="flex flex-col items-center justify-center p-30 w-full bg-green-900">
          
          {/* Cabeçalho */}
          <div className="mb-8">
            <h1 className="text-5xl font-semibold text-lime-400">Gestão Inteligente</h1>
            <h2 className="text-5xl text-lime-400">na sua platação</h2>
            <p className="text-center text-xl font-mono text-green-300 mt-2">O AGRO DO FUTURO COMEÇA AQUI</p>
          </div>
          

          {/* Sobre */}
          <div className="text-left max-w-2xl mb-8">
            <h3 className="text-3xl font-semibold text-lime-400">Sobre o AgroTech</h3>
            <p className="text-green-100 text-xl mt-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, ex.
            </p>
          </div>

        </div>


        {/* login/register */}
        <div className="relative flex flex-row items-center justify-center w-full max-w-6xl gap-8 px-4 bg-[#F1EDE7] rounded-2xl p-6 overflow-hidden min-h-[500px] transition-all duration-500 ease-in-out">
          
          {/* CONTEÚDO - ORDEM DEPENDENDO DO ESTADO */}
          {isRegistering ? (
            <>
              {/* IMAGEM à ESQUERDA */}
              <motion.div
                key="image-left"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.3 }}
                className="hidden md:block w-1/2"
              >
                <Image
                  src="/images/AgroTechLogo.png"
                  alt="Imagem Registro"
                  height={600}
                  width={600}
                  className="rounded-xl"
                />
              </motion.div>

              {/* FORMULÁRIO à DIREITA */}
              <motion.div
                key="form-register"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.3 }}
                className="w-full md:w-1/2 px-8 md:px-16 bg-[#F1EDE7] rounded-2xl p-5"
              >
                <h2 className="font-bold text-2xl text-lime">Register</h2>
                <p className="text-0.8xl mt-4 text-gray-900 font-medium">Crie sua conta:</p>
                <form className="flex flex-col gap-4 mt-8">
                  <input type="text" placeholder="Nome:" className="p-2 rounded-xl text-lime-800 font-bold" />
                  <input type="email" placeholder="Email:" className="p-2 rounded-xl border text-lime-800 font-bold" />
                  <input type="password" placeholder="Senha:" className="p-2 rounded-xl border text-lime-800 font-bold" />
                  <button className="bg-green-900 w-full rounded-xl text-white py-2 hover:scale-105 duration-300">
                    Criar conta
                  </button>
                </form>
                <div className="mt-5 text-0.5xl flex justify-between items-center text-green-900 font-medium">
                  <p>Já tem cadastro? Faça login</p>
                  <button
                    className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
                    onClick={() => setIsRegistering(false)}
                  >
                    Login
                  </button>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              {/* FORMULÁRIO à ESQUERDA */}
              <motion.div
                key="form-login"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.3 }}
                className="w-full md:w-1/2 px-8 md:px-16 bg-[#F1EDE7] rounded-2xl p-5"
              >
                <h2 className="font-bold text-2xl text-lime">Login</h2>
                <p className="text-0.8xl mt-4 text-gray-900 font-medium">
                 Faça login para continuar
                </p>
                <form className="flex flex-col gap-4 mt-8">
                  <input type="email" placeholder="Email:" className="p-2 rounded-xl border text-lime-800 font-bold" />
                  <input type="password" placeholder="Senha:" className="p-2 rounded-xl border text-lime-800 font-bold" />
                  <button className="bg-green-900 w-full rounded-xl text-white py-2 hover:scale-105 duration-300">
                    Login
                  </button>
                </form>
                <div className="mt-5 text-0.5xl flex justify-between items-center text-green-900 font-medium">
                  <p>Não tem conta? Registre-se</p>
                  <button
                    className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
                    onClick={() => setIsRegistering(true)}
                  >
                    Crie sua conta
                  </button>
                </div>
              </motion.div>

              {/* IMAGEM à DIREITA */}
              <motion.div
                key="image-right"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.3 }}
                className="hidden md:block w-1/2"
              >
                <Image
                  src="/images/AgroTechLogo.png"
                  alt="Imagem Login"
                  height={600}
                  width={600}
                  className="rounded-xl"
                />
              </motion.div>
            </>
          )}
        </div>
        
        {/* Funcionalidades */}
        <div className="flex justify-center w-full bg-green-900 p-10">
          <div className="flex gap-8 max-w-6xl w-full">

            {/* Sensores */}
            <div className="flex-1 min-w-[250px] p-6 rounded-lg transition-all duration-500 ease-in-out hover:scale-[1.05]">
              <h1 className="text-3xl font-semibold text-lime-400">Sensores</h1>
              <p className="text-green-100 text-xl mt-4">
                Monitore a umidade do solo, temperatura e luminosidade em tempo real.
              </p>
            </div>

            {/* Irrigação */}
            <div className="flex-1 min-w-[250px] p-6 rounded-lg transition-all duration-500 ease-in-out hover:scale-[1.05]">
              <h1 className="text-3xl font-semibold text-lime-400">Irrigação</h1>
              <p className="text-green-100 text-xl mt-4">
                Controle a irrigação de forma automatizada e eficiente.
              </p>
            </div>

            {/* Supervisão */}
            <div className="flex-1 min-w-[250px] p-6 rounded-lg transition-all duration-500 ease-in-out hover:scale-[1.05]">
              <h1 className="text-3xl font-semibold text-lime-400">Supervisão</h1>
              <p className="text-green-100 text-xl mt-4">
                Acompanhe o funcionamento do sistema com dados coletados dos sensores em tempo real.
              </p>
            </div>

            {/* Relatórios */}
            <div className="flex-1 min-w-[250px] p-6 rounded-lg transition-all duration-500 ease-in-out hover:scale-[1.05]">
              <h1 className="text-3xl font-semibold text-lime-400">Relatórios</h1>
              <p className="text-green-100 text-xl mt-4">
                Acompanhe o desempenho do sistema e faça ajustes conforme necessário.
              </p>
            </div>

          </div>
        </div>

        
        

      </main>
      
    </div>
  );
}
