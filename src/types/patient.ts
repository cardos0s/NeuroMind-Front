
export type Sex = 'M' | 'F' | 'X';

export interface Guardian {
  name: string;
  relation: string;   // mãe, pai, tutor…
  phone?: string;
  email?: string;
  consentMedia?: boolean;
}


export interface Patient {
  id: number;
  name: string;
  email?: string;
  birthDate?: string;
  code?: string;
  phone?: string;
  sex?: Sex;
  address?: string;
  city?: string;
  insurance?: string;
  diagnoses?: string[];
  summary?: string; // <- novo
  status?: string; 
  createdAt?:string;// ← lista de diagnósticos
}

export interface CreatePatientDTO {
  name: string;
  email?: string;
  birthDate?: string;
  code?: string;
  phone?: string;
  sex?: Sex;
  address?: string;
  city?: string;
  insurance?: string;
  summary?: string; 
  diagnoses?: string[];
}