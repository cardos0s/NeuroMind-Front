import { useState } from "react";
import { useNavigate } from "react-router-dom";

type PatientForm = {
  patientName: string;
  responsibleName: string;
  responsibleRelation: string;
  responsibleEmail: string;
  responsiblePhone: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPatient() {
  const navigate = useNavigate();

  const [form, setForm] = useState<PatientForm>({
    patientName: "",
    responsibleName: "",
    responsibleRelation: "",
    responsibleEmail: "",
    responsiblePhone: "",
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

    // 👉 futuro: mandar isso pro back
    console.log("REGISTER PATIENT (front-only)", form);

    navigate("/login/patient");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0218] text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-[#1a1024] border border-white/10 rounded-2xl p-6 space-y-5 shadow-xl"
      >
        <header className="space-y-1">
          <h1 className="text-2xl font-bold">Cadastro de paciente</h1>
          <p className="text-xs text-gray-300">
            Acesse relatórios, comunicados e pranchas de comunicação enviados pela clínica.
          </p>
        </header>

        {/* 🔹 Seção 1: paciente */}
        <section className="space-y-3">
          <div>
            <Label>Nome do paciente</Label>
            <input
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-fuchsia-500"
              placeholder="Nome da criança/adulto acompanhado"
              required
            />
          </div>
        </section>

        {/* 🔹 Seção 2: família / responsável */}
        <section className="space-y-3">
          <p className="text-xs text-gray-300">
            Dados do responsável (quem vai receber os acessos e comunicados).
          </p>

          <div>
            <Label>Responsável</Label>
            <input
              name="responsibleName"
              value={form.responsibleName}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-fuchsia-500"
              placeholder="Mãe, pai, cuidador..."
              required
            />
          </div>

          <div>
            <Label>Parentesco / relação</Label>
            <input
              name="responsibleRelation"
              value={form.responsibleRelation}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-fuchsia-500"
              placeholder="Ex.: mãe, pai, avó, tio, tutor..."
            />
          </div>

          <div>
            <Label>E-mail do responsável</Label>
            <input
              type="email"
              name="responsibleEmail"
              value={form.responsibleEmail}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-fuchsia-500"
              placeholder="email@exemplo.com"
              required
            />
          </div>

          <div>
            <Label>Telefone / WhatsApp (opcional)</Label>
            <input
              name="responsiblePhone"
              value={form.responsiblePhone}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-fuchsia-500"
              placeholder="(xx) xxxxx-xxxx"
            />
          </div>
        </section>

        {/* 🔹 Seção 3: acesso */}
        <section className="space-y-3">
          <div>
            <Label>Senha de acesso</Label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-fuchsia-500"
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
              className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-fuchsia-500"
              required
            />
          </div>
        </section>

        <button
          type="submit"
          className="w-full mt-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-sm font-semibold py-2.5 transition"
        >
          Criar conta de paciente
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
