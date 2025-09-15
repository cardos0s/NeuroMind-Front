import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PatientsApi } from "../../services/patients";
import type { Patient } from "../../types/patient";

export default function PatientProfile() {
  const { id } = useParams();
  const [p, setP] = useState<Patient | null>(null);

  useEffect(() => { (async () => setP(await PatientsApi.get(Number(id))))(); }, [id]);
  if (!p) return <div className="text-gray-500">Carregando…</div>;

  return (
    <div className="space-y-6">
      {/* Header cards */}
      <div className="grid lg:grid-cols-[1.2fr,1fr] gap-4">
        {/* Card paciente */}
        <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
          <img src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${p.name}`} className="w-16 h-16 rounded-full" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{p.name}</h3>
                <p className="text-xs text-gray-500">{p.email ?? "sem e-mail"}</p>
              </div>
              <Link to="#" className="text-sm text-purple-600 hover:underline">Editar paciente</Link>
            </div>
            <div className="mt-3 flex gap-6 text-sm">
              <div><div className="text-gray-400">Diagnóstico</div><div className="text-gray-700">{(p.diagnoses??[]).join(", ") || "—"}</div></div>
              <div><div className="text-gray-400">Status</div><div className="text-gray-700">{p.status === "inactive" ? "Inativo" : "Ativo"}</div></div>
            </div>
          </div>
        </div>

        {/* Card info rápida */}
        <div className="bg-white border rounded-xl p-4 grid grid-cols-2 gap-y-2 text-sm">
          <Info label="Gênero" value={p.sex ?? "—"} />
          <Info label="Nascimento" value={p.birthDate ?? "—"} />
          <Info label="Endereço" value={p.address ?? "—"} />
          <Info label="Cidade" value={p.city ?? "—"} />
          <Info label="Registrado em" value={p.createdAt?.slice(0,10) ?? "—"} />
          <Info label="Convênio" value={p.insurance ?? "—"} />
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="grid lg:grid-cols-[1fr,0.6fr] gap-4">
        {/* Atendimentos (placeholder) */}
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800">Atendimentos</h4>
            <button className="text-sm px-3 py-1.5 rounded-lg border">+ Add atendimento</button>
          </div>
          <table className="w-full text-sm">
            <thead className="text-gray-500">
              <tr><th className="text-left py-2">Data</th><th>Hora</th><th>Tipo</th><th>Profissional</th><th className="text-right">Notas</th></tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2">01/06/20</td>
                <td>09:00</td>
                <td>Consulta</td>
                <td>Dr. Arkadiy</td>
                <td className="text-right"><Link to="#" className="text-purple-600">Ver notas</Link></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Lateral: notas & documentos (placeholders) */}
        <div className="space-y-4">
          <div className="bg-white border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800">Notas</h4>
              <Link to="#" className="text-xs text-gray-500 hover:underline">Ver todas</Link>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="p-3 rounded-lg bg-gray-50 border">Solicitar exames complementares.<div className="text-xs text-gray-400">por Dr. Gabriel • 27/11/2027</div></li>
              <li className="p-3 rounded-lg bg-gray-50 border">Atenção à alergia à penicilina.<div className="text-xs text-gray-400">por Enf. Laura • 20/11/2027</div></li>
            </ul>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800">Documentos</h4>
              <button className="text-sm px-3 py-1.5 rounded-lg border">+ Adicionar</button>
            </div>
            <ul className="text-sm space-y-2">
              <li className="flex items-center justify-between border rounded-lg px-3 py-2">
                <span>Exames de sangue.pdf</span><span className="text-gray-400">27 kb</span>
              </li>
              <li className="flex items-center justify-between border rounded-lg px-3 py-2">
                <span>Receita médica.pdf</span><span className="text-gray-400">91 kb</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-gray-400">{label}</div>
    <div className="text-gray-700">{value || "—"}</div>
  </div>
);