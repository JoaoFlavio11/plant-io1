"use client";

import { login, register } from "@/hooks/useAuth";
import { auth } from "@/services/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export function Form() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (error) {
      const err = error as Error;
      alert("Erro ao fazer login. Verifique suas credenciais." + err.message);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password);
      router.push("/planos");
    } catch (error) {
      const err = error as Error;
      alert("Erro ao criar conta. Verifique suas credenciais." + err.message);
    }
  };

  return (
    <>
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
              <h2 className="font-bold text-2xl text-lime">Registre-se</h2>
              <p className="text-0.8xl mt-4 text-gray-900 font-medium">
                Crie sua conta:
              </p>
              <form
                className="flex flex-col gap-4 mt-8"
                onSubmit={handleRegister}
              >
                <input
                  type="email"
                  placeholder="Email:"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 rounded-xl border text-lime-800 font-bold required"
                />
                <input
                  type="password"
                  placeholder="Senha:"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 rounded-xl border text-lime-800 font-bold required"
                />
                <button
                  type="submit"
                  className="bg-green-900 w-full rounded-xl text-white py-2 hover:scale-105 duration-300"
                >
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
              <form className="flex flex-col gap-4 mt-8" onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email:"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 rounded-xl border text-lime-800 font-bold"
                />
                <input
                  type="password"
                  placeholder="Senha:"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 rounded-xl border text-lime-800 font-bold"
                />
                <button
                  type="submit"
                  className="bg-green-900 w-full rounded-xl text-white py-2 hover:scale-105 duration-300"
                >
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
    </>
  );
}
