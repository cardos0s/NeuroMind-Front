import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CheckCircle, AlertTriangle, Activity, FileText, TrendingUp } from "lucide-react";

const data = [
  { week: "Semana 1", progresso: 45 },
  { week: "Semana 2", progresso: 60 },
  { week: "Semana 3", progresso: 75 },
  { week: "Semana 4", progresso: 83 },
];

export default function Evolution() {
  return (
    <div className="space-y-6">
      {/* título */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Relatório de Evolução</h2>
         <TrendingUp className="w-5 h-5 text-purple-600" />
        <button className="rounded-lg bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700">
          Gerar Relatório PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico principal */}
        <div className="lg:col-span-2 bg-white border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Progresso do Paciente</h3>
            <span className="text-xs text-gray-500">Últimas 4 semanas</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="progresso" stroke="#7C3AED" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Resumo lateral */}
        <div className="bg-white border rounded-xl p-4 space-y-3">
          <h3 className="font-semibold text-gray-800 mb-2">Resumo de Sessões</h3>
          <div className="space-y-2">
            <CardRow label="Sessões realizadas" value="24" icon={<CheckCircle className="text-green-500" />} />
            <CardRow label="Feedbacks pendentes" value="5" icon={<AlertTriangle className="text-yellow-500" />} />
            <CardRow label="Último acesso" value="há 2h" icon={<Activity className="text-purple-500" />} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sugestões automáticas */}
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Sugestões de Melhorias</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Trabalhar atenção sustentada</span>
              <span className="text-green-600">+12%</span>
            </li>
            <li className="flex justify-between">
              <span>Exercícios de comunicação alternativa</span>
              <span className="text-green-600">+9%</span>
            </li>
            <li className="flex justify-between">
              <span>Revisar precisão no toque</span>
              <span className="text-red-500">-4%</span>
            </li>
          </ul>
        </div>

        {/* Relatório de desempenho */}
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Indicadores de Desempenho</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Comunicação por botões</span>
              <span className="text-purple-600 font-medium">72%</span>
            </li>
            <li className="flex justify-between">
              <span>Precisão no toque</span>
              <span className="text-purple-600 font-medium">64%</span>
            </li>
            <li className="flex justify-between">
              <span>Tempo de atenção</span>
              <span className="text-purple-600 font-medium">58%</span>
            </li>
          </ul>
        </div>

        {/* Ações recomendadas */}
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Próximas Ações</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            <li>Agendar nova avaliação</li>
            <li>Gerar relatório semanal</li>
            <li>Enviar feedback para terapeuta</li>
          </ol>
          <button className="mt-3 w-full rounded-lg bg-purple-600 py-2 text-white text-sm hover:bg-purple-700">
            <FileText className="inline size-4 mr-1" /> Exportar relatório
          </button>
        </div>
      </div>
    </div>
  );
}

function CardRow({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg border bg-gray-50">
      <div className="flex items-center gap-2 text-sm text-gray-700">
        {icon}
        {label}
      </div>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}