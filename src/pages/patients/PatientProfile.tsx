// src/pages/patients/PatientProfile.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PatientsApi } from "../../services/patients";
import type { Patient } from "../../types/patient";
import Avatar from "../../components/Avatar";
import { FileText, Plus, Edit2 } from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";

type TabKey = "geral" | "demografia" | "evolucao" | "terapias" | "documentos";

const mockSeries = [
  { w: "01", comunicacao: 12, atencao: 18 },
  { w: "02", comunicacao: 15, atencao: 20 },
  { w: "03", comunicacao: 18, atencao: 23 },
  { w: "04", comunicacao: 22, atencao: 24 },
  { w: "05", comunicacao: 25, atencao: 27 },
];

export default function PatientProfile() {
  const { id } = useParams();
  const nav = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [active, setActive] = useState<TabKey>("geral");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!id) return;
      setLoading(true);
      const p = await PatientsApi.get(Number(id));
      setPatient(p);
      setLoading(false);
    })();
  }, [id]);

  const idade = useMemo(() => {
    if (!patient?.birthDate) return "—";
    const d = new Date(patient.birthDate);
    const now = new Date();
    let years = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) years--;
    return `${years} anos`;
  }, [patient]);

  if (loading) {
    return <div className="p-6 text-gray-500">Carregando…</div>;
  }
  if (!patient) {
    return <div className="p-6 text-gray-500">Paciente não encontrado.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4 bg-white border rounded-2xl p-5">
        <Avatar name={patient.name} url={patient.avatarUrl} size={88} />
        <div className="flex-1 min-w-[220px]">
          <div className="text-xl font-semibold text-gray-900">{patient.name}</div>
          <div className="text-sm text-gray-600">
            {idade} {patient.sex ? " • " + labelSex(patient.sex) : ""} {patient.city ? " • " + patient.city : ""}
          </div>
          <div className="mt-1 text-xs text-gray-500">{patient.email ?? "—"}</div>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-2 rounded-lg border hover:bg-gray-50 inline-flex items-center gap-2"
            onClick={() => nav(`/patients/${patient.id}`)}
            title="Editar cadastro básico"
          >
            <Edit2 className="size-4" /> Editar paciente
          </button>
          <button className="px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 inline-flex items-center gap-2">
            <Plus className="size-4" /> Nova sessão
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border rounded-2xl">
        <div className="px-4 pt-3 border-b">
          <div className="flex gap-3 overflow-x-auto text-sm">
            {[
              { k: "geral", t: "Geral" },
              { k: "demografia", t: "Dados demográficos" },
              { k: "evolucao", t: "Evolução & Sessões" },
              { k: "terapias", t: "Terapias & Plano" },
              { k: "documentos", t: "Documentos" },
            ].map((tab) => (
              <button
                key={tab.k}
                onClick={() => setActive(tab.k as TabKey)}
                className={`px-3 py-2 rounded-t-lg border-b-2 ${
                  active === tab.k
                    ? "border-purple-600 text-purple-700 font-medium"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.t}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5">
          {active === "geral" && <Geral patient={patient} />}
          {active === "demografia" && <Demografia patient={patient} />}
          {active === "evolucao" && <Evolucao />}
          {active === "terapias" && <TerapiasPlano patient={patient} />}
          {active === "documentos" && <Documentos />}
        </div>
      </div>
    </div>
  );
}

function labelSex(s?: string) {
  if (!s) return "—";
  return s === "F" ? "Feminino" : s === "M" ? "Masculino" : "Outro";
}

/* === Conteúdos das abas === */

function Geral({  }: { patient: Patient }) {
  return (
    <div className="grid lg:grid-cols-2 gap-5">
      {/* Indicadores principais */}
      <div className="space-y-4">
        <Card title="Comunicação por botões (últimas 5 semanas)">
          <ChartLine dataKey="comunicacao" />
        </Card>
        <Card title="Tempo de atenção (min/semana)">
          <ChartLine dataKey="atencao" stroke="#10b981" />
        </Card>
      </div>

      {/* Notas recentes */}
      <div className="space-y-4">
        <Card title="Notas recentes">
          <ul className="space-y-3 text-sm">
            <li>
              <div className="font-medium text-gray-800">Aumento de pedidos espontâneos</div>
              <div className="text-gray-500">por Fono • 12/09/2025</div>
            </li>
            <li className="pt-2 border-t">
              <div className="font-medium text-gray-800">Boa tolerância a estímulos auditivos</div>
              <div className="text-gray-500">por TO • 09/09/2025</div>
            </li>
          </ul>
        </Card>
        <Card title="Status do perfil">
          <div className="text-sm text-gray-700">Ativo</div>
        </Card>
      </div>
    </div>
  );
}

function Demografia({ patient }: { patient: Patient }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
      <Field label="Cidade">{patient.city ?? "—"}</Field>
      <Field label="Endereço">{patient.address ?? "—"}</Field>
      <Field label="Convênio">{patient.insurance ?? "—"}</Field>
      <Field label="Responsável">{patient.guardianName ?? "—"}</Field>
      <Field label="Telefone do responsável">{patient.guardianPhone ?? "—"}</Field>
      <Field label="Escola / Turma">{patient.schoolInfo ?? "—"}</Field>
    </div>
  );
}

function Evolucao() {
  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <Card title="Comunicação por botões (semanal)">
        <ChartLine dataKey="comunicacao" />
      </Card>
      <Card title="Tempo de atenção (semanal)">
        <ChartLine dataKey="atencao" stroke="#10b981" />
      </Card>

      <Card title="Sessões recentes">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-3 py-2">Data</th>
                <th className="text-left px-3 py-2">Área</th>
                <th className="text-left px-3 py-2">Profissional</th>
                <th className="text-left px-3 py-2">Resumo</th>
              </tr>
            </thead>
            <tbody>
              {[
                { d: "10/09", a: "Fono", prof: "Dra. Laura", r: "Pedidos espontâneos ↑" },
                { d: "08/09", a: "TO", prof: "Dr. Gabriel", r: "Integração sensorial estável" },
              ].map((s, i) => (
                <tr key={i} className="border-t">
                  <td className="px-3 py-2">{s.d}</td>
                  <td className="px-3 py-2">{s.a}</td>
                  <td className="px-3 py-2">{s.prof}</td>
                  <td className="px-3 py-2">{s.r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function TerapiasPlano({ patient }: { patient: Patient }) {
  return (
    <div className="grid lg:grid-cols-2 gap-5">
    {/* Histórico por área */}
      <Card title="Histórico terapêutico (TO, Fono, Psico…)">
        <ul className="space-y-3 text-sm">
          {(patient.therapies ?? [
            { area: "Fono", date: "12/09/2025", note: "Aumento de pedidos espontâneos." },
            { area: "TO", date: "09/09/2025", note: "Melhora em tolerância a estímulos." },
          ]).map((t, i) => (
            <li key={i} className="border rounded-lg p-3">
              <div className="font-medium text-gray-800">
                {t.area} • <span className="text-gray-500">{t.date}</span>
              </div>
              <div className="text-gray-700">{t.note}</div>
            </li>
          ))}
        </ul>
      </Card>

      {/* Plano & Alergias */}
      <Card title="Plano terapêutico & Alergias">
        <div className="space-y-4 text-sm">
          <div>
            <div className="font-medium text-gray-800 mb-1">Objetivos ativos</div>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Ampliar repertório de pedidos com PECS / pranchas</li>
              <li>Manter tempo de atenção ≥ 20min em atividade dirigida</li>
            </ul>
          </div>

          <div>
            <div className="font-medium text-gray-800 mb-1">Alergias / restrições</div>
            <div className="text-gray-700">{(patient.allergies ?? ["Lactose"]).join(", ")}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Documentos() {
  return (
    <div className="space-y-3">
      <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-50">
        <Plus className="size-4" /> Adicionar documento
      </button>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {["Relatório Fono 09/2025.pdf", "Laudo diagnóstico.pdf", "Receita 08/2025.pdf"].map((n) => (
          <div key={n} className="border rounded-xl p-3 flex items-center gap-2">
            <FileText className="size-5 text-purple-600" />
            <div className="text-sm text-gray-800">{n}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* === auxiliares de UI === */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-xl p-4">
      <div className="text-sm font-medium text-gray-800 mb-3">{title}</div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="p-3 border rounded-xl">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-gray-800">{children}</div>
    </div>
  );
}

function ChartLine({ dataKey, stroke = "#7c3aed" }: { dataKey: string; stroke?: string }) {
  return (
    <div className="h-44">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockSeries}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="w" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}