// app/page.jsx (ou pages/index.jsx, dependendo do seu Next.js)

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100 font-sans">
      <div className="relative flex flex-col items-center text-center p-6">
        {/* coração */}
        <div className="relative w-64 h-56">
          <div className="absolute top-0 left-8 w-32 h-32 bg-pink-500 rounded-full"></div>
          <div className="absolute top-0 right-8 w-32 h-32 bg-pink-500 rounded-full"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-pink-500 transform rotate-45 origin-bottom"></div>

          {/* mensagem dentro */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <h1 className="text-white text-2xl font-bold drop-shadow-md">
              💖 Lethicia 💖
            </h1>
            <p className="text-white mt-2 text-sm leading-relaxed drop-shadow-md">
              Eu te amo de mais e fiz essa pagina simples para mostrar isso. 
              Bom trabalho e que você consiga descansar as 2h da madrugada para ficar mais de boa kkkkkk .
              <br />
            </p>
          </div>
        </div>

        {/* detalhe extra: estetoscópio */}
        <div className="mt-6 flex items-center text-gray-700 text-sm">
          <span className="text-2xl mr-2">🩺</span>
          <span>
            Melhor namorada e enfermagem do mundo!
          </span>
        </div>
      </div>
    </main>
  );
}
