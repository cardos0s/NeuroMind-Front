import { motion } from "framer-motion";
import brain from "../assets/brain.svg";
import lilica from "../assets/avatars/lilica.svg";
import tiaJu from "../assets/avatars/tiaJu.svg";
import joaozinho from "../assets/avatars/joaozinho.svg";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0b0218] via-[#28094a] to-[#100017] text-white">
      {/* brilhos de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-purple-700/30 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-96 w-96 rounded-full bg-violet-400/20 blur-[140px]" />
        <div className="absolute top-[40%] left-[60%] h-64 w-64 rounded-full bg-fuchsia-600/10 blur-[100px]" />
      </div>

      {/* navbar */}
      <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sm font-bold tracking-tight">
            NM
          </div>
          <span className="text-sm font-semibold tracking-tight text-white/90">
            NeuroMind
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Login
          </a>
          <a
            href="/register"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm transition hover:bg-slate-100"
          >
            Registre-se
          </a>
        </div>
      </header>

      {/* HERO */}
      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col-reverse gap-10 px-6 pb-10 pt-20 lg:flex-row lg:items-center">
        {/* texto */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Plataforma de comunicação alternativa com IA
          </div>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Neuro
            <span className="block bg-gradient-to-r from-yellow-300 via-amber-200 to-white bg-clip-text text-transparent drop-shadow-lg">
              Mind
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg leading-relaxed">
            O NeuroMind ajuda pessoas com deficiências motoras e cognitivas a se
            comunicarem. Clínicas, terapeutas e famílias conseguem criar
            pranchas, acompanhar evolução e dar autonomia aos pacientes, tudo
            com o poder da inteligência artificial.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/register"
              className="rounded-lg bg-yellow-300 px-6 py-2.5 text-sm font-semibold text-purple-900 shadow-md shadow-yellow-400/20 transition hover:bg-yellow-200 hover:shadow-yellow-300/30"
            >
              Começar agora
            </a>
            <a
              href="/login"
              className="text-sm text-white/70 hover:text-white transition"
            >
              Já tenho conta →
            </a>
          </div>

          <p className="mt-5 text-xs text-white/40">
            Em breve: relatórios clínicos, múltiplos perfis e dashboards de
            evolução.
          </p>
        </div>

        {/* imagem com animação */}
        <motion.div
          className="relative mx-auto flex-1 flex justify-center"
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative h-[340px] w-[340px]">
            <div className="absolute -bottom-10 left-1/2 h-32 w-48 -translate-x-1/2 rounded-full bg-purple-500/30 blur-3xl" />
            <img
              src={brain}
              alt="Cérebro NeuroMind"
              className="relative z-10 h-full w-full object-contain drop-shadow-[0_25px_60px_rgba(120,0,255,0.35)]"
            />
          </div>
        </motion.div>
      </main>

      {/* ✨ Seção dos 3 avatares de IA */}
      <section className="relative z-10 mx-auto mt-4 w-full max-w-6xl px-6 pb-16">
        <p className="mb-6 text-sm text-white/50 text-center">
          Assistentes NeuroMind IA
        </p>

        <div className="grid gap-5 md:grid-cols-3">
          {/* Lilica */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="rounded-2xl bg-white/5 px-5 py-5 text-center backdrop-blur-md border border-white/5 hover:border-pink-300/40 transition flex flex-col items-center"
          >
            <img
              src={lilica}
              alt="Lilica - Assistente de Comunicação"
              className="h-40 w-auto mb-2 drop-shadow-[0_8px_25px_rgba(255,120,180,0.35)]"
            />
            <h3 className="text-sm font-semibold text-white">Lilica</h3>
            <p className="text-xs text-pink-200/80 mb-2">IA de Comunicação</p>
            <p className="text-[11px] text-white/70 leading-relaxed max-w-[230px]">
              Ajuda a montar pranchas, frases rápidas e recursos de
              acessibilidade para pacientes que não falam.
            </p>
            <button className="mt-3 text-[11px] font-medium text-pink-200 hover:text-white transition">
              Falar com Lilica →
            </button>
          </motion.div>

          {/* Tia Ju */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="rounded-2xl bg-white/5 px-5 py-5 text-center backdrop-blur-md border border-white/5 hover:border-emerald-300/40 transition flex flex-col items-center"
          >
            <img
              src={tiaJu}
              alt="Tia Ju - Terapia Ocupacional"
              className="h-40 w-auto mb-2 drop-shadow-[0_8px_25px_rgba(80,255,180,0.35)]"
            />
            <h3 className="text-sm font-semibold text-white">Tia Ju</h3>
            <p className="text-xs text-emerald-200/80 mb-2">
              Terapia Ocupacional
            </p>
            <p className="text-[11px] text-white/70 leading-relaxed max-w-[230px]">
              Sugere atividades, treinos funcionais e acompanha evolução para TO
              dentro da plataforma.
            </p>
            <button className="mt-3 text-[11px] font-medium text-emerald-200 hover:text-white transition">
              Falar com Tia Ju →
            </button>
          </motion.div>

          {/* Joãozinho */}
          <motion.div
            whileHover={{ y: -6, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="rounded-2xl bg-white/5 px-5 py-5 text-center backdrop-blur-md border border-white/5 hover:border-indigo-300/40 transition flex flex-col items-center"
          >
            <img
              src={joaozinho}
              alt="Joãozinho - IA de Serviços Gerais"
              className="h-40 w-auto mb-2 drop-shadow-[0_8px_25px_rgba(120,150,255,0.35)]"
            />
            <h3 className="text-sm font-semibold text-white">Joãozinho</h3>
            <p className="text-xs text-indigo-200/80 mb-2">
              Serviços Gerais IA
            </p>
            <p className="text-[11px] text-white/70 leading-relaxed max-w-[230px]">
              Ajuda com tarefas do sistema: pacientes, relatórios, perfis e
              navegação rápida.
            </p>
            <button className="mt-3 text-[11px] font-medium text-indigo-200 hover:text-white transition">
              Falar com Joãozinho →
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
