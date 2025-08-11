import type { BoardCell } from "../types/board";

interface Props {
  cell: BoardCell;
  onClick?: () => void;
}

export default function BoardButton({ cell, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex aspect-square w-full flex-col items-center justify-center rounded-xl text-white shadow-sm transition ${cell.color} hover:brightness-110`}
    >
      <div className="text-2xl mb-1">{cell.icon ?? "🔊"}</div>
      <div className="px-2 text-center text-sm font-medium drop-shadow">{cell.label}</div>
    </button>
  );
}