// src/pages/patients/PatientsList.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PatientsApi } from "../../services/patients";
import type { Patient } from "../../types/patient";
import PatientNew from "./PatientNew";

export default function PatientsList() {
  const nav = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false); // <-- controla o modal

  async function load() {
    setLoading(true);
    const data = await PatientsApi.list();
    setPatients(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Perfis de Paciente</h1>

        <button
          onClick={() => setShowNew(true)}
          className="px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
        >
          + Novo paciente
        </button>
      </div>

      {/* filtro/busca opcional aqui */}

      <div className="bg-white border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-gray-500">Carregando…</div>
        ) : patients.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">Nenhum paciente cadastrado.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3">Nome</th>
                <th className="text-left px-4 py-3">Código</th>
                <th className="text-left px-4 py-3">Diagnóstico</th>
                <th className="text-left px-4 py-3">Cidade</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3">{p.name}</td>
                  <td className="px-4 py-3">{(p as any).code ?? "—"}</td>
                  <td className="px-4 py-3">{(p as any).diagnoses?.join(", ") ?? "—"}</td>
                  <td className="px-4 py-3">{(p as any).city ?? "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => nav(`/patients/${p.id}`)}
                      className="text-purple-700 hover:underline"
                    >
                      Abrir perfil →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL: Novo paciente */}
      <PatientNew
        open={showNew}
        onClose={() => setShowNew(false)}
        onCreated={(id) => {
          setShowNew(false);
          load();             // recarrega a lista
          nav(`/patients/${id}`); // opcional: navega pro perfil criado
        }}
      />
    </div>
  );
}