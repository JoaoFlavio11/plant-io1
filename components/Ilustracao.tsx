import Image from "next/image";

const Ilustracao = () => {
  return (
    <section className="w-full p-10 mt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-3xl font-bold text-lime-400 text-left mb-14 font-mono">
          Ilustração de um sistema de irrigação inteligente:
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-10 rounded-2xl">
          {/* Imagem */}
          <div className="relative w-full md:w-[550px] h-[350px] rounded-2xl overflow-hidden">
            <Image
              src="/images/diagrama2.png"
              alt="Diagrama do sistema"
              fill
              className="object-contain"
            />
          </div>

          {/* Descrição */}
          <div className="flex-1">
            <p className="font-mono font-semibold text-md sm:text-xl text-green-100 leading-relaxed">
              Nosso sistema inteligente de irrigação utiliza sensores para
              medir a umidade do solo e controlar automaticamente o fornecimento
              de água. Dessa forma, é possível otimizar os recursos hídricos e
              promover práticas agrícolas mais sustentáveis e eficientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ilustracao;
