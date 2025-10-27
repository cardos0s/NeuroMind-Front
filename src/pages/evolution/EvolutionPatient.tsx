import { useParams } from "react-router-dom";
import { useState } from "react";
import EvolutionChart from "../../components/EvolutionChart";
import { usePatientEvolution } from "../../modules/pranchas/hooks/usePatientEvolution";
import type { EvoDomain, EvoRange } from "../../modules/pranchas/hooks/useEvolutionOverview";

export default function EvolutionPatient() {
  const { patientId = "" } = useParams();
  const [range, setRange] = useState<EvoRange>("4w");
  const [domain, setDomain] = useState<EvoDomain>("comms");

  const { series, kpis, goals, notes, loading } =
    usePatientEvolution(patientId, range, domain);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Evolução do Paciente</h1>
        <div className="flex gap-2">
          <select className="border rounded-lg px-2 py-1" value={domain} onChange={e=>setDomain(e.target.value as EvoDomain)}>
            <option value="comms">Comunicação por botões</option>
            <option value="touch">Precisão no toque</option>
            <option value="attention">Atenção</option>
          </select>
          <select className="border rounded-lg px-2 py-1" value={range} onChange={e=>setRange(e.target.value as EvoRange)}>
            <option value="4w">Últimas 4 semanas</option>
            <option value="8w">8 semanas</option>
            <option value="12w">12 semanas</option>
          </select>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-4">
        <div className="font-medium text-gray-700 mb-2">Progresso</div>
        <EvolutionChart series={series} loading={loading} />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white border rounded-xl p-4">
            <div className="text-sm text-gray-500">{k.label}</div>
            <div className="text-2xl font-semibold text-purple-700">{k.value}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border rounded-xl p-4">
          <div className="font-medium mb-2">Metas</div>
          <ul className="text-sm text-gray-700 space-y-2">
            {goals.map(g => (
              <li key={g.id} className="flex justify-between">
                <div>
                  <div className="font-medium">{g.title}</div>
                  <div className="text-xs text-gray-500">Meta {g.target}%</div>
                </div>
                <div className="text-right">
                  <div className="text-purple-700 font-semibold">{g.current}%</div>
                  <div className={`text-xs ${ (g.trendPct ?? 0) >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                    {(g.trendPct ?? 0) >= 0 ? "+" : ""}{g.trendPct ?? 0}%
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <div className="font-medium mb-2">Relatórios & notas</div>
          <ul className="text-sm text-gray-700 space-y-2">
            {notes.map(n => (
              <li key={n.id}>
                <div className="text-gray-800">{n.text}</div>
                <div className="text-xs text-gray-500">por {n.author} • {n.date}</div>
              </li>
            ))}
          </ul>
          <button className="mt-3 px-3 py-2 rounded-lg border hover:bg-gray-50">
            Exportar PDF
          </button>
        </div>
      </div>
    </div>
  );
}