import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type SummaryCardProps = {
  label: string;
  value: string;
  helper: string;
  trend?: "up" | "down" | "neutral";
};

const weeklyData7d = [
  { day: "Seg", atendimentos: 6 },
  { day: "Ter", atendimentos: 9 },
  { day: "Qua", atendimentos: 7 },
  { day: "Qui", atendimentos: 5 },
  { day: "Sex", atendimentos: 8 },
  { day: "Sáb", atendimentos: 3 },
  { day: "Dom", atendimentos: 2 },
];

const weeklyData30d = [
  { day: "Sem 1", atendimentos: 24 },
  { day: "Sem 2", atendimentos: 29 },
  { day: "Sem 3", atendimentos: 31 },
  { day: "Sem 4", atendimentos: 27 },
];

const weeklyData3m = [
  { day: "Jan", atendimentos: 96 },
  { day: "Fev", atendimentos: 88 },
  { day: "Mar", atendimentos: 110 },
];

export default function ProfessionalDashboard() {
  const [range, setRange] = useState<"7D" | "30D" | "3M">("7D");

  const chartData =
    range === "7D"
      ? weeklyData7d
      : range === "30D"
      ? weeklyData30d
      : weeklyData3m;

  const summaryCards: SummaryCardProps[] = [
    {
      label: "Pacientes ativos",
      value: "24",
      helper: "+3 este mês",
      trend: "up",
    },
    {
      label: "Sessões nesta semana",
      value: "48",
      helper: "12 realizadas hoje",
      trend: "up",
    },
    {
      label: "Relatórios pendentes",
      value: "5",
      helper: "2 para esta semana",
      trend: "down",
    },
    {
      label: "Pranchas em uso",
      value: "18",
      helper: "6 personalizadas",
      trend: "neutral",
    },
  ];

  const patientsTable = [
    { name: "João da Silva", plan: "Comunicação funcional", status: "Ativo" },
    { name: "Maria Oliveira", plan: "Autonomia em AVD", status: "Em avaliação" },
    { name: "Pedro Santos", plan: "Regulação sensorial", status: "Ativo" },
    { name: "Ana Paula", plan: "Participação escolar", status: "Alta recente" },
  ];

  const planStatus = [
    { label: "Em andamento", color: "bg-violet-500", value: 68 },
    { label: "Em avaliação", color: "bg-amber-400", value: 18 },
    { label: "Alta / concluído", color: "bg-emerald-500", value: 14 },
  ];

  return (
    <div className="w-full h-full">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl p-6 md:p-7 lg:p-8">
        {/* HEADER */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">
              Dashboard do profissional
            </h1>
            <p className="text-xs md:text-sm text-slate-500">
              Visão geral de pacientes, sessões, pranchas e relatórios no NeuroMind.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs md:text-sm">
            <button className="px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 transition">
              Hoje
            </button>
            <button className="px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 transition">
              Esta semana
            </button>
          </div>
        </div>

        {/* CARDS RESUMO */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {summaryCards.map((card) => (
            <SummaryCard key={card.label} {...card} />
          ))}
        </div>

        {/* MEIO: GRÁFICO INTERATIVO + RESUMO RÁPIDO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Gráfico */}
          <div className="lg:col-span-2 border border-slate-100 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold">Atendimentos por período</h2>
                <p className="text-[11px] text-slate-500">
                  Número de sessões realizadas em cada período selecionado.
                </p>
              </div>
              <div className="flex gap-1 text-[11px]">
                <button
                  className={`px-2 py-1 rounded-lg ${
                    range === "7D"
                      ? "bg-violet-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                  onClick={() => setRange("7D")}
                >
                  7D
                </button>
                <button
                  className={`px-2 py-1 rounded-lg ${
                    range === "30D"
                      ? "bg-violet-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                  onClick={() => setRange("30D")}
                >
                  30D
                </button>
                <button
                  className={`px-2 py-1 rounded-lg ${
                    range === "3M"
                      ? "bg-violet-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                  onClick={() => setRange("3M")}
                >
                  3M
                </button>
              </div>
            </div>

            <div className="mt-2 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    cursor={{ stroke: "#6b4df5", strokeWidth: 1, opacity: 0.3 }}
                    contentStyle={{
                      borderRadius: 12,
                      borderColor: "#e5e7eb",
                      fontSize: 11,
                    }}
                    formatter={(value) => [`${value} atendimentos`, "Sessões"]}
                    labelFormatter={(label) => `Período: ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="atendimentos"
                    stroke="#6b4df5"
                    fill="#6b4df5"
                    fillOpacity={0.15}
                    strokeWidth={2}
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Card lateral: resumo rápido */}
          <div className="border border-slate-100 rounded-2xl p-4 space-y-3">
            <h2 className="text-sm font-semibold mb-1">
              Resumo rápido da clínica
            </h2>
            <p className="text-[11px] text-slate-500 mb-2">
              Indicadores principais da semana (mock). Em breve, conectados à sua API.
            </p>

            <QuickStat
              label="Pacientes com sessão agendada hoje"
              value="9"
              tone="primary"
            />
            <QuickStat
              label="Relatórios aguardando revisão"
              value="5"
              tone="warning"
            />
            <QuickStat
              label="Novos pacientes neste mês"
              value="4"
              tone="success"
            />
            <QuickStat
              label="Pranchas personalizadas ativas"
              value="12"
              tone="primary"
            />
          </div>
        </div>

        {/* PARTE INFERIOR: STATUS + TABELA PACIENTES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Status de planos terapêuticos */}
          <div className="border border-slate-100 rounded-2xl p-4">
            <h2 className="text-sm font-semibold mb-3">
              Status dos planos terapêuticos
            </h2>
            <div className="flex items-center justify-center mb-4">
              <div className="relative h-32 w-32">
                <div className="absolute inset-0 rounded-full border-[10px] border-slate-100" />
                <div className="absolute inset-2 rounded-full border-[10px] border-violet-400" />
                <div className="absolute inset-6 bg-white rounded-full flex flex-col items-center justify-center text-xs">
                  <span className="font-semibold">9.1k</span>
                  <span className="text-[10px] text-slate-500">
                    Sessões (mock)
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {planStatus.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${item.color}`} />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-slate-500">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabela de pacientes */}
          <div className="lg:col-span-2 border border-slate-100 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold">Pacientes em acompanhamento</h2>
              <button className="text-xs text-violet-600 hover:underline">
                Ver todos
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-[13px]">
                <thead>
                  <tr className="text-slate-400 text-left">
                    <th className="py-2 pr-4">Paciente</th>
                    <th className="py-2 pr-4">Plano principal</th>
                    <th className="py-2 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patientsTable.map((p) => (
                    <tr key={p.name} className="border-t border-slate-100">
                      <td className="py-2 pr-4">{p.name}</td>
                      <td className="py-2 pr-4 text-slate-500">{p.plan}</td>
                      <td className="py-2 pr-4">
                        <StatusBadge status={p.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTES AUXILIARES */

function SummaryCard({ label, value, helper, trend = "neutral" }: SummaryCardProps) {
  const trendColor =
    trend === "up"
      ? "text-emerald-600"
      : trend === "down"
      ? "text-rose-600"
      : "text-slate-500";

  return (
    <div className="border border-slate-100 rounded-2xl px-4 py-3 bg-slate-50/60">
      <p className="text-[11px] text-slate-500 mb-1">{label}</p>
      <p className="text-xl font-semibold mb-1">{value}</p>
      <p className={`text-[11px] ${trendColor}`}>{helper}</p>
    </div>
  );
}

function QuickStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "primary" | "warning" | "success";
}) {
  const colorMap: Record<typeof tone, string> = {
    primary: "bg-violet-100 text-violet-700",
    warning: "bg-amber-100 text-amber-700",
    success: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="flex items-center justify-between text-xs border border-slate-100 rounded-xl px-3 py-2">
      <span className="text-slate-600">{label}</span>
      <span
        className={`px-2 py-1 rounded-full text-[11px] font-medium ${colorMap[tone]}`}
      >
        {value}
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  let classes = "bg-slate-100 text-slate-700 border border-slate-200";

  if (normalized.includes("ativo")) {
    classes = "bg-emerald-100 text-emerald-700 border border-emerald-200";
  } else if (normalized.includes("avalia")) {
    classes = "bg-amber-100 text-amber-700 border border-amber-200";
  } else if (normalized.includes("alta")) {
    classes = "bg-violet-100 text-violet-700 border border-violet-200";
  }

  return (
    <span className={`px-2 py-1 rounded-full text-[11px] font-medium ${classes}`}>
      {status}
    </span>
  );
}
