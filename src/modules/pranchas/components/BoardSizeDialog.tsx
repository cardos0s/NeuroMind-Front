import { useState } from "react";
import type { BoardSize } from "../types/board";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (size: BoardSize, name: string) => void;
}

const sizes: BoardSize[] = [2, 3, 4, 5];

export default function BoardSizeDialog({ open, onClose, onConfirm }: Props) {
  const [size, setSize] = useState<BoardSize>(3);
  const [name, setName] = useState("Minha prancha");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Nova prancha</h2>

        <label className="text-sm font-medium">Nome</label>
        <input
          className="mt-1 mb-4 w-full rounded-lg border px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex.: Comunicação diária"
        />

        <label className="text-sm font-medium">Tamanho</label>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              className={`rounded-lg border px-3 py-2 text-sm ${s === size ? "border-purple-600 bg-purple-50 text-purple-700" : "hover:bg-gray-50"}`}
              onClick={() => setSize(s)}
            >
              {s} × {s}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(size, name)}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}