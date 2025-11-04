// src/pages/patients/PatientsList.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PatientsApi } from "../../services/patients";
import type { Patient } from "../../types/patient";
import PatientNew from "./PatientNew";
import { Plus, Eye } from "lucide-react";

export default function PatientsList() {
  const nav = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false); // controla o modal

  async function load() {
    setLoading(true);
    const data = await PatientsApi.list();
    setPatients(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6">
      {/* topo */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pacientes</h1>
          <p className="text-sm text-slate-500">
            Gerencie os pacientes cadastrados na plataforma.
          </p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
        >
          <Plus size={16} />
          Novo paciente
        </button>
      </div>

      {/* cards de cima */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border">
          <p className="text-sm text-slate-500 mb-1">Total de pacientes</p>
          <p className="text-3xl font-bold text-purple-700">{patients.length}</p>
          <p className="text-xs text-slate-400 mt-2">Dados atualizados agora</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border">
          <p className="text-sm text-slate-500 mb-1">Ativos</p>
          <p className="text-3xl font-bold text-slate-900">
            {
              patients.filter((p: any) => p.status === "Admitted" || p.active).length
            }
          </p>
          <p className="text-xs text-slate-400 mt-2">Pacientes em atendimento</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border">
          <p className="text-sm text-slate-500 mb-1">Pendentes</p>
          <p className="text-3xl font-bold text-slate-900">
            {
              patients.filter((p: any) => p.status === "Pending").length
            }
          </p>
          <p className="text-xs text-slate-400 mt-2">Aguardando avaliação</p>
        </div>
      </div>

      {/* tabela */}
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="font-semibold text-slate-800">Lista de Pacientes</h2>
          {/* filtro/dia igual ao design */}
          <select className="text-xs bg-slate-100 rounded-md px-2 py-1">
            <option>Hoje</option>
            <option>Semana</option>
            <option>Mês</option>
          </select>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-gray-500">Carregando…</div>
        ) : patients.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">Nenhum paciente cadastrado.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-purple-600 text-white text-left">
                  <th className="px-4 py-3 rounded-tl-2xl">Nome</th>
                  <th className="px-4 py-3">Código</th>
                  <th className="px-4 py-3">Diagnóstico</th>
                  <th className="px-4 py-3">Cidade</th>
                  <th className="px-4 py-3 rounded-tr-2xl text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b last:border-b-0 hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 text-slate-800 font-medium">
                      {p.name}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {(p as any).code ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {(p as any).diagnoses?.join(", ") ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {(p as any).city ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => nav(`/patients/${p.id}`)}
                        className="inline-flex items-center gap-1 text-purple-700 hover:text-purple-900 text-sm"
                      >
                        <Eye size={14} />
                        Abrir perfil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL: */}
      <PatientNew
        open={showNew}
        onClose={() => setShowNew(false)}
        onCreated={(id) => {
          setShowNew(false);
          load(); // recarrega a lista
          nav(`/patients/${id}`); // se quiser já ir pro perfil
        }}
      />
    </div>
  );
}
