import { useEffect, useMemo, useState } from "react";
import type { Board, BoardStatus } from "../types/board";
import { fetchBoards } from "../services/boardRepository";

export type StatusFilter = "todos" | BoardStatus;
export type CategoryFilter = "todas" | string;

export function useBoards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilter>("todas");
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);

  useEffect(() => {
    fetchBoards().then(setBoards);
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    boards.forEach((b) => set.add(b.category));
    return Array.from(set);
  }, [boards]);

  const filteredBoards = useMemo(() => {
    return boards.filter((b) => {
      const matchesSearch =
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.description.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "todos" ? true : b.status === statusFilter;
      const matchesCategory =
        categoryFilter === "todas" ? true : b.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [boards, search, statusFilter, categoryFilter]);

  const openBoard = (board: Board) => setSelectedBoard(board);
  const closeBoard = () => setSelectedBoard(null);

  const stats = useMemo(() => {
    const total = boards.length;
    const active = boards.filter((b) => b.status === "Ativa").length;
    const drafts = boards.filter((b) => b.status === "Rascunho").length;
    const archived = boards.filter((b) => b.status === "Arquivada").length;

    return { total, active, drafts, archived };
  }, [boards]);

  return {
    boards,
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
  };
}
