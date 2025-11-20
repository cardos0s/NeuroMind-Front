import { NavLink, Outlet } from "react-router-dom";

export default function PatientLayout() {
  return (
    <div className="min-h-screen flex bg-[#0b0218] text-white">
      {/* SIDEBAR */}
      <aside className="w-60 border-r border-white/10 bg-black/30 backdrop-blur-xl flex flex-col">
        <div className="px-5 py-4 border-b border-white/10">
          <h1 className="text-lg font-bold tracking-tight">NeuroMind</h1>
          <p className="text-[11px] text-gray-300">Área do paciente</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          <NavItem to="/patient/dashboard" label="Início" />
          <NavItem to="/patient/evolution" label="Minha evolução" />
          <NavItem to="/patient/boards" label="Minha comunicação" />
          <NavItem to="/patient/profile" label="Meu perfil" />
        </nav>

        <div className="px-4 py-3 border-t border-white/10 text-[11px] text-gray-400">
          <p>Você está logado como paciente.</p>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <div>
            <h2 className="text-sm font-semibold">NeuroMind • Paciente</h2>
            <p className="text-xs text-gray-400">
              Acompanhe sua evolução e use suas pranchas de comunicação.
            </p>
          </div>
        </header>

        {/* PÁGINAS */}
        <section className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "block px-3 py-2 rounded-lg transition text-sm",
          isActive
            ? "bg-violet-600/80 text-white font-medium shadow-sm"
            : "text-gray-300 hover:bg-white/5 hover:text-white",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}
