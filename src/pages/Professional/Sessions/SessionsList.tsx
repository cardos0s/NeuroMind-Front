const mockSessions = [
  {
    id: 1,
    date: "Hoje • 14:00",
    patient: "João da Silva",
    type: "TO • Clínica",
    board: "Rotina manhã",
    status: "Agendado",
  },
  {
    id: 2,
    date: "Hoje • 16:00",
    patient: "Maria Oliveira",
    type: "Fono • Escola",
    board: "Comunicação básica",
    status: "Em andamento",
  },
  {
    id: 3,
    date: "Amanhã • 09:00",
    patient: "Pedro Santos",
    type: "TO • Casa (online)",
    board: "Atividades diárias",
    status: "Agendado",
  },
  {
    id: 4,
    date: "Ontem • 15:00",
    patient: "Ana Costa",
    type: "Fisio • Clínica",
    board: "Motricidade",
    status: "Concluída",
  },
];

export default function SessionsList() {
  return (
    <div className="space-y-4">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Sessões</h2>
          <p className="text-xs text-gray-400">
            Veja suas sessões, status e pranchas usadas em cada atendimento.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select className="h-9 rounded-xl bg-white border border-gray-200 px-3 text-xs outline-none focus:border-[#6b4df5]">
            <option>Hoje</option>
            <option>Próximos 7 dias</option>
            <option>Este mês</option>
          </select>
          <button className="h-9 px-3 rounded-xl bg-[#6b4df5] text-white text-xs font-medium hover:bg-[#5a3fe0]">
            + Nova sessão
          </button>
        </div>
      </div>

      {/* lista */}
      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
        {mockSessions.map((s) => (
          <div
            key={s.id}
            className="px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 hover:bg-gray-50/70"
          >
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <div className="min-w-[120px]">
                <p className="text-xs font-semibold text-gray-700">{s.date}</p>
                <p className="text-[11px] text-gray-400">Sessão #{s.id}</p>
              </div>

              <div className="flex-1">
                <p className="text-xs font-medium text-gray-900">{s.patient}</p>
                <p className="text-[11px] text-gray-400">{s.type}</p>
              </div>

              <div className="min-w-[140px]">
                <p className="text-[11px] text-gray-500">Prancha</p>
                <p className="text-xs text-gray-800">{s.board}</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <SessionStatusBadge status={s.status} />
              <button className="h-8 px-3 rounded-xl border border-gray-200 text-[11px] text-gray-600 hover:bg-gray-50">
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SessionStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Agendado":
      "bg-sky-50 text-sky-700 border border-sky-100",
    "Em andamento":
      "bg-amber-50 text-amber-700 border border-amber-100",
    "Concluída":
      "bg-emerald-50 text-emerald-700 border border-emerald-100",
  };

  const style = styles[status] ?? styles["Agendado"];

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
