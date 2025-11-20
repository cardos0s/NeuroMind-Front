import { useMemo, useState } from "react";
import {
  CalendarClock,
  CheckCircle2,
  Filter,
  Loader2,
  Search,
  User2,
  X,
} from "lucide-react";

type SessionStatus = "Agendada" | "Concluída" | "Cancelada";

type Session = {
  id: string;
  date: string; // ISO date
  time: string;
  patientName: string;
  professionalRole: string; // TO, Fono...
  context: string; // Clínica, Escola, Online...
  status: SessionStatus;
};

type PeriodFilter = "today" | "week" | "all";

const sessionsMock: Session[] = [
  {
    id: "1",
    date: new Date().toISOString().slice(0, 10), // hoje
    time: "14:00",
    patientName: "João da Silva",
    professionalRole: "TO",
    context: "Clínica",
    status: "Agendada",
  },
  {
    id: "2",
    date: new Date().toISOString().slice(0, 10),
    time: "16:00",
    patientName: "Maria Oliveira",
    professionalRole: "Fono",
    context: "Escola",
    status: "Agendada",
  },
  {
    id: "3",
    date: addDaysISO(1), // amanhã
    time: "09:00",
    patientName: "Pedro Santos",
    professionalRole: "TO",
    context: "Online",
    status: "Agendada",
  },
  {
    id: "4",
    date: addDaysISO(-1), // ontem
    time: "15:00",
    patientName: "Ana Costa",
    professionalRole: "Fisio",
    context: "Clínica",
    status: "Concluída",
  },
  {
    id: "5",
    date: addDaysISO(3),
    time: "10:30",
    patientName: "Lucas Lima",
    professionalRole: "TO",
    context: "Clínica",
    status: "Cancelada",
  },
];

export default function SessionsListPage() {
  const [period, setPeriod] = useState<PeriodFilter>("today");
  const [statusFilter, setStatusFilter] = useState<SessionStatus | "todos">(
    "todos"
  );
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Session | null>(null);
  const [noteText, setNoteText] = useState("");
  const [savedNotes, setSavedNotes] = useState<Record<string, string>>({});
  const [loadingNote, setLoadingNote] = useState(false);

  const filteredSessions = useMemo(() => {
    const today = new Date();
    const startOfWeek = startOfWeekISO(today);
    const endOfWeek = endOfWeekISO(today);

    return sessionsMock.filter((s) => {
      const sessionDate = new Date(s.date);
      const matchesPeriod =
        period === "all"
          ? true
          : period === "today"
          ? isSameDay(today, sessionDate)
          : sessionDate >= startOfWeek && sessionDate <= endOfWeek;

      const matchesStatus =
        statusFilter === "todos" ? true : s.status === statusFilter;

      const matchesSearch = s.patientName
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesPeriod && matchesStatus && matchesSearch;
    });
  }, [period, statusFilter, search]);

  const stats = useMemo(() => {
    const today = new Date();
    const totalWeek = sessionsMock.filter((s) => {
      const d = new Date(s.date);
      const start = startOfWeekISO(today);
      const end = endOfWeekISO(today);
      return d >= start && d <= end;
    }).length;

    const doneToday = sessionsMock.filter((s) => {
      const d = new Date(s.date);
      return isSameDay(today, d) && s.status === "Concluída";
    }).length;

    const pendingReports = sessionsMock.filter(
      (s) => s.status === "Concluída"
    ).length; // mock: todas concluídas precisam de relatório

    return { totalWeek, doneToday, pendingReports };
  }, []);

  const openSession = (s: Session) => {
    setSelected(s);
    setNoteText(savedNotes[s.id] ?? "");
  };

  const closeModal = () => {
    setSelected(null);
    setNoteText("");
    setLoadingNote(false);
  };

  const handleSaveNote = () => {
    if (!selected) return;
    setLoadingNote(true);

    setTimeout(() => {
      setSavedNotes((prev) => ({ ...prev, [selected.id]: noteText.trim() }));
      setLoadingNote(false);
    }, 400);
  };

  const handleMarkAsDone = () => {
    if (!selected) return;
    // mock: não altera a lista global (sessionsMock), só o estado local do modal
    setSelected({ ...selected, status: "Concluída" });
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl p-6 md:p-7 lg:p-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">Sessões</h1>
            <p className="text-xs md:text-sm text-slate-500">
              Veja suas sessões, status e pranchas usadas em cada atendimento.
            </p>
          </div>

          {/* FILTRO DE PERÍODO E NOVA SESSÃO (futuro) */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 text-[11px] md:text-xs">
              <button
                type="button"
                onClick={() => setPeriod("today")}
                className={`px-3 py-1.5 rounded-full ${
                  period === "today"
                    ? "bg-white text-violet-700 border border-violet-200"
                    : "text-slate-500"
                }`}
              >
                Hoje
              </button>
              <button
                type="button"
                onClick={() => setPeriod("week")}
                className={`px-3 py-1.5 rounded-full border-l border-slate-200 ${
                  period === "week"
                    ? "bg-white text-violet-700 border border-violet-200"
                    : "text-slate-500"
                }`}
              >
                Esta semana
              </button>
              <button
                type="button"
                onClick={() => setPeriod("all")}
                className={`px-3 py-1.5 rounded-full border-l border-slate-200 ${
                  period === "all"
                    ? "bg-white text-violet-700 border border-violet-200"
                    : "text-slate-500"
                }`}
              >
                Todas
              </button>
            </div>
          </div>
        </div>

        {/* CARDS DE RESUMO */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <SummaryCard
            label="Sessões nesta semana"
            value={stats.totalWeek.toString()}
            helper="Inclui agendadas, concluídas e canceladas"
          />
          <SummaryCard
            label="Sessões concluídas hoje"
            value={stats.doneToday.toString()}
            helper="Aguardando registro do atendimento"
          />
          <SummaryCard
            label="Sessões com relatório pendente"
            value={stats.pendingReports.toString()}
            helper="Concluídas que ainda precisam de relatório"
          />
        </div>

        {/* FILTROS + BUSCA */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter className="h-4 w-4 text-slate-400" />
            <span>Filtrar por status e buscar por paciente.</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:ml-auto">
            <div className="relative">
              <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs md:text-sm outline-none bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-100 focus:border-violet-400 min-w-[220px]"
                placeholder="Buscar por nome do paciente..."
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as SessionStatus | "todos")
              }
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs md:text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-100 focus:border-violet-400 w-full sm:w-44"
            >
              <option value="todos">Todos os status</option>
              <option value="Agendada">Agendadas</option>
              <option value="Concluída">Concluídas</option>
              <option value="Cancelada">Canceladas</option>
            </select>
          </div>
        </div>

        {/* TABELA */}
        <div className="rounded-3xl border border-slate-100 bg-slate-50/60 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Lista de sessões
            </h2>
            <p className="text-[11px] text-slate-400">
              {filteredSessions.length} sessão(ões) encontrada(s)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead>
                <tr className="text-slate-400 text-left">
                  <th className="py-2 pr-4">Data</th>
                  <th className="py-2 pr-4">Hora</th>
                  <th className="py-2 pr-4">Paciente</th>
                  <th className="py-2 pr-4">Profissional</th>
                  <th className="py-2 pr-4">Contexto</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map((s) => (
                  <tr
                    key={s.id}
                    className="border-t border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => openSession(s)}
                  >
                    <td className="py-2 pr-4 text-slate-600">
                      {formatDate(s.date)}
                    </td>
                    <td className="py-2 pr-4 text-slate-600">{s.time}</td>
                    <td className="py-2 pr-4 text-violet-700 font-medium">
                      {s.patientName}
                    </td>
                    <td className="py-2 pr-4 text-slate-500">
                      {s.professionalRole}
                    </td>
                    <td className="py-2 pr-4 text-slate-500">{s.context}</td>
                    <td className="py-2 pr-4">
                      <StatusBadge status={s.status} />
                    </td>
                    <td
                      className="py-2 pr-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => openSession(s)}
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1 text-[11px] text-slate-600 hover:border-violet-200 hover:text-violet-700 transition"
                      >
                        Detalhes
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredSessions.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-6 text-center text-slate-400 text-xs"
                    >
                      Nenhuma sessão encontrada com os filtros atuais.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL DE DETALHE DA SESSÃO */}
      {selected && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
            {/* header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-semibold text-xs">
                  {selected.patientName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-sm md:text-base font-semibold">
                    {selected.patientName}
                  </h2>
                  <p className="text-[11px] text-slate-500 flex flex-wrap items-center gap-1">
                    <CalendarClock className="h-3.5 w-3.5 text-violet-500" />
                    {formatDate(selected.date)} • {selected.time} •{" "}
                    {selected.professionalRole} • {selected.context}
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

            {/* conteúdo */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {/* bloco info */}
              <div className="p-5 md:p-6 space-y-3 text-xs md:text-sm">
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    Informações da sessão
                  </h3>
                  <ul className="space-y-1 text-[11px] text-slate-600">
                    <li>• Paciente: {selected.patientName}</li>
                    <li>• Profissional: {selected.professionalRole}</li>
                    <li>• Contexto: {selected.context}</li>
                    <li>• Status atual: {selected.status}</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3 text-[11px] text-slate-600">
                  Use o campo ao lado para registrar um resumo rápido do
                  atendimento (participação, pranchas usadas, ajustes feitos, etc.).
                </div>

                <div className="space-y-2 text-[11px] text-slate-600">
                  <p className="font-semibold text-slate-700">
                    Ações rápidas
                  </p>
                  <button
                    type="button"
                    onClick={handleMarkAsDone}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-[11px] font-medium hover:bg-emerald-600 transition"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Marcar como concluída
                  </button>
                  <p className="text-slate-500">
                    (Somente visual por enquanto — depois conecta com a API.)
                  </p>
                </div>
              </div>

              {/* bloco nota */}
              <div className="p-5 md:p-6 flex flex-col h-full">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Nota rápida da sessão
                </h3>

                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={5}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs md:text-sm outline-none focus:bg-white focus:ring-2 focus:ring-violet-100 focus:border-violet-400 resize-none"
                  placeholder="Ex: Paciente engajado, utilizou prancha de rotina da manhã, resposta boa ao reforço visual..."
                />

                <div className="flex justify-between items-center mt-3 text-[11px] text-slate-400">
                  {savedNotes[selected.id] && (
                    <span className="truncate">
                      Última nota salva: “{savedNotes[selected.id]}”
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={handleSaveNote}
                    className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#6b4df5] text-white text-[11px] font-medium hover:bg-[#5a3ee0] transition disabled:opacity-60"
                    disabled={loadingNote}
                  >
                    {loadingNote && (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    )}
                    Salvar nota
                  </button>
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

function SummaryCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-2xl border border-violet-50 bg-violet-50/60 px-4 py-3">
      <p className="text-[11px] text-slate-500 mb-1">{label}</p>
      <p className="text-xl font-semibold text-violet-700">{value}</p>
      <p className="text-[11px] text-slate-500 mt-0.5">{helper}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: SessionStatus }) {
  let classes =
    "bg-slate-100 text-slate-700 border border-slate-200";

  if (status === "Agendada") {
    classes = "bg-violet-50 text-violet-700 border border-violet-100";
  } else if (status === "Concluída") {
    classes = "bg-emerald-50 text-emerald-700 border border-emerald-100";
  } else if (status === "Cancelada") {
    classes = "bg-rose-50 text-rose-700 border border-rose-100";
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${classes}`}>
      {status}
    </span>
  );
}

/* HELPERS DE DATA */

function addDaysISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfWeekISO(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0..6 (domingo..sábado)
  const diff = (day === 0 ? -6 : 1) - day; // segunda como início
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfWeekISO(date: Date): Date {
  const start = startOfWeekISO(date);
  const d = new Date(start);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
}
