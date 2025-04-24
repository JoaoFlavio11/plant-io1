"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-neutral-800 text-lime-500">
      {/* Navbar */}
      <Navbar />

      <main className="flex flex-col items-center justify-center flex-grow px-6">
        <h1 className="text-6xl font-bold font-mono mb-4 shadow-lg">404</h1>
        <p className="text-2xl font-mono mb-8 text-center">
          Oops! Página não encontrada.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-lime-300 text-neutral-900 font-bold rounded-xl shadow-lg transition-transform hover:scale-105"
        >
          Voltar para o início
        </Link>
      </main>
      
      <Footer />
    </div>
  );
}
