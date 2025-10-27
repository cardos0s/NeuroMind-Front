import { CheckCircle, AlertTriangle, Activity, FileText, TrendingUp } from "lucide-react";
import ClinicEvolutionChart from "../../components/charts/ClinicEvolutionChart";

export default function Evolution() {
  const handleExportPDF = () => {
    // TODO: implementar exportação (html2canvas + jsPDF) ou endpoint no backend
    // ex.: gerar PDF do container principal por id/ref
    console.log("Exportar relatório acionado");
  };

  return (
    <div className="space-y-6">
      {/* título */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-800">Relatório de Evolução</h2>
          <TrendingUp className="w-5 h-5 text-purple-600" />
        </div>
        <button
          onClick={handleExportPDF}
          className="rounded-lg bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
        >
          <span className="inline-flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Gerar Relatório PDF
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico principal: agora com o componente consolidado */}
        <div className="lg:col-span-2 bg-white border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Evolução da clínica</h3>
            <span className="text-xs text-gray-500">Últimas 12 semanas</span>
          </div>
          <div className="h-[260px]">
            <ClinicEvolutionChart fetchFromApi={false} weeks={12} />
            {/* Quando o endpoint estiver pronto: <ClinicEvolutionChart fetchFromApi weeks={12} /> */}
          </div>
        </div>

        {/* Resumo lateral */}
        <div className="bg-white border rounded-xl p-4 space-y-3">
          <h3 className="font-semibold text-gray-800 mb-2">Resumo de Sessões</h3>
          <div className="space-y-2">
            <CardRow label="Sessões realizadas" value={24} icon={<CheckCircle className="w-4 h-4 text-green-500" />} />
            <CardRow label="Feedbacks pendentes" value={5} icon={<AlertTriangle className="w-4 h-4 text-yellow-500" />} />
            <CardRow label="Último acesso" value="há 2h" icon={<Activity className="w-4 h-4 text-purple-500" />} />
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

        {/* Indicadores */}
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
          <button
            onClick={handleExportPDF}
            className="mt-3 w-full rounded-lg bg-purple-600 py-2 text-white text-sm hover:bg-purple-700"
          >
            <span className="inline-flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Exportar relatório
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function CardRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
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