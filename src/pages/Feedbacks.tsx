import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { MessageSquare, Clock, ThumbsUp, ThumbsDown } from "lucide-react";

// cores usadas nos gráficos
const COLORS = ["#7c3aed", "#22c55e", "#f59e0b", "#ef4444"];

type FeedbackItem = {
  id: string;
  profile: string;
  author: string;       // terapeuta / familiar
  channel: "app" | "sessão" | "relatório";
  sentiment: "positivo" | "neutro" | "negativo";
  createdAt: string;    // ISO ou legível
  text: string;
  status: "pendente" | "lido" | "resolvido";
};

export default function Feedbacks() {
  // KPIs (mock)
  const stats = [
    { label: "Feedbacks no mês", value: 32, icon: MessageSquare },
    { label: "Tempo médio de resposta", value: "6h 40m", icon: Clock },
    { label: "Positivos", value: 71 + "%", icon: ThumbsUp },
    { label: "Negativos", value: 9 + "%", icon: ThumbsDown },
  ];

  // distribuição por sentimento (mock)
  const sentimentData = [
    { name: "Positivo", value: 71 },
    { name: "Neutro", value: 20 },
    { name: "Negativo", value: 9 },
  ];

  // tendência semanal de feedbacks (mock)
  const weekly = [
    { week: "Sem 1", total: 6 },
    { week: "Sem 2", total: 9 },
    { week: "Sem 3", total: 7 },
    { week: "Sem 4", total: 10 },
  ];

  // últimos feedbacks (mock)
  const recent: FeedbackItem[] = [
    {
      id: "f1",
      profile: "Maria",
      author: "Terapeuta Ana",
      channel: "sessão",
      sentiment: "positivo",
      createdAt: "Hoje, 15:20",
      text: "Ótima resposta aos botões de rotina.",
      status: "lido",
    },
    {
      id: "f2",
      profile: "João",
      author: "Mãe",
      channel: "app",
      sentiment: "neutro",
      createdAt: "Ontem, 19:02",
      text: "Dificuldade com o botão de “água”.",
      status: "pendente",
    },
    {
      id: "f3",
      profile: "Ana",
      author: "Terapeuta Lucas",
      channel: "relatório",
      sentiment: "negativo",
      createdAt: "Seg, 10:05",
      text: "Queda de precisão no toque ao final da sessão.",
      status: "pendente",
    },
  ];

  const pending = recent.filter((r) => r.status === "pendente");

  return (
    <div className="p-6 space-y-6">
      {/* Título */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Feedbacks</h2>
        <p className="text-sm text-gray-500">
          Acompanhe opiniões, observações clínicas e pontos de atenção por perfil.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white border rounded-xl p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500">{label}</div>
              <div className="text-lg font-semibold text-gray-800">{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos + Sugestões */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Card: Tendência semanal */}
        <div className="bg-white border rounded-xl p-4 xl:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Volume de feedbacks (semanal)</h3>
            <span className="text-xs text-gray-400">mock</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekly} barCategoryGap={20}>
                <XAxis dataKey="week" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Bar dataKey="total" radius={[6, 6, 0, 0]} fill="#7c3aed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card: Distribuição por sentimento */}
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Distribuição por sentimento</h3>
            <span className="text-xs text-gray-400">mock</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                >
                  {sentimentData.map((entry, idx) => (
                    <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            {sentimentData.map((s, idx) => (
              <div key={s.name} className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: COLORS[idx % COLORS.length] }}
                />
                <span className="text-gray-700">{s.name}</span>
                <span className="ml-auto text-gray-500">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Duas colunas: pendentes + recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pendentes */}
        <div className="bg-white border rounded-xl p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Pendentes de resposta</h3>
            <button className="text-xs px-2 py-1 rounded bg-purple-600 text-white hover:bg-purple-700">
              Marcar todos como lidos
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2">Perfil</th>
                  <th className="py-2">Autor</th>
                  <th className="py-2">Canal</th>
                  <th className="py-2">Sentimento</th>
                  <th className="py-2">Quando</th>
                  <th className="py-2 text-right">Ação</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="py-2 text-gray-800">{p.profile}</td>
                    <td className="py-2 text-gray-700">{p.author}</td>
                    <td className="py-2 text-gray-600 capitalize">{p.channel}</td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${
                          p.sentiment === "positivo"
                            ? "bg-green-50 text-green-700"
                            : p.sentiment === "negativo"
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {p.sentiment}
                      </span>
                    </td>
                    <td className="py-2 text-gray-500">{p.createdAt}</td>
                    <td className="py-2 text-right">
                      <button className="px-2 py-1 text-xs rounded border hover:bg-gray-50">
                        Responder
                      </button>
                    </td>
                  </tr>
                ))}
                {pending.length === 0 && (
                  <tr>
                    <td className="py-6 text-center text-gray-500" colSpan={6}>
                      Nenhum feedback pendente.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recentes */}
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Recentes</h3>
          <ul className="space-y-3">
            {recent.map((f) => (
              <li key={f.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-gray-800">
                    {f.profile} — <span className="text-gray-600">{f.author}</span>
                  </div>
                  <span className="text-xs text-gray-400">{f.createdAt}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{f.text}</p>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-gray-100 capitalize">{f.channel}</span>
                  <span
                    className={`px-2 py-0.5 rounded capitalize ${
                      f.sentiment === "positivo"
                        ? "bg-green-50 text-green-700"
                        : f.sentiment === "negativo"
                        ? "bg-red-50 text-red-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {f.sentiment}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* Ações rápidas */}
          <div className="mt-4 border-t pt-4 space-y-2">
            <h4 className="text-sm font-semibold text-gray-800">Ações rápidas</h4>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 text-sm rounded border hover:bg-gray-50">
                Exportar CSV
              </button>
              <button className="px-3 py-1.5 text-sm rounded border hover:bg-gray-50">
                Enviar resumo semanal
              </button>
              <button className="px-3 py-1.5 text-sm rounded bg-purple-600 text-white hover:bg-purple-700">
                Criar meta a partir de feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}