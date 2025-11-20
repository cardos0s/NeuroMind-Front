import { LayoutTemplate, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useBoards } from "../../../modules/boards/hooks/useBoards";
import BoardsGrid from "../../../modules/boards/components/BoardsGrid";
import BoardPreviewModal from "../../../modules/boards/components/BoardPreviewModal";

export default function BoardsListPage() {
  const {
    filteredBoards,
    categories,
    selectedBoard,
    stats,
    search,
    statusFilter,
    categoryFilter,
    setSearch,
    setStatusFilter,
    setCategoryFilter,
    openBoard,
    closeBoard,
  } = useBoards();

  return (
    <div className="w-full h-full">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl p-6 md:p-7 lg:p-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600">
              <LayoutTemplate className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold">Pranchas</h1>
              <p className="text-xs md:text-sm text-slate-500">
                Organize pranchas de comunicação para diferentes contextos e
                pacientes.
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                {stats.total} pranchas • {stats.active} ativas • {stats.drafts}{" "}
                rascunho(s)
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            {/* busca */}
            <div className="relative">
              <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs md:text-sm outline-none bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-100 focus:border-violet-400 min-w-[220px]"
                placeholder="Buscar por nome ou descrição..."
              />
            </div>

            {/* botão nova prancha (futuro: abrir BoardBuilder) */}
            <button className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#6b4df5] text-white text-xs md:text-sm font-medium shadow-sm hover:bg-[#5a3ee0] transition">
              <Plus className="h-4 w-4 mr-1" />
              Nova prancha
            </button>
          </div>
        </div>

        {/* FILTROS */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <span>Filtrar por status e categoria:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-100 focus:border-violet-400"
            >
              <option value="todos">Todos os status</option>
              <option value="Ativa">Ativas</option>
              <option value="Rascunho">Rascunhos</option>
              <option value="Arquivada">Arquivadas</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value as any)
              }
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-100 focus:border-violet-400"
            >
              <option value="todas">Todas as categorias</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* GRID DE PRANCHAS */}
        <BoardsGrid boards={filteredBoards} onBoardClick={openBoard} />
      </div>

      {/* MODAL DE PREVIEW */}
      {selectedBoard && (
        <BoardPreviewModal board={selectedBoard} onClose={closeBoard} />
      )}
    </div>
  );
}
