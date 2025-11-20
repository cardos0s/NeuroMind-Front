const mockReports = [
  {
    id: 1,
    patient: "João da Silva",
    type: "Relatório de evolução",
    period: "Últimos 3 meses",
    status: "Pronto",
  },
  {
    id: 2,
    patient: "Maria Oliveira",
    type: "Devolutiva para família",
    period: "Último mês",
    status: "Rascunho",
  },
  {
    id: 3,
    patient: "Pedro Santos",
    type: "Relatório para escola",
    period: "Trimestre",
    status: "Em andamento",
  },
];

export default function ReportsHome() {
  return (
    <div className="space-y-4">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Relatórios</h2>
          <p className="text-xs text-gray-400">
            Gere e acompanhe relatórios clínicos, escolares e para famílias.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select className="h-9 rounded-xl bg-white border border-gray-200 px-3 text-xs outline-none focus:border-[#6b4df5]">
            <option>Todos os status</option>
            <option>Pronto</option>
            <option>Em andamento</option>
            <option>Rascunho</option>
          </select>
          <button className="h-9 px-3 rounded-xl bg-[#6b4df5] text-white text-xs font-medium hover:bg-[#5a3fe0]">
            + Novo relatório
          </button>
        </div>
      </div>

      {/* lista */}
      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
        {mockReports.map((r) => (
          <div
            key={r.id}
            className="px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 hover:bg-gray-50/70"
          >
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-900">
                {r.type}
              </p>
              <p className="text-[11px] text-gray-500">
                {r.patient} • {r.period}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <ReportStatusBadge status={r.status} />
              <button className="h-8 px-3 rounded-xl border border-gray-200 text-[11px] text-gray-600 hover:bg-gray-50">
                Abrir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Pronto":
      "bg-emerald-50 text-emerald-700 border border-emerald-100",
    "Em andamento":
      "bg-sky-50 text-sky-700 border border-sky-100",
    "Rascunho":
      "bg-amber-50 text-amber-700 border border-amber-100",
  };

  const style = styles[status] ?? styles["Em andamento"];

  return (
    <span
      className={
        "inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-medium " +
        style
      }
    >
      {status}
    </span>
  );
}
