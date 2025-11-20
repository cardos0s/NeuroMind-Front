const mockBoards = [
  {
    id: 1,
    name: "Rotina manhã",
    context: "Casa",
    targets: "Autonomia • Rotina",
    patients: ["João", "Maria"],
  },
  {
    id: 2,
    name: "Sala de aula",
    context: "Escola",
    targets: "Participação • Comunicação",
    patients: ["Maria"],
  },
  {
    id: 3,
    name: "Consultório TO",
    context: "Clínica",
    targets: "Atividade dirigida",
    patients: ["Pedro", "Ana"],
  },
];

export default function BoardsList() {
  return (
    <div className="space-y-4">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Pranchas</h2>
          <p className="text-xs text-gray-400">
            Organize pranchas de comunicação e vincule a pacientes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            className="h-9 rounded-xl bg-white border border-gray-200 px-3 text-xs outline-none focus:border-[#6b4df5] focus:ring-2 focus:ring-[#6b4df5]/20"
            placeholder="Buscar por prancha..."
          />
          <button className="h-9 px-3 rounded-xl bg-[#6b4df5] text-white text-xs font-medium hover:bg-[#5a3fe0]">
            + Nova prancha
          </button>
        </div>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {mockBoards.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-2xl border border-gray-100 p-3 flex flex-col gap-2"
          >
            <div>
              <p className="text-xs font-semibold text-gray-900">{b.name}</p>
              <p className="text-[11px] text-gray-400">
                Contexto: {b.context}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-gray-500">Foco da prancha</p>
              <p className="text-[11px] text-gray-800">{b.targets}</p>
            </div>

            <div>
              <p className="text-[11px] text-gray-500">Usada por</p>
              <p className="text-[11px] text-gray-800">
                {b.patients.join(", ")}
              </p>
            </div>

            <div className="flex items-center justify-between mt-1">
              <button className="h-8 px-3 rounded-xl border border-gray-200 text-[11px] text-gray-600 hover:bg-gray-50">
                Editar
              </button>
              <button className="h-8 px-3 rounded-xl bg-[#6b4df5]/10 text-[#6b4df5] text-[11px] font-medium hover:bg-[#6b4df5]/15">
                Abrir construtor
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
