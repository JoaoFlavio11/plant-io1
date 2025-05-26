"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlanoCard from "@/components/PlanoCard";
import FormPagamento from "@/components/FormPagamento";

export default function PlanosPage() {
  const [planoSelecionado, setPlanoSelecionado] = useState<string | null>(null);
  const [metodoPagamento, setMetodoPagamento] = useState<string>("Cartão de Crédito");
  const [bandeiraSelecionada, setBandeiraSelecionada] = useState<string | null>(null);

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
      descricao:
        "Suporte 24h do sistema e dos equipamentos + envio de componentes de reposição e instalação.",
    },
  ];

  const handleSelecionarPlano = (nome: string) => {
    if (planoSelecionado === nome) {
      setPlanoSelecionado(null);
    } else {
      setPlanoSelecionado(nome);
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-gray-800 font-mono">
      <Navbar />

      <main className="flex-grow">
        <div className="planos pt-24 p-6">
          <h1 className="text-3xl text-emerald-800 font-bold text-center mb-10">
            Escolha seu plano
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {planos.map((plano) => (
              <PlanoCard
                key={plano.nome}
                nome={plano.nome}
                preco={plano.preco}
                descricao={plano.descricao}
                selecionado={planoSelecionado === plano.nome}
                onSelect={() => handleSelecionarPlano(plano.nome)}
              />
            ))}
          </div>

          {planoSelecionado && (
            <FormPagamento
              planoSelecionado={planoSelecionado}
              metodoPagamento={metodoPagamento}
              setMetodoPagamento={setMetodoPagamento}
              bandeiraSelecionada={bandeiraSelecionada}
              setBandeiraSelecionada={setBandeiraSelecionada}
              onCancel={() => {
                setPlanoSelecionado(null);
                setBandeiraSelecionada(null);
              }}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
