import { useState } from "react";
import { Search, Calendar, Download, X } from "lucide-react";

type ReportRow = {
  patient: string;
  period: string;
  sessions: number;
  hits: number;
  touches: number;
  accuracy: number; // 0 a 1
};

export default function Reports() {
  const [patient, setPatient] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [data, setData] = useState<ReportRow[]>([
    { patient: "Maria", period: "2025-08", sessions: 6, hits: 142, touches: 210, accuracy: 0.68 },
    { patient: "João", period: "2025-08", sessions: 5, hits: 101, touches: 180, accuracy: 0.56 },
    { patient: "Ana", period: "2025-08", sessions: 7, hits: 155, touches: 223, accuracy: 0.70 },
  ]);

  function handleClear() {
    setPatient("");
    setDateFrom("");
    setDateTo("");
  }

  // filtros simples
  const filtered = data.filter((row) => {
    const matchPatient =
      !patient.trim() ||
      row.patient.toLowerCase().includes(patient.toLowerCase());

    // aqui você poderia filtrar por período usando dateFrom/dateTo
    return matchPatient;
  });

  const totalSessions = filtered.reduce((acc, r) => acc + r.sessions, 0);
  const totalTouches = filtered.reduce((acc, r) => acc + r.touches, 0);
  const avgAccuracy =
    filtered.length > 0
      ? filtered.reduce((acc, r) => acc + r.accuracy, 0) / filtered.length
      : 0;

  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Relatórios</h1>
          <p className="text-sm text-slate-500">
            Filtre, visualize e exporte dados de sessões e desempenho.
          </p>
        </div>
      </div>

      {/* filtros */}
      <div className="bg-white rounded-2xl border shadow-sm p-4 flex flex-wrap gap-3 items-center">
        {/* buscar paciente */}
        <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 w-full md:w-60 border border-transparent focus-within:border-purple-200">
          <Search size={16} className="text-slate-400" />
          <input
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            className="bg-transparent outline-none text-sm flex-1"
            placeholder="Buscar paciente..."
          />
          {patient && (
            <button onClick={() => setPatient("")} className="text-slate-300 hover:text-slate-500">
              <X size={14} />
            </button>
          )}
        </div>

        {/* data de */}
        <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 w-full sm:w-48 border border-transparent focus-within:border-purple-200">
          <Calendar size={16} className="text-slate-400" />
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>

        {/* data até */}
        <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 w-full sm:w-48 border border-transparent focus-within:border-purple-200">
          <Calendar size={16} className="text-slate-400" />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>

        {/* botões */}
        <div className="flex gap-2 ml-auto">
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-lg border text-sm text-slate-600 hover:bg-slate-50"
          >
            Limpar
          </button>
          <button
            onClick={() => {
              // aqui entra tua exportação real
              console.log("export csv");
            }}
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            <Download size={16} />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* cards de resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border shadow-sm">
          <p className="text-xs text-slate-500">Total de sessões</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">
            {totalSessions}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 border shadow-sm">
          <p className="text-xs text-slate-500">Total de toques</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">
            {totalTouches}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 border shadow-sm">
          <p className="text-xs text-slate-500">Taxa média de acerto</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">
            {Math.round(avgAccuracy * 100)}%
          </p>
        </div>
      </div>

      {/* tabela */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500">
              <th className="text-left px-4 py-3">Paciente</th>
              <th className="text-left px-4 py-3">Período</th>
              <th className="text-left px-4 py-3">Sessões</th>
              <th className="text-left px-4 py-3">Acertos</th>
              <th className="text-left px-4 py-3">Toques</th>
              <th className="text-left px-4 py-3">Taxa de acerto</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr
                key={row.patient + idx}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-4 py-3 text-slate-800">{row.patient}</td>
                <td className="px-4 py-3">{row.period}</td>
                <td className="px-4 py-3">{row.sessions}</td>
                <td className="px-4 py-3">{row.hits}</td>
                <td className="px-4 py-3">{row.touches}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      row.accuracy >= 0.7
                        ? "bg-emerald-50 text-emerald-700"
                        : row.accuracy >= 0.5
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {Math.round(row.accuracy * 100)}%
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-slate-400 text-sm"
                >
                  Nenhum resultado para os filtros selecionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
