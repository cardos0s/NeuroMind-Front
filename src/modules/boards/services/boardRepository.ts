import type { Board } from "../types/board";

const boardsMock: Board[] = [
  {
    id: "1",
    name: "Rotina da manhã",
    description: "Sequência simples para acordar, escovar dentes e ir para escola.",
    category: "Rotina diária",
    level: "Iniciante",
    buttonsCount: 8,
    patientsUsing: 5,
    lastUpdate: "2025-11-10",
    status: "Ativa",
    tags: ["crianças", "TEA", "autonomia"],
  },
  {
    id: "2",
    name: "Emoções básicas",
    description: "Prancha com emoções (feliz, triste, bravo, com medo...).",
    category: "Emoções",
    level: "Intermediário",
    buttonsCount: 12,
    patientsUsing: 7,
    lastUpdate: "2025-11-15",
    status: "Ativa",
    tags: ["regulação emocional", "escola"],
  },
  {
    id: "3",
    name: "Recreio na escola",
    description: "Opções de brincadeiras, colegas e preferências no recreio.",
    category: "Escola",
    level: "Intermediário",
    buttonsCount: 10,
    patientsUsing: 3,
    lastUpdate: "2025-10-30",
    status: "Rascunho",
    tags: ["escola", "socialização"],
  },
  {
    id: "4",
    name: "Consulta médica",
    description: "Ajuda a explicar dor, desconfortos e procedimentos.",
    category: "Saúde",
    level: "Avançado",
    buttonsCount: 15,
    patientsUsing: 2,
    lastUpdate: "2025-09-20",
    status: "Arquivada",
    tags: ["hospital", "dor", "ansiedade"],
  },
];

export async function fetchBoards(): Promise<Board[]> {
  // futuro: GET /boards
  return boardsMock;
}
