export default function PatientDashboard() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Olá!</h1>
        <p className="text-sm text-gray-300">
          Aqui você vê um resumo rápido da sua evolução e acessa suas pranchas.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Minha evolução" description="Veja como você tem avançado nas sessões." />
        <Card title="Minha comunicação" description="Acesse suas pranchas e botões favoritos." />
      </div>

      <section className="border border-white/10 bg-white/5 rounded-xl p-4">
        <h2 className="text-sm font-semibold mb-2">Resumo das últimas sessões</h2>
        <p className="text-xs text-gray-400">
          Em breve, você verá aqui um resumo simples do que foi trabalhado com você nas
          últimas sessões.
        </p>
      </section>
    </div>
  );
}

function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="border border-white/10 bg-white/5 rounded-xl p-4">
      <p className="text-sm font-semibold mb-1">{title}</p>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  );
}
