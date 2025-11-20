export default function PatientEvolution() {
  return (
    <div className="space-y-4 max-w-3xl">
      <header>
        <h1 className="text-2xl font-semibold">Minha evolução</h1>
        <p className="text-sm text-gray-300">
          Aqui você acompanha, de forma simples, como está seu progresso ao longo do tempo.
        </p>
      </header>

      <div className="border border-white/10 bg-white/5 rounded-xl p-4 space-y-2">
        <h2 className="text-sm font-semibold mb-1">Gráficos (em breve)</h2>
        <p className="text-xs text-gray-400">
          No futuro, você verá aqui gráficos amigáveis mostrando sua evolução em diferentes
          áreas (comunicação, autonomia, participação, etc.).
        </p>
      </div>

      <div className="border border-white/10 bg-white/5 rounded-xl p-4 space-y-2">
        <h2 className="text-sm font-semibold mb-1">Resumo em linguagem simples</h2>
        <p className="text-xs text-gray-400">
          A ideia é que os profissionais possam escrever (ou a IA gerar) um resumo acessível
          sobre o seu progresso, em uma linguagem que você e sua família entendam.
        </p>
      </div>
    </div>
  );
}
