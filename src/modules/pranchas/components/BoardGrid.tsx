import type { Board } from "../types/board";
import BoardButton from "./BoardButton";

interface Props {
  board: Board;
  onCellClick?: (cellId: string) => void;
}

const GRID_MAP = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
} as const;

export default function BoardGrid({ board, onCellClick }: Props) {
  const gridColsClass = GRID_MAP[board.size] ?? "grid-cols-5"; // fallback seguro

  return (
    <div className={`grid ${gridColsClass} gap-3`}>
      {board.cells.map((c) => (
        <BoardButton
          key={c.id}
          cell={c}
          onClick={() => onCellClick?.(c.id)}
        />
      ))}
    </div>
  );
}