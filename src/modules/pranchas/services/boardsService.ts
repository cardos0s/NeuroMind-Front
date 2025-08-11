import type { Board, BoardSize, BoardCell } from "../types/board";

const KEY = "nm_boards";

function read(): Board[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}
function write(list: Board[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function listBoards(): Board[] {
  return read();
}

export function getBoard(id: string): Board | undefined {
  return read().find(b => b.id === id);
}

export function createBoard(name: string, size: BoardSize): Board {
  const now = new Date().toISOString();
  const cells: BoardCell[] = Array.from({ length: size * size }).map((_, i) => ({
    id: crypto.randomUUID(),
    label: `Item ${i + 1}`,
    color: presetColors[i % presetColors.length],
    icon: defaultIcons[i % defaultIcons.length],
  }));

  const board: Board = {
    id: crypto.randomUUID(),
    name,
    size,
    cells,
    createdAt: now,
    updatedAt: now,
  };

  const all = read();
  all.push(board);
  write(all);
  return board;
}

export function updateBoard(board: Board) {
  const all = read().map(b => (b.id === board.id ? { ...board, updatedAt: new Date().toISOString() } : b));
  write(all);
}

const presetColors = [
  "bg-purple-500","bg-rose-500","bg-emerald-500","bg-amber-500",
  "bg-sky-500","bg-fuchsia-500","bg-teal-500","bg-indigo-500",
];
const defaultIcons = ["🗣️","👍","👋","😊","💧","🍎","🚽","🧃"];