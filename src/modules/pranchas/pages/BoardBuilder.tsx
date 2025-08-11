import { useMemo, useState } from "react";
import BoardSizeDialog from "../components/BoardSizeDialog";
import BoardGrid from "../components/BoardGrid";
import { createBoard } from "../services/boardsService";
import type { Board } from "../types/board";

export default function BoardBuilder() {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [board, setBoard] = useState<Board | null>(null);

  const emptyState = useMemo(() => (
    <div className="rounded-xl border bg-white p-8 text-center text-gray-600">
      Escolha um tamanho para gerar a prancha automaticamente.
    </div>
  ), []);

  function handleConfirm(size: any, name: string) {
    const b = createBoard(name, size);
    setBoard(b);
    setDialogOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Prancha {board ? `– ${board.name}` : ""}</h1>
          <p className="text-sm text-gray-500">Escolha o tamanho e começamos com uma grade pré‑montada.</p>
        </div>
        <button
          onClick={() => setDialogOpen(true)}
          className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
        >
          Alterar tamanho
        </button>
      </div>

      {board ? (
        <div className="rounded-xl border bg-white p-4">
          <BoardGrid board={board} />
        </div>
      ) : (
        emptyState
      )}

      <BoardSizeDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}