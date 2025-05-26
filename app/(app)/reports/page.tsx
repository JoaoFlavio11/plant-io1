import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ReportClient from "@/components/ReportClient";

export default function Reports() {
  return (
    <div className="flex flex-col min-h-screen text-gray-500 font-mono">
      <Navbar />

      <main className="flex-grow">
        <section className="w-full py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-emerald-800">
                Relatórios
              </h2>
              <p className="text-lg text-gray-600 mt-4">
                Veja os dados coletados pelos sensores e faça o download dos relatórios.
              </p>
            </div>

            <ReportClient />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
