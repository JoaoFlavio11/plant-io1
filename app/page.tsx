"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-800 text-lime-400">
      {/* Navbar */}
      <nav className="w-full bg-neutral-900 text-white shadow-md flex items-center justify-between px-6 py-4 fixed top-0 z-20">
        <Link href="/">
          <h2 className="text-xl font-bold font-mono cursor-pointer">Agro<span className="text-lime-400">Tech</span></h2>
        </Link>

        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Menu"
        >
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul className="hidden md:flex gap-6 text-sm">
          <li>
            <Link href="/dashboard" className="hover:text-lime-400 transition-colors duration-200">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/sensors" className="hover:text-lime-400 transition-colors duration-200">
              Sensors
            </Link>
          </li>
          <li>
            <Link href="/reports" className="hover:text-lime-400 transition-colors duration-200">
              Reports
            </Link>
          </li>
          <li>
            <Link href="/settings" className="hover:text-lime-400 transition-colors duration-200">
              Settings
            </Link>
          </li>
          {/* <li><Link href="/teste">Teste</Link></li> */}
        </ul>
      </nav>


      {/* Conteúdo principal */}
      <main className="flex-grow flex flex-col items-center justify-center p-24 pt-32 pl-4">
      <h1 className="text-4xl font-bold text-left bg-neutral-900 p-6 shadow-2xl font-mono rounded-4xl w-0.5 leading-snug">
        <span className="block">Welcome</span>
        <span className="block">to</span>
        <span className="block text-lime-400">AgroTech</span>
      </h1>

      </main>

      {/* Rodapé */}
      <footer className="w-full bg-neutral-900 text-white py-6 shadow-2xl">
        <p className="w-full text-lg text-center px-4">
          The best <span className="font-mono text-lime-400">SCADA</span> system for your plants.
        </p>
        <div className="mt-4 text-sm text-center text-neutral-400">
          &copy; {new Date().getFullYear()} AgroTech Services. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
