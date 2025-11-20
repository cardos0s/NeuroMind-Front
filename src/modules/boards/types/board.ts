export type BoardLevel = "Iniciante" | "Intermediário" | "Avançado";
export type BoardStatus = "Ativa" | "Rascunho" | "Arquivada";

export type Board = {
  id: string;
  name: string;
  description: string;
  category: string;          // Rotina, Emoções, Escola, etc.
  level: BoardLevel;
  buttonsCount: number;
  patientsUsing: number;
  lastUpdate: string;        // ISO date
  status: BoardStatus;
  tags: string[];
};
