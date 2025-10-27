// src/pages/evolution/EvolutionOverview.tsx
//import { useNavigate } from "react-router-dom";

import PatientSearchInput  from "../../components/PacientSearchInput";


export default function EvolutionOverview() {


  return (
    <div className="p-6 space-y-8">
      {/* Título */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Relatório de Evolução</h1>
        <p className="text-gray-500">Acompanhe a evolução geral dos pacientes da clínica.</p>
      </div>

      {/* Indicadores rápidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="text-sm text-gray-500">Evoluíram hoje</h2>
          <p className="text-2xl font-bold text-purple-600">12</p>
          <p className="text-xs text-gray-400">Pacientes com progresso registrado</p>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="text-sm text-gray-500">Terapia Ocupacional</h2>
          <p className="text-2xl font-bold text-purple-600">+61%</p>
          <p className="text-xs text-gray-400">Melhora média entre pacientes</p>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="text-sm text-gray-500">Comunicação</h2>
          <p className="text-2xl font-bold text-purple-600">+58%</p>
          <p className="text-xs text-gray-400">Pacientes com evolução positiva</p>
        </div>
      </div>

      {/* Gráfico (placeholder por enquanto) */}
      <div className="rounded-xl border bg-white p-6 shadow-sm h-64 grid place-items-center text-gray-400 text-sm">
        [Gráfico de evolução mensal aqui futuramente]
      </div>

      {/* Evoluções recentes */}
      <div className="rounded-xl border bg-white shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Nome</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Data</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Domínio</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Progresso</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Observação</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">Maria Silva</td>
              <td className="px-4 py-2">24/09/2025</td>
              <td className="px-4 py-2">TO</td>
              <td className="px-4 py-2 text-green-600 font-medium">+18%</td>
              <td className="px-4 py-2 text-gray-500">Aprimorou coordenação motora</td>
            </tr>
            {/* ...mais linhas depois */}
          </tbody>
        </table>
      </div>

      {/* Busca por paciente (com autocomplete) */}
      <div className="mt-8 space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Ver evolução individual
        </label>
        <PatientSearchInput />
      </div>
    </div>
  );
}