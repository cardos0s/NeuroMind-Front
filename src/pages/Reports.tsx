// src/pages/Reports.tsx
import { useMemo, useState } from "react";

type Row = {
  id: string;
  paciente: string;
  periodo: string;
  sessoes: number;
  acertos: number;
  toques: number;
};

const MOCK: Row[] = [
  { id: "r1", paciente: "Maria", periodo: "2025-08", sessoes: 6, acertos: 142, toques: 210 },
  { id: "r2", paciente: "João",  periodo: "2025-08", sessoes: 5, acertos: 101, toques: 180 },
  { id: "r3", paciente: "Ana",   periodo: "2025-08", sessoes: 7, acertos: 155, toques: 223 },
];

export default function Reports() {
  const [q, setQ] = useState("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const filtered = useMemo(() => {
    return MOCK.filter((r) => {
      const matchQ = q ? r.paciente.toLowerCase().includes(q.toLowerCase()) : true;
      const startOk = from ? r.periodo >= from : true;
      const endOk   = to ? r.periodo <= to : true;
      return matchQ && startOk && endOk;
    });
  }, [q, from, to]);

  const handleExportCSV = () => {
    const header = "paciente,periodo,sessoes,acertos,toques\n";
    const lines = filtered.map(r => `${r.paciente},${r.periodo},${r.sessoes},${r.acertos},${r.toques}`).join("\n");
    const blob = new Blob([header + lines], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "relatorios.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-0">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Relatórios</h2>
        <p className="text-sm text-gray-500">Filtre, visualize e exporte dados de sessões e desempenho.</p>
      </div>

      <div className="bg-white border rounded-xl p-4 mb-6">
        <div className="grid gap-3 sm:grid-cols-4">
          <input
            className="border rounded px-3 py-2 text-sm"
            placeholder="Buscar paciente…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <input
            type="month"
            className="border rounded px-3 py-2 text-sm"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="month"
            className="border rounded px-3 py-2 text-sm"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={() => { setQ(""); setFrom(""); setTo(""); }}
              className="px-3 py-2 text-sm border rounded hover:bg-gray-50"
            >
              Limpar
            </button>
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 text-sm rounded bg-purple-600 text-white hover:bg-purple-700"
            >
              Exportar CSV
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2">Paciente</th>
                <th className="py-2">Período</th>
                <th className="py-2">Sessões</th>
                <th className="py-2">Acertos</th>
                <th className="py-2">Toques</th>
                <th className="py-2">Taxa de acerto</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const acc = r.toques ? Math.round((r.acertos / r.toques) * 100) : 0;
                return (
                  <tr key={r.id} className="border-t">
                    <td className="py-2 text-gray-800">{r.paciente}</td>
                    <td className="py-2">{r.periodo}</td>
                    <td className="py-2">{r.sessoes}</td>
                    <td className="py-2">{r.acertos}</td>
                    <td className="py-2">{r.toques}</td>
                    <td className="py-2">{acc}%</td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-500">
                    Nenhum resultado para os filtros atuais.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}