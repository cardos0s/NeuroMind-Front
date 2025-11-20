import { useState } from "react";

export default function LoginPatient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // futuramente: chamar API -> /auth/login-patient
    console.log("Login paciente", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#100017] text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold mb-2">Login do Paciente</h1>
        <p className="text-sm text-gray-300 mb-4">
          Acesse sua área pessoal para acompanhar sua evolução no NeuroMind.
        </p>

        <div>
          <label className="block text-sm mb-1">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-500 rounded-lg py-2 font-semibold mt-2"
        >
          Entrar
        </button>

        <p className="text-xs text-gray-400 mt-3 text-center">
          Esqueceu a senha?
        </p>
      </form>
    </div>
  );
}
