// Footer.tsx

"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1F2E24] text-white py-6 shadow-2xl">
        <p className="w-full text-lg text-center px-4">
          Um sistema <span className="font-mono text-lime-600">SCADA</span> focado em
           Agricultura de Precisão e
           IoT.
        </p>
        <div className="mt-4 text-sm text-center text-neutral-400">
          &copy; {new Date().getFullYear()} AgroTech Services. Todos os direitos reservados.
        </div>
      </footer>
  );
};

export default Footer;