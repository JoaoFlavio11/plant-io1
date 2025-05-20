'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Dashboard', path: '/pages/dashboard' },
  { name: 'Componentes', path: '/pages/sensors' },
  { name: 'Relatórios', path: '/pages/reports' },
  { name: 'Planos', path: '/pages/planos' },
];

const Navbar = () => {
  const pathname = usePathname();


  return (
    <div>
      {/* Navbar */}
      <nav
        className={`w-full bg-[#1F2E24] text-white flex items-center justify-between px-6 py-4 fixed top-0 z-20`}
      >
        <Link href="/">
          <h2 className="text-xl font-bold font-mono cursor-pointer">
            Agro<span className="text-lime-400">Tech</span>
          </h2>
        </Link>

        <div className="flex gap-4">
          {links.map((link, index) => {
            const isActive = link.path === pathname;
            return (
              <Link
                key={index}
                href={link.path}
                className={` font-bold hover:text-lime-600 cursor-pointer text-base transition-all capitalize${
                  isActive ? 'text-accent border-b-2 border-lime-600' : ''
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
