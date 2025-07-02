import { motion } from 'framer-motion';
import brain from '../assets/brain.svg';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white flex items-center justify-center overflow-hidden px-6 py-12">

      {/* Botões no canto superior direito */}
      <div className="absolute top-6 right-6 z-20 space-x-4">
        <button className="bg-white text-purple-700 px-4 py-2 rounded hover:bg-purple-200 transition">Login</button>
        <button className="bg-white text-purple-700 px-4 py-2 rounded hover:bg-purple-200 transition">Registrar</button>
      </div>

      {/* Cérebro GRANDE no fundo */}
      <motion.img
        src={brain}
        alt="Cérebro"
        className="absolute z-0 opacity-30 w-[700px] md:w-[900px] lg:w-[1100px]"
        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />

      {/* Conteúdo em cima do cérebro */}
      <div className="z-10 text-center max-w-2xl">
        <h1 className="text-6xl md:text-7xl font-bold leading-tight">
          <span className="block text-yellow-400 transition-all duration-300 hover:text-transparent hover:text-stroke-yellow">
            Neuro
          </span>
          <span className="block text-yellow-400 transition-all duration-300 hover:text-transparent hover:text-stroke-yellow">
            Mind
          </span>
        </h1>

        <p className="mt-6 text-white/90 text-base md:text-lg leading-relaxed">
          O NeuroMind é uma plataforma de comunicação alternativa para pessoas com deficiências motoras e cognitivas.
          Com inteligência artificial, oferecemos acessibilidade, autonomia e inclusão.
        </p>
      </div>
    </div>
  );
}