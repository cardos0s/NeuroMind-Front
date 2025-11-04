import { useState } from "react";
import { Search } from "lucide-react";

// mock de paciente
type PatientFeedbackView = {
  id: number;
  name: string;
  feedbacks: Array<{
    id: number;
    author: string;
    channel: string;
    sentiment: "positivo" | "neutro" | "negativo";
    text: string;
    when: string;
  }>;
};

export default function FeedbacksPage() {
  const [activeTab, setActiveTab] = useState<"overview" | string>("overview");
  const [patientTabs, setPatientTabs] = useState<PatientFeedbackView[]>([]);
  const [search, setSearch] = useState("");

  async function handleSearch() {
    const name = search.trim();
    if (!name) return;

    // aqui você chama sua API real:
    // const patient = await PatientsApi.getByName(name);
    // const feedbacks = await FeedbacksApi.listByPatient(patient.id);

    // vou simular um resultado:
    const fake: PatientFeedbackView = {
      id: Math.floor(Math.random() * 10000),
      name,
      feedbacks: [
        {
          id: 1,
          author: "Terapeuta Ana",
          channel: "Sessão",
          sentiment: "positivo",
          text: "Ótima evolução na rotina de água.",
          when: "Hoje, 15:20",
        },
        {
          id: 2,
          author: "Mãe",
          channel: "App",
          sentiment: "neutro",
          text: "Dificuldade com o botão de 'água'.",
          when: "Ontem, 19:02",
        },
      ],
    };

    // se já existe uma aba com esse nome, só ativa
    const exists = patientTabs.find((p) => p.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      setActiveTab(exists.name);
    } else {
      setPatientTabs((prev) => [...prev, fake]);
      setActiveTab(fake.name);
    }
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6">
      {/* topo */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Feedbacks</h1>
          <p className="text-sm text-slate-500">
            Acompanhe opiniões, observações clínicas e pontos de atenção por perfil.
          </p>
        </div>

        {/* barra de busca */}
        <div className="flex items-center gap-2 bg-white rounded-lg border px-3 py-1.5 w-72">
          <Search size={16} className="text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 outline-none text-sm"
            placeholder="Procurar paciente..."
          />
          <button
            onClick={handleSearch}
            className="text-xs bg-purple-600 text-white px-3 py-1 rounded-md"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* abas */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            activeTab === "overview"
              ? "bg-white shadow-sm border text-slate-900"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Visão geral
        </button>

        {patientTabs.map((p) => (
          <div key={p.id} className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab(p.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === p.name
                  ? "bg-white shadow-sm border text-slate-900"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {p.name}
            </button>
            {/* botão de fechar a aba do paciente */}
            {activeTab === p.name && (
              <button
                onClick={() => {
                  setPatientTabs((prev) => prev.filter((pt) => pt.id !== p.id));
                  setActiveTab("overview");
                }}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* conteúdo da aba */}
      {activeTab === "overview" ? (
        <FeedbacksOverview />
      ) : (
        <PatientFeedbackTab
          patient={patientTabs.find((p) => p.name === activeTab)!}
        />
      )}
    </div>
  );
}

/* ================== componentes auxiliares ================== */

function FeedbacksOverview() {
  return (
    <div className="space-y-6">
      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <p className="text-xs text-slate-500">Feedbacks no mês</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">32</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <p className="text-xs text-slate-500">Tempo médio de resposta</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">6h 40m</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <p className="text-xs text-slate-500">Positivos</p>
          <p className="text-2xl font-bold text-green-600 mt-1">71%</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <p className="text-xs text-slate-500">Negativos</p>
          <p className="text-2xl font-bold text-red-500 mt-1">9%</p>
        </div>
      </div>

      {/* bloco principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* gráfico mock */}
        <div className="bg-white rounded-xl shadow-sm border p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">
              Volume de feedbacks (semanal)
            </h2>
            <span className="text-xs text-slate-400">mock</span>
          </div>
          <div className="h-48 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-sm">
            (gráfico)
          </div>
        </div>

        {/* donut mock */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">
              Distribuição por sentimento
            </h2>
            <span className="text-xs text-slate-400">mock</span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-28 h-28 rounded-full border-[10px] border-purple-500 border-l-green-400 border-b-yellow-300"></div>
            <div className="text-xs space-y-1">
              <div className="flex gap-2 items-center">
                <span className="w-2 h-2 rounded-full bg-purple-500" /> Positivo
                71%
              </div>
              <div className="flex gap-2 items-center">
                <span className="w-2 h-2 rounded-full bg-yellow-300" /> Neutro
                20%
              </div>
              <div className="flex gap-2 items-center">
                <span className="w-2 h-2 rounded-full bg-green-400" /> Negativo
                9%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* tabela de pendentes */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800">Pendentes de resposta</h2>
          <button className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-md">
            Marcar todos como lidos
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b">
                <th className="py-2">Perfil</th>
                <th className="py-2">Autor</th>
                <th className="py-2">Canal</th>
                <th className="py-2">Sentimento</th>
                <th className="py-2">Quando</th>
                <th className="py-2 text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b last:border-0">
                <td className="py-2">João</td>
                <td className="py-2">Mãe</td>
                <td className="py-2">App</td>
                <td className="py-2">
                  <span className="px-2 py-1 rounded bg-yellow-50 text-yellow-700 text-xs">
                    neutro
                  </span>
                </td>
                <td className="py-2">Ontem, 19:02</td>
                <td className="py-2 text-right">
                  <button className="text-xs text-purple-600 hover:underline">
                    Responder
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2">Ana</td>
                <td className="py-2">Terapeuta Lucas</td>
                <td className="py-2">Relatório</td>
                <td className="py-2">
                  <span className="px-2 py-1 rounded bg-red-50 text-red-700 text-xs">
                    negativo
                  </span>
                </td>
                <td className="py-2">Seg, 10:05</td>
                <td className="py-2 text-right">
                    <button className="text-xs text-purple-600 hover:underline">
                      Responder
                    </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PatientFeedbackTab({ patient }: { patient: PatientFeedbackView }) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {patient.name}
          </h2>
          <p className="text-sm text-slate-500">
            {patient.feedbacks.length} feedback(s) encontrados para este paciente.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4">
        <h3 className="text-sm font-medium text-slate-700 mb-3">
          Feedbacks do paciente
        </h3>
        <div className="space-y-3">
          {patient.feedbacks.map((f) => (
            <div
              key={f.id}
              className="flex items-start justify-between gap-4 border rounded-lg px-4 py-3"
            >
              <div>
                <p className="text-sm text-slate-900">{f.text}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {f.author} • {f.channel} • {f.when}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  f.sentiment === "positivo"
                    ? "bg-emerald-50 text-emerald-700"
                    : f.sentiment === "negativo"
                    ? "bg-red-50 text-red-600"
                    : "bg-yellow-50 text-yellow-700"
                }`}
              >
                {f.sentiment}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
