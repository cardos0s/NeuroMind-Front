export default function PatientBoards() {
  const boards = [
    { id: "1", name: "Rotina em casa", description: "Prancha para atividades do dia a dia." },
    { id: "2", name: "Escola", description: "Prancha para uso em sala de aula." },
  ];

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Minha comunicação</h1>
        <p className="text-sm text-gray-300">
          Acesse as pranchas que foram preparadas para você.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {boards.map((board) => (
          <div
            key={board.id}
            className="border border-white/10 bg-white/5 rounded-xl p-4 flex flex-col gap-1"
          >
            <p className="text-sm font-semibold">{board.name}</p>
            <p className="text-xs text-gray-400">{board.description}</p>
            <button className="mt-2 inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-medium bg-violet-600 hover:bg-violet-500 transition">
              Abrir prancha (futuro)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
