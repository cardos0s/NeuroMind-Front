// src/pages/patients/Patients.tsx
import PatientNew from "./PatientNew";
import { useState, useEffect } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";

type Patient = {
  id?: string;
  name: string;
  age?: number;
  date?: string;
  time?: string;
  phone?: string;
  department?: string;
  status?: "Admitted" | "Discharged" | string;
};

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [openNew, setOpenNew] = useState(false);

  useEffect(() => {
    // mock só pra layout
    setPatients([
      {
        id: "1",
        name: "Maria Silva",
        age: 23,
        date: "12-03-2024",
        time: "10:30 AM",
        phone: "(11) 99999-9999",
        department: "Fonoaudiologia",
        status: "Admitted",
      },
      {
        id: "2",
        name: "João Santos",
        age: 7,
        date: "12-04-2024",
        time: "11:00 AM",
        phone: "(11) 98888-7777",
        department: "TO",
        status: "Discharged",
      },
    ]);
  }, []);

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* topo */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pacientes</h1>
          <p className="text-sm text-slate-500">
            Acompanhe os pacientes cadastrados e os atendimentos.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setOpenNew(true)}
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            <Plus size={16} />
            Novo paciente
          </button>
        </div>
      </div>

      {/* linha de cards/gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* gráfico 1 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-800">Pacientes na semana</h2>
            <select className="text-xs bg-slate-100 rounded-md px-2 py-1">
              <option>Semana</option>
              <option>Hoje</option>
            </select>
          </div>
          <div className="h-40 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-sm">
            (gráfico aqui)
          </div>
        </div>

        {/* gráfico 2 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-800">Taxa de sucesso</h2>
            <select className="text-xs bg-slate-100 rounded-md px-2 py-1">
              <option>Semana</option>
              <option>Mês</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full border-[10px] border-purple-500 border-b-purple-200 border-r-purple-200 flex items-center justify-center text-sm font-semibold text-slate-800">
              100%
            </div>
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
                Sucesso
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-200" />
                Falha
              </div>
            </div>
          </div>
        </div>

        {/* info rápida */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-slate-800 mb-2">Resumo</h2>
            <p className="text-sm text-slate-500">
              Total de pacientes da clínica.
            </p>
          </div>
          <div className="flex gap-3 mt-4">
            <div className="flex-1 bg-purple-50 rounded-xl p-3">
              <p className="text-xs text-slate-500">Pacientes</p>
              <p className="text-2xl font-bold text-purple-700">
                {patients.length}
              </p>
            </div>
            <div className="flex-1 bg-slate-100 rounded-xl p-3">
              <p className="text-xs text-slate-500">Ativos</p>
              <p className="text-2xl font-bold text-slate-800">
                {patients.filter((p) => p.status === "Admitted").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* tabela */}
      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="font-semibold text-slate-800">Lista de Pacientes</h2>
          <select className="text-xs bg-slate-100 rounded-md px-2 py-1">
            <option>Hoje</option>
            <option>Semana</option>
            <option>Mês</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-purple-600 text-white text-left text-sm">
                <th className="px-4 py-3 rounded-tl-2xl">Nome</th>
                <th className="px-4 py-3">Idade</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Hora</th>
                <th className="px-4 py-3">Contato</th>
                <th className="px-4 py-3">Setor</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-tr-2xl text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr
                  key={p.id}
                  className="border-b last:border-b-0 hover:bg-slate-50"
                >
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">
                    {p.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {p.age ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {p.date ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {p.time ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {p.phone ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {p.department ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {p.status === "Admitted" ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs">
                        Ativo
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs">
                        Inativo
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    <div className="inline-flex gap-2">
                      <button className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200">
                        <Pencil size={14} />
                      </button>
                      <button className="p-1.5 rounded-full bg-red-100 hover:bg-red-200 text-red-600">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-sm text-slate-400"
                    colSpan={8}
                  >
                    Nenhum paciente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* modal do botão */}
      <PatientNew
        open={openNew}
        onClose={() => setOpenNew(false)}
        onCreated={() => {
          // aqui você pode recarregar a lista de verdade
          setOpenNew(false);
        }}
      />
    </div>
  );
}
