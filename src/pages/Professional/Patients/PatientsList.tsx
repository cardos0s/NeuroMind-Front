import { useState } from "react";
import {
  Search,
  Filter,
  X,
  CalendarClock,
  ClipboardList,
} from "lucide-react";

type PatientStatus = "Ativo" | "Pausado" | "Alta";

type Patient = {
  id: string;
  name: string;
  context: string;
  plan: string;
  sessionsPerWeek: number;
  status: PatientStatus;
  guardian?: string;
  age?: string;
  diagnosis?: string;
};

type AgendaEntry = {
  id: string;
  date: string; // ex: "19/11/2025"
  note: string;
};

const patientsMock: Patient[] = [
  {
    id: "1",
    name: "João da Silva",
    context: "Clínica",
    plan: "TEA • Intensivo",
    sessionsPerWeek: 3,
    status: "Ativo",
    guardian: "Maria (mãe)",
    age: "6 anos",
    diagnosis: "TEA nível 2",
  },
  {
    id: "2",
    name: "Maria Oliveira",
    context: "Escola",
    plan: "AC • Escolar",
    sessionsPerWeek: 2,
    status: "Pausado",
    guardian: "Carlos (pai)",
    age: "8 anos",
    diagnosis: "Atraso na linguagem",
  },
  {
    id: "3",
    name: "Pedro Santos",
    context: "Casa",
    plan: "Comunicação funcional",
    sessionsPerWeek: 1,
    status: "Ativo",
    guardian: "Ana (mãe)",
    age: "5 anos",
    diagnosis: "Apraxia de fala",
  },
  {
    id: "4",
    name: "Ana Costa",
    context: "Clínica",
    plan: "Reabilitação motora",
    sessionsPerWeek: 0,
    status: "Alta",
    guardian: "João (pai)",
    age: "9 anos",
    diagnosis: "Paralisia cerebral",
  },
];

// agenda inicial mockada por paciente
const initialAgenda: Record<string, AgendaEntry[]> = {
  "1": [
    {
      id: "1-1",
      date: "18/11/2025",
      note: "Trabalhou bem com pranchas simples; boa aceitação visual.",
    },
    {
      id: "1-2",
      date: "11/11/2025",
      note: "Introdução de pranchas com rotina diária; precisa de apoio.",
    },
  ],
  "2": [
    {
      id: "2-1",
      date: "15/11/2025",
      note: "Sessão pausada a pedido da escola para reestruturação da rotina.",
    },
  ],
};

export default function PatientsList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"todos" | PatientStatus>(
    "todos"
  );
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [agendaByPatient, setAgendaByPatient] =
    useState<Record<string, AgendaEntry[]>>(initialAgenda);
  const [newAgendaText, setNewAgendaText] = useState("");

  const filteredPatients = patientsMock.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.plan.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "todos" ? true : p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openModal = (patient: Patient) => {
    setSelectedPatient(patient);
    setNewAgendaText("");
  };

  const closeModal = () => {
    setSelectedPatient(null);
    setNewAgendaText("");
  };

  const handleAddAgendaEntry = () => {
    if (!selectedPatient || !newAgendaText.trim()) return;

    const today = new Date();
    const dateString = today.toLocaleDateString("pt-BR");

    const newEntry: AgendaEntry = {
      id: `${selectedPatient.id}-${Date.now()}`,
      date: dateString,
      note: newAgendaText.trim(),
    };

    setAgendaByPatient((prev) => {
      const previousEntries = prev[selectedPatient.id] ?? [];
      return {
        ...prev,
        [selectedPatient.id]: [newEntry, ...previousEntries],
      };
    });

    setNewAgendaText("");
  };

  const agendaForSelected =
    selectedPatient && agendaByPatient[selectedPatient.id]
      ? agendaByPatient[selectedPatient.id]
      : [];

  return (
    <div className="w-full h-full">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl p-6 md:p-7 lg:p-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">Pacientes</h1>
            <p className="text-xs md:text-sm text-slate-500">
              Gerencie seus pacientes, planos e frequência de atendimento.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            {/* Busca */}
            <div className="relative">
              <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs md:text-sm outline-none bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-100 focus:border-violet-400 min-w-[220px]"
                placeholder="Buscar por nome ou plano..."
              />
            </div>

            {/* Filtro de status */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400 hidden md:block" />
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "todos" | PatientStatus)
                }
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs md:text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-100 focus:border-violet-400"
              >
                <option value="todos">Todos os status</option>
                <option value="Ativo">Ativos</option>
                <option value="Pausado">Pausados</option>
                <option value="Alta">Alta</option>
              </select>
            </div>

            {/* Botão novo paciente (futuro fluxo) */}
            <button className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#6b4df5] text-white text-xs md:text-sm font-medium shadow-sm hover:bg-[#5a3ee0] transition">
              + Novo paciente
            </button>
          </div>
        </div>

        {/* TABELA */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr className="text-slate-400 text-left">
                <th className="py-2 pr-4 w-10">#</th>
                <th className="py-2 pr-4">Nome</th>
                <th className="py-2 pr-4">Contexto</th>
                <th className="py-2 pr-4">Plano</th>
                <th className="py-2 pr-4 text-center">Sessões/semana</th>
                <th className="py-2 pr-4 text-left">Status</th>
                <th className="py-2 pr-4 text-right w-20">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((p, index) => (
                <tr
                  key={p.id}
                  className="border-t border-slate-100 hover:bg-slate-50/70 cursor-pointer transition-colors"
                  onClick={() => openModal(p)}
                >
                  <td className="py-2 pr-4 text-slate-400">{index + 1}</td>
                  <td className="py-2 pr-4 text-violet-700 font-medium">
                    {p.name}
                  </td>
                  <td className="py-2 pr-4 text-slate-500">{p.context}</td>
                  <td className="py-2 pr-4 text-slate-500">{p.plan}</td>
                  <td className="py-2 pr-4 text-center text-slate-600">
                    {p.sessionsPerWeek}
                  </td>
                  <td className="py-2 pr-4">
                    <StatusBadge status={p.status} />
                  </td>
                  <td
                    className="py-2 pr-4 text-right"
                    // impede o clique no botão de "ver" de disparar duplo
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => openModal(p)}
                      className="inline-flex items-center justify-center h-8 w-8 rounded-xl border border-slate-200 bg-white text-slate-500 hover:border-violet-300 hover:text-violet-600 transition"
                    >
                      <ClipboardList className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredPatients.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="py-6 text-center text-slate-400 text-xs"
                  >
                    Nenhum paciente encontrado com os filtros atuais.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE DETALHES + AGENDA */}
      {selectedPatient && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-semibold text-xs">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-sm md:text-base font-semibold">
                    {selectedPatient.name}
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Plano: {selectedPatient.plan} • Contexto:{" "}
                    {selectedPatient.context}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Conteúdo modal */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              {/* Coluna esquerda: dados do paciente */}
              <div className="p-5 md:p-6 space-y-4">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Dados do paciente
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
                  <InfoRow label="Nome completo" value={selectedPatient.name} />
                  <InfoRow label="Contexto" value={selectedPatient.context} />
                  <InfoRow label="Plano terapêutico" value={selectedPatient.plan} />
                  <InfoRow
                    label="Sessões por semana"
                    value={`${selectedPatient.sessionsPerWeek}`}
                  />
                  <InfoRow
                    label="Responsável"
                    value={selectedPatient.guardian ?? "—"}
                  />
                  <InfoRow label="Idade" value={selectedPatient.age ?? "—"} />
                  <InfoRow
                    label="Diagnóstico"
                    value={selectedPatient.diagnosis ?? "—"}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-slate-500">
                      Status atual
                    </span>
                    <StatusBadge status={selectedPatient.status} />
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3 flex items-start gap-3 text-[11px] text-slate-600">
                  <CalendarClock className="h-4 w-4 text-violet-500 mt-0.5" />
                  <p>
                    Use a agenda ao lado para registrar{" "}
                    <span className="font-semibold">
                      como foi o atendimento de hoje
                    </span>{" "}
                    (humor, engajamento, recursos usados, observações rápidas).
                  </p>
                </div>
              </div>

              {/* Coluna direita: agenda / diário de atendimentos */}
              <div className="p-5 md:p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Agenda / Diário de atendimentos
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Registros rápidos por sessão para acompanhar evolução.
                    </p>
                  </div>
                </div>

                {/* Form de novo registro */}
                <div className="mb-3">
                  <label className="text-[11px] text-slate-500 mb-1 block">
                    Registrar sessão de hoje
                  </label>
                  <textarea
                    value={newAgendaText}
                    onChange={(e) => setNewAgendaText(e.target.value)}
                    rows={3}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs md:text-sm outline-none focus:bg-white focus:ring-2 focus:ring-violet-100 focus:border-violet-400 resize-none"
                    placeholder="Ex: Hoje o paciente aceitou bem as figuras da prancha de rotina, precisando de poucos prompts visuais..."
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleAddAgendaEntry}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#6b4df5] text-white text-xs font-medium hover:bg-[#5a3ee0] transition"
                    >
                      <ClipboardList className="h-3.5 w-3.5" />
                      Adicionar registro de hoje
                    </button>
                  </div>
                </div>

                {/* Lista de registros */}
                <div className="flex-1 mt-1 overflow-y-auto border-t border-slate-100 pt-3 space-y-2">
                  {agendaForSelected.length === 0 && (
                    <p className="text-[11px] text-slate-400">
                      Nenhum registro ainda. Que tal começar anotando como foi o
                      atendimento de hoje?
                    </p>
                  )}

                  {agendaForSelected.map((entry) => (
                    <div
                      key={entry.id}
                      className="rounded-2xl border border-slate-100 bg-slate-50/70 px-3 py-2 text-[11px] md:text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-slate-700">
                          {entry.date}
                        </span>
                      </div>
                      <p className="text-slate-600 whitespace-pre-line">
                        {entry.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* COMPONENTES AUXILIARES */

function StatusBadge({ status }: { status: PatientStatus }) {
  let classes =
    "bg-slate-100 text-slate-700 border border-slate-200";

  if (status === "Ativo") {
    classes = "bg-emerald-100 text-emerald-700 border border-emerald-200";
  } else if (status === "Pausado") {
    classes = "bg-amber-100 text-amber-700 border border-amber-200";
  } else if (status === "Alta") {
    classes = "bg-slate-100 text-slate-600 border border-slate-200";
  }

  return (
    <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${classes}`}>
      {status}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] text-slate-500">{label}</span>
      <span className="text-xs md:text-sm text-slate-800">{value}</span>
    </div>
  );
}
