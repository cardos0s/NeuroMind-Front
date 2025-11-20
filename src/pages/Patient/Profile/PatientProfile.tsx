export default function PatientProfile() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // futuramente: enviar para a API
  };

  return (
    <div className="max-w-xl space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Meu perfil</h1>
        <p className="text-sm text-gray-300">
          Veja e atualize algumas informações básicas sobre você.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="border border-white/10 bg-white/5 rounded-xl p-4 space-y-4"
      >
        <div>
          <label className="block text-xs text-gray-300 mb-1">Nome</label>
          <input
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm outline-none focus:border-violet-500"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-300 mb-1">Quem cuida de você</label>
          <input
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm outline-none focus:border-violet-500"
            placeholder="Ex.: mãe, pai, avó, responsável..."
          />
        </div>

        <div>
          <label className="block text-xs text-gray-300 mb-1">Contato da família</label>
          <input
            className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm outline-none focus:border-violet-500"
            placeholder="Telefone ou e-mail"
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
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
