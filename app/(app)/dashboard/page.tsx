// pages/dashboard/page.tsx
import Footer from '@/components/Footer';
import HortelaDash from '@/components/HortelaDash';
import PlantsChart from '@/components/PlantsChart';
import Navbar from '@/components/Navbar';

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen  text-lime-400">
      <Navbar />
      <main className="flex-grow mt-5">
        <HortelaDash />
        <div className="max-w-6xl align-middle mx-auto px-4">
          <h1 className="font-mono text-4xl font-bold text-left mt-8 text-emerald-800">
            Gráficos
          </h1>
          <h2 className=" text-2xl font-semibold mb-6 border-b border-emerald-500 pb-1 text-emerald-800">
          Temperatura e Umidade
          </h2>
          <PlantsChart />
        </div>
      </main>
      <Footer />
    </div>
  );
}
