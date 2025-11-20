export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#150025] via-[#3e0f69] to-[#090012] text-white">
      {/* gradient decorativo */}
      <div className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-purple-500/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-120px] right-[-60px] h-80 w-80 rounded-full bg-violet-400/20 blur-3xl" />

      {/* navbar */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sm font-bold tracking-tight">
            NM
          </div>
          <span className="text-sm font-medium tracking-tight text-white/90">
            NeuroMind
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
            Login
          </button>
          <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm transition hover:bg-slate-100">
            Registre-se
          </button>
        </div>
      </header>

      {/* hero content */}
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-20 lg:flex-row lg:items-center">
        {/* texto */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Plataforma de comunicação alternativa com IA
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Neuro
            <span className="block text-yellow-300">Mind</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg">
            O NeuroMind é uma plataforma para pessoas com deficiências motoras e
            cognitivas. Com inteligência artificial, oferecemos acessibilidade,
            autonomia e inclusão para pacientes, famílias e clínicas.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button className="rounded-lg bg-yellow-300 px-5 py-2.5 text-sm font-semibold text-purple-900 transition hover:bg-yellow-200">
              Começar agora
            </button>
            <button className="text-sm text-white/70 hover:text-white">
              Ver como funciona →
            </button>
          </div>

          <p className="mt-5 text-xs text-white/50">
            Já ajudando terapeutas, clínicas e famílias a darem voz a quem
            precisa.
          </p>
        </div>

        {/* imagem / cérebro */}
        <div className="relative mt-6 flex-1 lg:mt-0">
          <div className="relative mx-auto h-[320px] w-[320px] max-w-md">
            {/* fundo de vidro */}
            <div className="absolute inset-0 rounded-3xl bg-white/5 blur-sm" />
            {/* imagem do cérebro */}
            <img
              src="/brain.png" // coloca o seu caminho aqui
              alt="Cérebro NeuroMind"
              className="relative z-10 h-full w-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.35)]"
            />
            {/* brilho */}
            <div className="pointer-events-none absolute -bottom-6 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full bg-purple-500/40 blur-2xl" />
          </div>
        </div>
      </main>
    </div>
  );
}
