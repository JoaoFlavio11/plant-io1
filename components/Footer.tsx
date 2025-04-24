// Footer.tsx

"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-neutral-900 text-white py-6 shadow-2xl">
        <p className="w-full text-lg text-center px-4">
          The best <span className="font-mono text-lime-400">SCADA</span> system for your plants.
        </p>
        <div className="mt-4 text-sm text-center text-neutral-400">
          &copy; {new Date().getFullYear()} AgroTech Services. All rights reserved.
        </div>
      </footer>
  );
};

export default Footer;