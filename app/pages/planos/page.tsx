"use client";
import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function PlanosPage() {
  const [planoSelecionado, setPlanoSelecionado] = useState<string | null>(null);
  const [popupPosicao, setPopupPosicao] = useState<{ top: number; left: number } | null>(null);
  const [metodoPagamento, setMetodoPagamento] = useState<string>("Cartão de Crédito");
  const [bandeiraSelecionada, setBandeiraSelecionada] = useState<string | null>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const planos = [
    {
      nome: "Plano Básico",
      preco: "R$ 39,90/mês",
      descricao: "Sistema supervisório e suporte 24h.",
    },
    {
      nome: "Plano Intermediário",
      preco: "R$ 59,90/mês",
      descricao: "Toda a cobertura do plano básico + manutenção dos equipamentos.",
    },
    {
      nome: "Plano Premium",
      preco: "R$ 89,90/mês",
      descricao: "Suporte 24h do sistema e dos equipamentos + envio de componentes de reposição.",
    },
  ];

  const handleSelecionarPlano = (nome: string) => {
    if (planoSelecionado === nome) {
      setPlanoSelecionado(null);
      setPopupPosicao(null);
    } else {
      const rect = cardRefs.current[nome]?.getBoundingClientRect();
      if (rect) {
        setPopupPosicao({
          top: window.scrollY + rect.bottom + 10,
          left: rect.left,
        });
      }
      setPlanoSelecionado(nome);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (planoSelecionado) {
        const rect = cardRefs.current[planoSelecionado]?.getBoundingClientRect();
        if (rect) {
          setPopupPosicao({
            top: window.scrollY + rect.bottom + 10,
            left: rect.left,
          });
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [planoSelecionado]);

  return (
    <div className="flex flex-col min-h-screen text-gray-800 font-mono relative">
      <Navbar />

      <main className="flex-grow relative">
        <div className="planos bg-[#1F2E24] pt-20 p-6">
          <h1 className="text-3xl text-white font-bold text-center mb-10">Escolha seu plano</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
            {planos.map((plano) => (
              <div
                key={plano.nome}
                ref={(el) => (cardRefs.current[plano.nome] = el)}
                className={`rounded-2xl p-6 shadow-lg border-2 transition-all duration-500 ease-in-out hover:scale-[1.03] cursor-pointer ${
                  planoSelecionado === plano.nome
                    ? "border-green-500 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-green-300"
                }`}
                onClick={() => handleSelecionarPlano(plano.nome)}
              >
                <h2 className="text-xl font-semibold text-lime-950">{plano.nome}</h2>
                <p className="text-md mt-2">{plano.descricao}</p>
                <p className="text-lg font-bold mt-4 text-lime-900">{plano.preco}</p>
              </div>
            ))}
          </div>

          {/* Pop-up de pagamento */}
          {planoSelecionado && popupPosicao && (
            <div
              className="absolute z-50 bg-white shadow-2xl border border-gray-300 rounded-xl w-80 max-h-[50vh] p-4"
              style={{ top: popupPosicao.top, left: popupPosicao.left }}
            >
              <h3 className="text-lg font-semibold mb-2">Pagamento - {planoSelecionado}</h3>
              <form className="flex flex-col gap-4 overflow-y-auto max-h-[38vh] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <select
                  value={metodoPagamento}
                  onChange={(e) => setMetodoPagamento(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2"
                >
                  <option>Cartão de Crédito</option>
                  <option>Pix</option>
                  <option>Boleto Bancário</option>
                </select>

                <input
                  type="text"
                  placeholder="Nome completo"
                  className="border border-gray-300 rounded px-3 py-2 font-bold"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 rounded px-3 py-2 font-bold"
                />
                <input
                  type="text"
                  placeholder="CPF"
                  className="border border-gray-300 rounded px-3 py-2 font-bold"
                />

                {metodoPagamento === "Cartão de Crédito" && (
                  <>
                    
                    <div className="flex gap-4 justify-center items-center">
                      {["visa", "paypal", "american"].map((bandeira) => (
                        <Image
                          key={bandeira}
                          src={`/bandeiras/${bandeira}.svg`}
                          alt={bandeira}
                          width={48}
                          height={32}
                          className={`w-15 h-10 cursor-pointer rounded ${
                            bandeiraSelecionada === bandeira
                              ? "border-green-500"
                              : "border-gray-300"
                          }`}
                          onClick={() => setBandeiraSelecionada(bandeira)}
                        />
                      ))}
                    </div>

                    <input
                      type="text"
                      placeholder="Número do cartão"
                      className="border border-gray-300 rounded px-3 py-2 font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Nome no cartão"
                      className="border border-gray-300 rounded px-3 py-2 font-bold"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="border border-gray-300 rounded px-3 py-2 font-bold"
                    />
                  </>
                )}

                {metodoPagamento === "Pix" && (
                  <div className="flex justify-center items-center mt-2">
                    <Image
                      src="/images/qr_code.png"
                      alt="QR Code do Pix"
                      width={200}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-[#1F2E24] text-white px-4 py-2 rounded hover:bg-lime-900 font-semibold"
                >
                  Confirmar Assinatura
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPlanoSelecionado(null);
                    setPopupPosicao(null);
                    setBandeiraSelecionada(null);
                  }}
                  className="text-md text-gray-800 hover:underline mt-2"
                >
                  Cancelar
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
