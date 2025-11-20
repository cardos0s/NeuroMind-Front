const mockPatients = [
  {
    id: 1,
    name: "João da Silva",
    context: "Clínica",
    plan: "TEA • Intensivo",
    sessionsPerWeek: 3,
    status: "Ativo",
  },
  {
    id: 2,
    name: "Maria Oliveira",
    context: "Escola",
    plan: "AC • Escolar",
    sessionsPerWeek: 2,
    status: "Pausado",
  },
  {
    id: 3,
    name: "Pedro Santos",
    context: "Casa",
    plan: "Comunicação funcional",
    sessionsPerWeek: 1,
    status: "Ativo",
  },
  {
    id: 4,
    name: "Ana Costa",
    context: "Clínica",
    plan: "Reabilitação motora",
    sessionsPerWeek: 0,
    status: "Alta",
  },
];

export default function PatientsList() {
  return (
    <div className="space-y-4">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Pacientes</h2>
          <p className="text-xs text-gray-400">
            Gerencie seus pacientes, planos e frequência de atendimento.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            className="h-9 rounded-xl bg-white border border-gray-200 px-3 text-xs outline-none focus:border-[#6b4df5] focus:ring-2 focus:ring-[#6b4df5]/20"
            placeholder="Buscar por nome..."
          />
          <select className="h-9 rounded-xl bg-white border border-gray-200 px-3 text-xs outline-none focus:border-[#6b4df5]">
            <option>Todos os status</option>
            <option>Ativo</option>
            <option>Pausado</option>
            <option>Alta</option>
          </select>
          <button className="h-9 px-3 rounded-xl bg-[#6b4df5] text-white text-xs font-medium hover:bg-[#5a3fe0]">
            + Novo paciente
          </button>
        </div>
      </div>

      {/* tabela */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-gray-50">
              <tr className="text-[11px] text-gray-400">
                <th className="py-2 pr-2 pl-4 text-left font-medium">#</th>
                <th className="py-2 pr-2 text-left font-medium">Nome</th>
                <th className="py-2 pr-2 text-left font-medium">Contexto</th>
                <th className="py-2 pr-2 text-left font-medium">Plano</th>
                <th className="py-2 pr-2 text-center font-medium">
                  Sessões/semana
                </th>
                <th className="py-2 pr-2 text-center font-medium">Status</th>
                <th className="py-2 pl-2 pr-4 text-right font-medium">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {mockPatients.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-gray-50 hover:bg-gray-50/70"
                >
                  <td className="py-2 pr-2 pl-4 text-gray-400">{p.id}</td>
                  <td className="py-2 pr-2 text-gray-800 font-medium">
                    {p.name}
                  </td>
                  <td className="py-2 pr-2 text-gray-500">{p.context}</td>
                  <td className="py-2 pr-2 text-gray-500">{p.plan}</td>
                  <td className="py-2 pr-2 text-center text-gray-700">
                    {p.sessionsPerWeek}
                  </td>
                  <td className="py-2 pr-2 text-center">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="py-2 pl-2 pr-4 text-right space-x-1">
                    <button className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-gray-100 text-gray-500 text-[11px] hover:bg-gray-200">
                      🔍
                    </button>
                    <button className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-gray-100 text-gray-500 text-[11px] hover:bg-gray-200">
                      ✏️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<
    string,
    { bg: string; text: string; border: string; label: string }
  > = {
    Ativo: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-100",
      label: "Ativo",
    },
    Pausado: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-100",
      label: "Pausado",
    },
    Alta: {
      bg: "bg-slate-50",
      text: "text-slate-600",
      border: "border-slate-100",
      label: "Alta",
    },
  };

  const style = styles[status] ?? styles["Ativo"];

  return (
    <span
      className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${style.bg} ${style.text} ${style.border}`}
    >
      {style.label}
    </span>
  );
}
