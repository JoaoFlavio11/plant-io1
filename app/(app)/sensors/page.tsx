// app/(app)/sensors/page.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SensorsList from '@/components/SensorList'; 
import Image from 'next/image';

export default function SensorsPage() {
  return (
    <div className="flex flex-col min-h-screen text-gray-800 font-mono">
      <Navbar />

      <main className="flex-grow">
        {/* Ilustração do sistema */}
        <div className="pt-10 w-full bg-[#1F2E24]">
          <section className="mt-10 w-full py-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-lime-600 text-center mb-14">
                Planta do sistema de irrigação inteligente
              </h1>

              <div className="flex flex-col md:flex-row items-center gap-6 rounded-2xl p-6">
                <div className="relative w-full md:w-110 h-70 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/diagrama2.png"
                    alt="Diagrama do sistema"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-lg sm:text-xl text-white leading-relaxed">
                    Nosso sistema inteligente de irrigação utiliza sensores para medir a umidade do solo e controlar
                    automaticamente o fornecimento de água, otimizando recursos e promovendo a sustentabilidade.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Componentes */}
        <section className="mt-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 text-center mb-14">
              Componentes do Sistema
            </h2>

            <SensorsList />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
 