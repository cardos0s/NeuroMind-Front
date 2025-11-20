const mockSchedule = [
  {
    day: "Segunda",
    items: [
      { time: "09:00", patient: "João da Silva", type: "TO • Clínica" },
      { time: "14:00", patient: "Maria Oliveira", type: "Fono • Escola" },
    ],
  },
  {
    day: "Terça",
    items: [
      { time: "10:30", patient: "Pedro Santos", type: "TO • Online" },
    ],
  },
  {
    day: "Quarta",
    items: [
      { time: "15:00", patient: "Ana Costa", type: "Fisio • Clínica" },
    ],
  },
  {
    day: "Quinta",
    items: [],
  },
  {
    day: "Sexta",
    items: [
      { time: "08:00", patient: "João da Silva", type: "TO • Clínica" },
      { time: "11:00", patient: "Maria Oliveira", type: "Fono • Escola" },
    ],
  },
];

export default function ProfessionalSchedule() {
  return (
    <div className="space-y-4">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Agenda</h2>
          <p className="text-xs text-gray-400">
            Visualize seus atendimentos organizados por dia da semana.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">
            Semana anterior
          </button>
          <button className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">
            Próxima semana
          </button>
          <button className="h-9 px-3 rounded-xl bg-[#6b4df5] text-white text-xs font-medium hover:bg-[#5a3fe0]">
            + Novo agendamento
          </button>
        </div>
      </div>

      {/* grade semanal */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {mockSchedule.map((col) => (
          <div
            key={col.day}
            className="bg-white rounded-2xl border border-gray-100 p-3 flex flex-col gap-2 min-h-[140px]"
          >
            <div>
              <p className="text-xs font-semibold text-gray-800">{col.day}</p>
              <p className="text-[11px] text-gray-400">
                {col.items.length > 0
                  ? `${col.items.length} atendimentos`
                  : "Sem atendimentos"}
              </p>
            </div>

            <div className="space-y-2 mt-1">
              {col.items.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-100 bg-[#f9f7ff] px-2.5 py-2"
                >
                  <p className="text-[11px] font-semibold text-gray-800">
                    {item.time} • {item.patient}
                  </p>
                  <p className="text-[11px] text-gray-500">{item.type}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
