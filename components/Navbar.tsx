"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { logout } from "@/hooks/useAuth";

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

  return (
    <div>
      {/* Navbar */}
      <nav className="w-full bg-[#1F2E24] text-white flex items-center justify-between px-6 py-4 fixed top-0 z-20">
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
                className={`font-bold hover:text-lime-600 cursor-pointer text-base transition-all capitalize ${
                  isActive ? "text-lime-400 border-b-2 border-lime-600" : ""
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {userEmail && (
            <div className="flex items-center gap-4 ml-6">
              <span className="text-sm text-lime-400">{userEmail}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-1 bg-red-600 rounded hover:bg-red-700 text-sm"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
