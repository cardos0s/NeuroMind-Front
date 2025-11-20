import { LayoutTemplate, Users } from "lucide-react";
import type { Board, BoardStatus } from "../types/board";

type Props = {
  boards: Board[];
  onBoardClick: (board: Board) => void;
};

export default function BoardsGrid({ boards, onBoardClick }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
      {boards.map((board) => (
        <button
          key={board.id}
          type="button"
          onClick={() => onBoardClick(board)}
          className="text-left rounded-3xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 hover:border-violet-200 transition shadow-[0_6px_18px_rgba(15,23,42,0.03)] px-4 py-4 flex flex-col gap-3"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600">
                <LayoutTemplate className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {board.name}
                </p>
                <p className="text-[11px] text-slate-500">
                  {board.category} • {board.level}
                </p>
              </div>
            </div>
            <StatusBadge status={board.status} />
          </div>

          <p className="text-[11px] text-slate-600 line-clamp-2">
            {board.description}
          </p>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>
              {board.buttonsCount} botão
              {board.buttonsCount !== 1 && "es"}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-violet-500" />
              {board.patientsUsing} paciente
              {board.patientsUsing !== 1 && "s"}
            </span>
          </div>

          {board.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {board.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-white text-[10px] text-slate-500 border border-slate-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </button>
      ))}

      {boards.length === 0 && (
        <p className="col-span-full text-center text-xs text-slate-400 py-6">
          Nenhuma prancha encontrada com os filtros atuais.
        </p>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: BoardStatus }) {
  let classes =
    "bg-slate-100 text-slate-700 border border-slate-200";

  if (status === "Ativa") {
    classes = "bg-emerald-50 text-emerald-700 border border-emerald-100";
  } else if (status === "Rascunho") {
    classes = "bg-amber-50 text-amber-700 border border-amber-100";
  } else if (status === "Arquivada") {
    classes = "bg-slate-50 text-slate-500 border border-slate-100";
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${classes}`}>
      {status}
    </span>
  );
}
