import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ProfessionalForm = {
  fullName: string;
  email: string;
  profession: string;
  registry: string;
  clinicName: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterProfessional() {
  const navigate = useNavigate();

  const [form, setForm] = useState<ProfessionalForm>({
    fullName: "",
    email: "",
    profession: "",
    registry: "",
    clinicName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("As senhas não conferem.");
      return;
    }

    // 👉 aqui no futuro entra a chamada pra API
    console.log("REGISTER PROFESSIONAL (front-only)", form);

    // por enquanto, manda para o login profissional
    navigate("/login/professional");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0218] text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-[#1a1024] border border-white/10 rounded-2xl p-6 space-y-5 shadow-xl"
      >
        <header className="space-y-1">
          <h1 className="text-2xl font-bold">Registro profissional</h1>
          <p className="text-xs text-gray-300">
            Preencha suas informações profissionais para acessar o NeuroMind.
          </p>
        </header>

        {/* 🔹 Seção 1: dados básicos */}
        <section className="space-y-3">
          <div>
            <Label>Nome completo</Label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-violet-500"
              placeholder="Como aparecerá para pacientes e na clínica"
              required
            />
          </div>

          <div>
            <Label>E-mail profissional</Label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-violet-500"
              placeholder="voce@clinica.com"
              required
            />
          </div>
        </section>

        {/* 🔹 Seção 2: profissão */}
        <section className="space-y-3">
          <div>
            <Label>Especialização</Label>
            <select
              name="profession"
              value={form.profession}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-violet-500"
              required
            >
              <option value="">Selecione</option>
              <option value="TO">Terapeuta Ocupacional</option>
              <option value="Fono">Fonoaudiólogo(a)</option>
              <option value="Fisio">Fisioterapeuta</option>
              <option value="Psico">Psicólogo(a)</option>
              <option value="Professor">Professor(a) / Pedagogo(a)</option>
              <option value="Outro">Outro profissional</option>
            </select>
          </div>

          <div>
            <Label>Registro profissional (opcional)</Label>
            <input
              name="registry"
              value={form.registry}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-violet-500"
              placeholder="CRP, CRFa, CREFITO, etc."
            />
          </div>

          <div>
            <Label>Clínica / escola / consultório (opcional)</Label>
            <input
              name="clinicName"
              value={form.clinicName}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-violet-500"
              placeholder="Nome da instituição ou deixe em branco se autônomo(a)"
            />
          </div>
        </section>

        {/* 🔹 Seção 3: senha */}
        <section className="space-y-3">
          <div>
            <Label>Senha</Label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-violet-500"
              required
            />
          </div>

          <div>
            <Label>Confirmar senha</Label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-violet-500"
              required
            />
          </div>
        </section>

        <button
          type="submit"
          className="w-full mt-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-sm font-semibold py-2.5 transition"
        >
          Criar conta profissional
        </button>
      </form>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs text-gray-200 mb-1">{children}</label>
  );
}
