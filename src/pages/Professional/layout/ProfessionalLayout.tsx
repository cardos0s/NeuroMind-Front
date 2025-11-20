import { Outlet, NavLink } from "react-router-dom";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LayoutTemplate,
  Users,
  UserCircle2,
} from "lucide-react";
import { useState } from "react";

type NavItem = {
  label: string;
  to: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const mainNav: NavItem[] = [
  { label: "Dashboard", to: "/professional/dashboard", icon: LayoutDashboard },
  { label: "Pacientes", to: "/professional/patients", icon: Users },
  { label: "Sessões", to: "/professional/sessions", icon: CalendarDays },
  { label: "Agenda", to: "/professional/schedule", icon: CalendarDays },
  { label: "Pranchas", to: "/professional/boards", icon: LayoutTemplate },
  { label: "Relatórios", to: "/professional/reports", icon: FileText },
];

const accountNav: NavItem[] = [
  { label: "Meu perfil", to: "/professional/profile", icon: UserCircle2 },
];

export default function ProfessionalLayout() {
  // se estiver "pinned" fica sempre aberto; se não, abre só no hover
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isExpanded = isPinned || isHovered;
  const sidebarWidth = isExpanded ? "w-64" : "w-[72px]";

  return (
    <div className="min-h-screen bg-[#f2efff] flex">
      {/* SIDEBAR */}
      <aside
        className={`${sidebarWidth} bg-white shadow-xl flex flex-col border-r border-slate-100 transition-all duration-300 ease-in-out`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* TOPO: logo + botão de pin */}
        <div className="flex items-center justify-between gap-2 px-4 pt-4 pb-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-2xl bg-violet-600 text-white flex items-center justify-center font-semibold text-xs">
              NM
            </div>
            <div
              className={`transition-opacity duration-200 ${
                isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <p className="text-[13px] font-semibold text-slate-900">
                NeuroMind
              </p>
              <p className="text-[11px] text-slate-400">
                Painel do profissional
              </p>
            </div>
          </div>

          {/* botão pin / unpin */}
          <button
            type="button"
            onClick={() => setIsPinned((prev) => !prev)}
            className={`h-7 w-7 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition ${
              isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {isPinned ? (
              <ChevronLeft className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* BUSCA – só aparece expandido */}
        <div
          className={`px-4 pb-3 transition-all duration-200 ${
            isExpanded ? "opacity-100 max-h-16" : "opacity-0 max-h-0"
          } overflow-hidden`}
        >
          <div className="relative">
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] outline-none focus:bg-white focus:ring-2 focus:ring-violet-100 focus:border-violet-400"
              placeholder="Buscar paciente, sessão..."
            />
          </div>
        </div>

        {/* SCROLL AREA */}
        <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-6">
          {/* NAVEGAÇÃO */}
          <div>
            <p
              className={`px-3 mb-2 text-[10px] font-semibold tracking-wide text-slate-400 uppercase transition-opacity duration-200 ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
            >
              Navegação
            </p>
            <nav className="space-y-1">
              {mainNav.map((item) => (
                <SidebarLink key={item.to} item={item} isExpanded={isExpanded} />
              ))}
            </nav>
          </div>

          {/* CONTA */}
          <div>
            <p
              className={`px-3 mb-2 text-[10px] font-semibold tracking-wide text-slate-400 uppercase transition-opacity duration-200 ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
            >
              Conta
            </p>
            <nav className="space-y-1">
              {accountNav.map((item) => (
                <SidebarLink key={item.to} item={item} isExpanded={isExpanded} />
              ))}
            </nav>
          </div>
        </div>

        {/* RODAPÉ – iniciais do usuário */}
        <div className="px-4 py-3 border-t border-slate-100 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-semibold">
            NM
          </div>
          <div
            className={`transition-opacity duration-200 ${
              isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <p className="text-[12px] font-medium text-slate-800">
              Profissional logado
            </p>
            <p className="text-[11px] text-slate-400">Conta NeuroMind</p>
          </div>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 min-h-screen px-4 py-4 md:px-6 md:py-6">
        <div className="h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

/* COMPONENTE DO LINK */

function SidebarLink({
  item,
  isExpanded,
}: {
  item: NavItem;
  isExpanded: boolean;
}) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      className="group flex items-center justify-center rounded-2xl px-2 py-2 text-[13px] transition-all duration-200 hover:bg-violet-50/60"
    >
      {({ isActive }) => {
        const iconClasses = [
          "inline-flex h-9 w-9 items-center justify-center rounded-2xl border transition-all duration-200",
          isActive
            ? "bg-violet-100 border-violet-200 text-violet-700"
            : "bg-slate-50 border-slate-100 text-slate-500 group-hover:bg-violet-100 group-hover:border-violet-200 group-hover:text-violet-700",
        ].join(" ");

        const labelBase =
          "whitespace-nowrap transition-all duration-200 text-slate-600 group-hover:text-violet-700";
        const labelExpanded = isExpanded
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-2 pointer-events-none absolute";
        const labelActive = isActive ? " text-violet-700 font-medium" : "";

        return (
          <div className="flex items-center justify-start gap-3 w-full">
            <span className={iconClasses}>
              <Icon className="h-4 w-4" />
            </span>

            <span className={`${labelBase} ${labelExpanded} ${labelActive}`}>
              {item.label}
            </span>
          </div>
        );
      }}
    </NavLink>
  );
}