import { X } from "lucide-react";
import type { Board } from "../types/board";

type Props = {
  board: Board;
  onClose: () => void;
};

export default function BoardPreviewModal({ board, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm md:text-base font-semibold">
              {board.name}
            </h2>
            <p className="text-[11px] text-slate-500">
              {board.category} • {board.level} •{" "}
              {board.buttonsCount} botão
              {board.buttonsCount !== 1 && "es"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* conteúdo */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {/* infos */}
          <div className="p-5 md:p-6 space-y-3 text-xs md:text-sm">
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Descrição
              </h3>
              <p className="text-slate-700">{board.description}</p>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Dados da prancha
              </h3>
              <ul className="space-y-1 text-[11px] text-slate-600">
                <li>• {board.patientsUsing} pacientes utilizando.</li>
                <li>• Atualizada em {formatDate(board.lastUpdate)}.</li>
                <li>• Status: {board.status}.</li>
              </ul>
            </div>

            {board.tags.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-1">
                  {board.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-slate-50 text-[10px] text-slate-600 border border-slate-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* preview “fake” da prancha */}
          <div className="md:col-span-2 p-5 md:p-6 flex flex-col h-full">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Preview da prancha (layout ilustrativo)
            </h3>

            <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-center">
              <div className="grid grid-cols-4 gap-2 p-4 w-full max-w-md">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-14 rounded-2xl shadow-sm border ${
                      index % 3 === 0
                        ? "bg-violet-100 border-violet-200"
                        : index % 3 === 1
                        ? "bg-emerald-100 border-emerald-200"
                        : "bg-amber-100 border-amber-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="mt-2 text-[11px] text-slate-400">
              Esta visualização é apenas ilustrativa. No futuro, aqui vai o
              preview real da prancha criada no construtor do NeuroMind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("pt-BR");
}
