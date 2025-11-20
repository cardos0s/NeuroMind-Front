export default function SessionCreate() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // futuramente: enviar para a API
    console.log("Salvar sessão (futuro)");
  };

  return (
    <div className="max-w-3xl space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Registrar sessão</h1>
        <p className="text-sm text-gray-400">
          Preencha os dados principais da sessão realizada.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="border border-white/10 bg-white/5 rounded-xl p-4 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-300 mb-1">Paciente</label>
            <input
              className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm outline-none focus:border-violet-500"
              placeholder="Selecione ou busque (futuro)"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-300 mb-1">Data & horário</label>
            <input
              type="datetime-local"
              className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm outline-none focus:border-violet-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-300 mb-1">Tipo de sessão</label>
          <input
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm outline-none focus:border-violet-500"
            placeholder="Ex.: TO, Fono, Escola, Psicologia..."
          />
        </div>

        <div>
          <label className="block text-xs text-gray-300 mb-1">
            Objetivos / foco da sessão
          </label>
          <input
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm outline-none focus:border-violet-500"
            placeholder="Ex.: comunicação funcional, autonomia em AVD, regulação..."
          />
        </div>

        <div>
          <label className="block text-xs text-gray-300 mb-1">Descrição da sessão</label>
          <textarea
            rows={5}
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm outline-none focus:border-violet-500 resize-none"
            placeholder="Descreva os principais eventos, respostas do paciente, adaptações e resultados."
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            className="px-4 py-2 rounded-lg text-sm border border-white/20 text-gray-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-violet-600 hover:bg-violet-500"
          >
            Salvar sessão
          </button>
        </div>
      </form>
    </div>
  );
}
