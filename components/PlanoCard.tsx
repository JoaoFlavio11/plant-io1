import { CheckCircle } from "lucide-react";
import React from "react";

interface PlanoCardProps {
  nome: string;
  preco: string;
  descricao: string;
  selecionado: boolean;
  onSelect: () => void;
}

export default function PlanoCard({
  nome,
  preco,
  descricao,
  selecionado,
  onSelect,
}: PlanoCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`relative rounded-2xl p-6 shadow-lg transition-all duration-500 ease-in-out hover:scale-[1.03] cursor-pointer ${
        selecionado
          ? "border-2 border-green-500 bg-[#d1cbc2]"
          : "bg-[#d1cbc2] hover:border-green-300"
      }`}
    >
      {selecionado && (
        <CheckCircle className="absolute top-3 right-3 text-green-600" size={24} />
      )}
      <h2 className="text-xl font-semibold text-lime-950">{nome}</h2>
      <p className="text-md mt-2">{descricao}</p>
      <p className="text-lg font-bold mt-4 text-lime-900">{preco}</p>
    </div>
  );
}
