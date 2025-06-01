"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";
import "@/app/globals.css";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#d1cbc2] flex flex-col justify-between text-lime-800">
      {/* Navbar */}
      <Navbar />

      <main className="flex flex-col items-center justify-center flex-grow px-6">
        <h1 className="text-6xl font-bold font-mono mb-4 shadow-lg">404</h1>
        <p className="text-2xl font-mono mb-8 text-center">
          Oops! Página não encontrada.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-lime-800 text-neutral-100 font-semibold rounded-xl shadow-lg transition-transform hover:scale-105"
        >
          Voltar para o início
        </Link>
      </main>
      
      <Footer />
    </div>
  );
}
