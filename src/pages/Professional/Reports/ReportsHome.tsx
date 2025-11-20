import { useMemo, useState } from "react";
import {
  CalendarRange,
  CheckCircle2,
  FileText,
  FilePenLine,
  Filter,
  Loader2,
  User2,
  X,
} from "lucide-react";

type ReportStatus = "Rascunho" | "Em revisão" | "Assinado" | "Arquivado";

type Report = {
  id: string;
  patientName: string;
  reportType: string;
  createdAt: string; // "2025-11-19"
  lastUpdate: string;
  status: ReportStatus;
  professionalName: string;
};

const reportsMock: Report[] = [
  {
    id: "1",
    patientName: "João da Silva",
    reportType: "Relatório de evolução mensal",
    createdAt: "2025-11-01",
    lastUpdate: "2025-11-18",
    status: "Em revisão",
    professionalName: "Julia Cardoso (TO)",
  },
  {
    id: "2",
    patientName: "Maria Oliveira",
    reportType: "Relatório para escola",
    createdAt: "2025-11-10",
    lastUpdate: "2025-11-17",
    status: "Rascunho",
    professionalName: "Julia Cardoso (TO)",
  },
  {
    id: "3",
    patientName: "Pedro Santos",
    reportType: "Relatório de alta",
    createdAt: "2025-10-20",
    lastUpdate: "2025-10-25",
    status: "Assinado",
    professionalName: "Equipe multiprofissional",
  },
  {
    id: "4",
    patientName: "Ana Costa",
    reportType: "Relatório interdisciplinar",
    createdAt: "2025-09-05",
    lastUpdate: "2025-09-15",
    status: "Arquivado",
    professionalName: "Julia Cardoso (TO)",
  },
];

type PeriodFilter = "7d" | "30d" | "all";

export default function ReportsHome() {
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "todos">(
    "todos"
  );
  const [period, setPeriod] = useState<PeriodFilter>("30d");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Report | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewText, setPreviewText] = useState<string | null>(null);

  // filtro por período (mock: só checa se está dentro de 30 dias/7 dias pela data de criação)
  const filteredReports = useMemo(() => {
    const today = new Date();

    const withinPeriod = (createdAt: string) => {
      if (period === "all") return true;
      const diffMs = today.getTime() - new Date(createdAt).getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      if (period === "7d") return diffDays <= 7;
      if (period === "30d") return diffDays <= 30;
      return true;
    };

    return reportsMock.filter((r) => {
      const matchesStatus =
        statusFilter === "todos" ? true : r.status === statusFilter;
      const matchesPeriod = withinPeriod(r.createdAt);
      const matchesSearch =
        r.patientName.toLowerCase().includes(search.toLowerCase()) ||
        r.reportType.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesPeriod && matchesSearch;
    });
  }, [statusFilter, period, search]);

  const stats = useMemo(() => {
    const total = reportsMock.length;
    const drafts = reportsMock.filter((r) => r.status === "Rascunho").length;
    const reviewing = reportsMock.filter((r) => r.status === "Em revisão").length;
    const signed = reportsMock.filter((r) => r.status === "Assinado").length;

    return { total, drafts, reviewing, signed };
  }, []);

  const openReport = async (report: Report) => {
    setSelected(report);
    setPreviewText(null);
    setPreviewLoading(true);

    // mock de carregamento do texto
    setTimeout(() => {
      setPreviewText(
        `Este é um preview fictício do relatório "${report.reportType}" do paciente ${report.patientName}. 
Aqui você poderá incluir: objetivos, evolução, observações, recomendações e plano terapêutico.`
      );
      setPreviewLoading(false);
    }, 600);
  };

  const closeModal = () => {
    setSelected(null);
    setPreviewText(null);
    setPreviewLoading(false);
  };

  const handleMarkAsSigned = () => {
    if (!selected) return;

    // no futuro isso chamaria a API; aqui só atualiza local
    const updated: Report = {
      ...selected,
      status: "Assinado",
      lastUpdate: new Date().toISOString().slice(0, 10),
    };
    setSelected(updated);
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl p-6 md:p-7 lg:p-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">Relatórios</h1>
            <p className="text-xs md:text-sm text-slate-500">
              Acompanhe relatórios em rascunho, em revisão e assinados.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            {/* filtro período */}
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 text-[11px] md:text-xs">
              <button
                onClick={() => setPeriod("7d")}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1 ${
                  period === "7d"
                    ? "bg-white text-violet-700 border border-violet-200"
                    : "text-slate-500"
                }`}
              >
                <CalendarRange className="h-3.5 w-3.5" />
                7 dias
              </button>
              <button
                onClick={() => setPeriod("30d")}
                className={`px-3 py-1.5 rounded-full border-l border-slate-200 ${
                  period === "30d"
                    ? "bg-white text-violet-700 border border-violet-200"
                    : "text-slate-500"
                }`}
              >
                30 dias
              </button>
              <button
                onClick={() => setPeriod("all")}
                className={`px-3 py-1.5 rounded-full border-l border-slate-200 ${
                  period === "all"
                    ? "bg-white text-violet-700 border border-violet-200"
                    : "text-slate-500"
                }`}
              >
                Todos
              </button>
            </div>

            {/* botão novo relatório */}
            <button className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#6b4df5] text-white text-xs md:text-sm font-medium shadow-sm hover:bg-[#5a3ee0] transition">
              + Novo relatório
            </button>
          </div>
        </div>

        {/* TOPO: filtros + busca + cards de resumo */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          {/* filtros + busca */}
          <div className="col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Filter className="h-4 w-4 text-slate-400" />
              <span>Filtrar por status e buscar por paciente ou tipo.</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <FileText className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs md:text-sm outline-none bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-100 focus:border-violet-400 w-full"
                  placeholder="Buscar por paciente ou tipo de relatório..."
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as ReportStatus | "todos")
                }
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs md:text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-100 focus:border-violet-400 w-full sm:w-40"
              >
                <option value="todos">Todos os status</option>
                <option value="Rascunho">Rascunho</option>
                <option value="Em revisão">Em revisão</option>
                <option value="Assinado">Assinado</option>
                <option value="Arquivado">Arquivado</option>
              </select>
            </div>
          </div>

          {/* cards de resumo */}
          <div className="col-span-1 xl:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <SummaryCard
              label="Relatórios em rascunho"
              value={stats.drafts.toString()}
              helper="Ainda não enviados para revisão"
              tone="warning"
            />
            <SummaryCard
              label="Aguardando revisão"
              value={stats.reviewing.toString()}
              helper="Precisam ser revisados/assinados"
              tone="primary"
            />
            <SummaryCard
              label="Assinados"
              value={stats.signed.toString()}
              helper="Relatórios já finalizados"
              tone="success"
            />
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL: Tabela + lado direito  */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* TABELA */}
          <div className="xl:col-span-2">
            <div className="rounded-3xl border border-slate-100 bg-slate-50/60 p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-slate-800">
                  Lista de relatórios
                </h2>
                <p className="text-[11px] text-slate-400">
                  {filteredReports.length} relatório(s) encontrado(s)
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm">
                  <thead>
                    <tr className="text-slate-400 text-left">
                      <th className="py-2 pr-4">Paciente</th>
                      <th className="py-2 pr-4">Tipo</th>
                      <th className="py-2 pr-4">Criado em</th>
                      <th className="py-2 pr-4">Última atualização</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2 pr-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((r) => (
                      <tr
                        key={r.id}
                        className="border-t border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                        onClick={() => openReport(r)}
                      >
                        <td className="py-2 pr-4 text-violet-700 font-medium">
                          {r.patientName}
                        </td>
                        <td className="py-2 pr-4 text-slate-600">
                          {r.reportType}
                        </td>
                        <td className="py-2 pr-4 text-slate-500">
                          {formatDate(r.createdAt)}
                        </td>
                        <td className="py-2 pr-4 text-slate-500">
                          {formatDate(r.lastUpdate)}
                        </td>
                        <td className="py-2 pr-4">
                          <StatusBadge status={r.status} />
                        </td>
                        <td
                          className="py-2 pr-4 text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => openReport(r)}
                            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1 text-[11px] text-slate-600 hover:border-violet-200 hover:text-violet-700 transition"
                          >
                            <FilePenLine className="h-3.5 w-3.5" />
                            Abrir
                          </button>
                        </td>
                      </tr>
                    ))}

                    {filteredReports.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-6 text-center text-slate-400 text-xs"
                        >
                          Nenhum relatório encontrado com os filtros atuais.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: dicas / timeline simples */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
              <h3 className="text-sm font-semibold text-slate-800 mb-2">
                Checklist rápido de um bom relatório
              </h3>
              <ul className="space-y-1.5 text-[11px] text-slate-600">
                <li>• Objetivo claro do atendimento / intervenção.</li>
                <li>• Breve histórico e contexto do paciente.</li>
                <li>• Descrição da evolução com exemplos concretos.</li>
                <li>• Recomendações práticas para família e escola.</li>
                <li>• Próximos passos do plano terapêutico.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-4">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">
                Últimos relatórios atualizados
              </h3>
              <div className="space-y-2">
                {reportsMock
                  .slice() // copia
                  .sort(
                    (a, b) =>
                      new Date(b.lastUpdate).getTime() -
                      new Date(a.lastUpdate).getTime()
                  )
                  .slice(0, 4)
                  .map((r) => (
                    <div
                      key={r.id}
                      className="flex items-start gap-2 text-[11px] text-slate-600"
                    >
                      <div className="mt-1 h-2 w-2 rounded-full bg-violet-400" />
                      <div>
                        <p className="font-medium text-slate-800">
                          {r.patientName} — {r.reportType}
                        </p>
                        <p className="text-slate-500">
                          Atualizado em {formatDate(r.lastUpdate)} •{" "}
                          {r.status}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE RELATÓRIO */}
      {selected && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
            {/* header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-semibold text-xs">
                  {selected.patientName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-sm md:text-base font-semibold">
                    {selected.reportType}
                  </h2>
                  <p className="text-[11px] text-slate-500 flex flex-wrap items-center gap-1">
                    <User2 className="h-3.5 w-3.5 text-violet-500" />
                    {selected.patientName}
                    <span className="mx-1">•</span>
                    Criado em {formatDate(selected.createdAt)}
                    <span className="mx-1">•</span>
                    Última atualização {formatDate(selected.lastUpdate)}
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
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {/* coluna esquerda: status + ações */}
              <div className="p-5 md:p-6 flex flex-col gap-4">
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    Status do relatório
                  </h3>
                  <StatusBadge status={selected.status} />
                </div>

                <div className="space-y-2 text-[11px] text-slate-600">
                  <p className="font-semibold text-slate-700">
                    Ações rápidas
                  </p>
                  <button
                    type="button"
                    onClick={handleMarkAsSigned}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-[11px] font-medium hover:bg-emerald-600 transition"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Marcar como assinado
                  </button>
                  <p className="text-slate-500">
                    (Somente visual — no futuro isso será integrado com a
                    assinatura e envio de PDF.)
                  </p>
                </div>
              </div>

              {/* coluna direita: preview do texto */}
              <div className="md:col-span-2 p-5 md:p-6 flex flex-col h-full">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Preview do relatório
                </h3>

                <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-50/80 px-3 py-3 text-[12px] md:text-sm text-slate-700 overflow-y-auto whitespace-pre-line">
                  {previewLoading && (
                    <div className="flex items-center justify-center py-8 text-slate-400 gap-2 text-[11px]">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Carregando preview...
                    </div>
                  )}

                  {!previewLoading && previewText && <p>{previewText}</p>}

                  {!previewLoading && !previewText && (
                    <p className="text-[11px] text-slate-400">
                      Nenhum preview disponível.
                    </p>
                  )}
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
  tone,
}: {
  label: string;
  value: string;
  helper: string;
  tone: "primary" | "warning" | "success";
}) {
  const map: Record<
    typeof tone,
    { bg: string; border: string; text: string }
  > = {
    primary: {
      bg: "bg-violet-50",
      border: "border-violet-100",
      text: "text-violet-700",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-100",
      text: "text-amber-700",
    },
    success: {
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      text: "text-emerald-700",
    },
  };

  return (
    <div
      className={`rounded-2xl border px-4 py-3 ${map[tone].bg} ${map[tone].border}`}
    >
      <p className="text-[11px] text-slate-500 mb-1">{label}</p>
      <p className={`text-xl font-semibold ${map[tone].text}`}>{value}</p>
      <p className="text-[11px] text-slate-500 mt-0.5">{helper}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: ReportStatus }) {
  let classes =
    "bg-slate-100 text-slate-700 border border-slate-200";

  if (status === "Rascunho") {
    classes = "bg-amber-50 text-amber-700 border border-amber-100";
  } else if (status === "Em revisão") {
    classes = "bg-violet-50 text-violet-700 border border-violet-100";
  } else if (status === "Assinado") {
    classes = "bg-emerald-50 text-emerald-700 border border-emerald-100";
  } else if (status === "Arquivado") {
    classes = "bg-slate-50 text-slate-600 border border-slate-100";
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium ${classes}`}
    >
      {status}
    </span>
  );
}

function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("pt-BR");
}
