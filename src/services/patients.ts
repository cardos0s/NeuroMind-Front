// src/services/patients.ts
import api from "./api";
import type { Patient, CreatePatientDTO } from "../types/patient";

let __id = 3;
let __mock: Patient[] = [
  { id: 1, name: "Maria Silva", email: "maria@email.com", birthDate: "2015-03-10" },
  { id: 2, name: "João Santos",  email: "joao@email.com",  birthDate: "2012-11-22" },
];

const useHttp = !!import.meta.env.VITE_API_URL;

export const PatientsApi = {
  async list(): Promise<Patient[]> {
    if (useHttp) {
      const { data } = await api.get<Patient[]>("/patients");
      return data;
    }
    return Promise.resolve([...__mock]);
  },

  async get(id: number): Promise<Patient | null> {
    if (useHttp) {
      const { data } = await api.get<Patient>(`/patients/${id}`);
      return data;
    }
    return Promise.resolve(__mock.find(p => p.id === id) ?? null);
  },

  async create(payload: CreatePatientDTO): Promise<Patient> {
    if (useHttp) {
      const { data } = await api.post<Patient>("/patients", payload);
      return data;
    }
    const created: Patient = { id: ++__id, ...payload };
    __mock.push(created);
    return Promise.resolve(created);
  },

  // NOVO: upload de arquivo (multipart)
  async uploadFile(patientId: number, file: File): Promise<void> {
    if (useHttp) {
      const form = new FormData();
      form.append("file", file);
      await api.post(`/patients/${patientId}/files`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return;
    }
    // mock: não faz nada, só simula sucesso
    return Promise.resolve();
  },
};