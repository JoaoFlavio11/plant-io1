"use client";
import React from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-800 text-lime-400">
      
      {/* Navbar */}
      <Navbar />



      {/* Conteúdo principal */}
      <main 
        className="flex-grow flex flex-col items-center justify-center p-24 pt-32 pl-4"
      >
        <h1 
          className="text-4xl font-bold text-left bg-neutral-900 p-6 shadow-2xl font-mono rounded-4xl w-0.5 leading-snug"
        >
          <span className="block">Welcome</span>
          <span className="block">to</span>
          <span className="block text-lime-400">AgroTech</span>
        </h1>
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}
