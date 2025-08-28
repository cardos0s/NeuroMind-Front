import StatCard from "../components/statcard";
import ProgressBar from "../components/progressbar";

export default function Dashboard() {
  const stats = [
    { title: "Perfis ativos", value: 3 },
    { title: "Sessões este mês", value: 24 },
    { title: "Feedbacks pendentes", value: 5 },
    { title: "Última atualização", value: "há 2h" },
  ];

  const goals = [
    { label: "Comunicação por botões", percent: 72 },
    { label: "Tempo de atenção", percent: 58 },
    { label: "Precisão no toque", percent: 64 },
  ];

  const updates = [
    { id: 1, text: "Nova sessão registrada para Maria", when: "Hoje, 14:20" },
    { id: 2, text: "Feedback do terapeuta para João", when: "Ontem, 18:03" },
    { id: 3, text: "Meta semanal concluída por Ana", when: "Seg, 10:11" },
  ];

  return (
    <div>
      {/* título */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Overview do atendimento
        </h2>
        <p className="text-sm text-gray-500">
          Resumo rápido do uso e evolução dos perfis.
        </p>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <StatCard key={s.title} title={s.title} value={s.value} />
        ))}
      </div>

      {/* duas colunas principais */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* evolução/objetivos */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">
                Evolução (últimas semanas)
              </h3>
              <span className="text-xs text-gray-400">mock</span>
            </div>
            <div className="mt-3 h-40 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 border flex items-center justify-center text-purple-700 text-sm">
              Aqui entra o gráfico (Recharts/Chart.js) – só front por enquanto
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {goals.map((g) => (
              <ProgressBar key={g.label} label={g.label} percent={g.percent} />
            ))}
          </div>
        </div>

        {/* atualizações */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-semibold text-gray-800 mb-3">
              Atualizações recentes
            </h3>
            <ul className="space-y-3">
              {updates.map((u) => (
                <li key={u.id} className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-purple-500" />
                  <div>
                    <p className="text-sm text-gray-700">{u.text}</p>
                    <p className="text-xs text-gray-400">{u.when}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-semibold text-gray-800 mb-2">
              Próximas ações
            </h3>
            <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
              <li>Revisar feedbacks pendentes</li>
              <li>Definir metas da semana para cada perfil</li>
              <li>Gerar relatório mensal (PDF)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}