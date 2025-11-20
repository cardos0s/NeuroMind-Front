import { useParams } from "react-router-dom";

export default function PatientDetails() {
  const { id } = useParams<{ id: string }>();

  // futuro: buscar paciente pela API usando o id
  const patientName = "Paciente Exemplo";

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{patientName}</h1>
          <p className="text-sm text-gray-400">
            ID: {id} • Aqui você verá dados completos, sessões e pranchas associadas.
          </p>
        </div>

        <button className="px-4 py-2 rounded-lg bg-violet-600 text-sm font-medium">
          + Registrar sessão
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-white/10 bg-white/5 rounded-xl p-4">
          <h2 className="text-sm font-semibold mb-2">Dados principais</h2>
          <p className="text-xs text-gray-400">
            No futuro, aqui vão idade, responsáveis, diagnóstico, escola, etc.
          </p>
        </div>

        <div className="border border-white/10 bg-white/5 rounded-xl p-4 md:col-span-2">
          <h2 className="text-sm font-semibold mb-2">Resumo recente</h2>
          <p className="text-xs text-gray-400">
            Sessões recentes, evolução e destaques clínicos aparecerão aqui.
          </p>
        </div>
      </div>
    </div>
  );
}
