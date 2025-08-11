
export type BoardSize = 2 | 3 | 4 | 5 | 6 | 7 | 8; 

export interface BoardCell {
    id: string;
    label: string;
    color: string;
    soundUrl?: string;  // futuro
    icon?: string;  
}
export interface Board {
  id: string;
  name: string;
  size: BoardSize;    // n x n
  cells: BoardCell[]; // sempre size*size
  createdAt: string;
  updatedAt: string;
}