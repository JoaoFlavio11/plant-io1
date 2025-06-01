// Navbar.tsx
"use client";

import { logout } from "@/hooks/useAuth";
import { auth } from "@/services/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Componentes", path: "/sensors" },
  { name: "Relatórios", path: "/reports" },
  { name: "Planos", path: "/planos" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user ? user.email : null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".menu-profile")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="w-full bg-[#1F2E24] text-white font-mono flex items-center justify-between px-6 py-4 fixed top-0 z-20">
        <Link href="/">
          <h2 className="text-xl font-bold font-mono cursor-pointer">
            Agro<span className="text-lime-400">Tech</span>
          </h2>
        </Link>

        <div className="flex gap-4 items-center">
          {links.map((link, index) => {
            const isActive = link.path === pathname;
            return (
              <Link
                key={index}
                href={link.path}
                className={`font-bold hover:text-lime-600 cursor-pointer text-base transition-all capitalize ${
                  isActive ? "text-lime-400 border-b-2 border-lime-600" : ""
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {userEmail && (
            <div className="relative ml-6 menu-profile">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-lime-400 text-black hover:bg-lime-500"
              >
                <span className="text-lg font-bold">
                  {userEmail.charAt(0).toUpperCase()}
                </span>
              </button>

              {isMenuOpen && (
                <div className="absolute font-semibold right-0 mt-2 w-56 bg-white rounded-xl shadow-xl z-50 border border-gray-200">
                  <div className="px-4 py-3">
                    <p className="text-sm text-gray-500">Logado como:</p>
                    <p className="text-sm font-semibold text-gray-900 break-words">{userEmail}</p>
                  </div>
                  <div className="border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="w-full text-center font-bold px-4 py-3 text-sm text-red-600 bg-gray-200 hover:bg-gray-400 rounded-b-xl transition"
                    >
                      Sair da conta
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
 