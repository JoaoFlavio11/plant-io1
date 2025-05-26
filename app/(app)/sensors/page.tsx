// app/(app)/system/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import SystemComponentList from "@/components/SystemComponentList";

export const metadata: Metadata ={
  title: "Seus sensores",
  description: "Veja os sensores que você possui e sugestões de upgrade",
  openGraph: {
    title: "Seus sensores",
    description: "Veja os sensores que você possui e sugestões de upgrade",
    url: "/sensors",
    
  },
}

export default function SensorsPage() {
  return(
    <div className="flex flex-col min-h-screen text-gray-500 font-mono ">
      <Navbar />

      <main className="flex-grow">
        <section className="w-full py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-emerald-800">
                Gerenciamento dos componentes
              </h2>
              <p className="text-lg text-gray-600 mt-4">
                Visualize todos os sensores, atuadores e microcontroladores utilizados no seu sistema.
              </p>
            </div>

            <SystemComponentList />

          </div>
        </section>
      </main>

      <Footer />

    </div>
  );
}