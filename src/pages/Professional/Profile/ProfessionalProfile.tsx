import { useState } from "react";
import type { ReactNode } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  ClipboardList,
  MessageSquare,
  FileText,
  UserRound,
  LogOut,
} from "lucide-react";

type NavItemConfig = {
  to: string;
  label: string;
  icon: ReactNode;
};

const navItems: NavItemConfig[] = [
  {
    to: "/professional/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    to: "/professional/patients",
    label: "Pacientes",
    icon: <Users className="h-5 w-5" />,
  },
  {
    to: "/professional/sessions",
    label: "Sessões",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    to: "/professional/schedule",
    label: "Agenda",
    icon: <CalendarClock className="h-5 w-5" />,
  },
  {
    to: "/professional/boards",
    label: "Pranchas",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    to: "/professional/reports",
    label: "Relatórios",
    icon: <FileText className="h-5 w-5" />,
  },
];

export default function ProfessionalLayout() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#f5f5ff] flex">
      <div className="flex flex-1 bg-white shadow-[0_0_40px_rgba(0,0,0,0.04)]">
        {/* SIDEBAR */}
        <aside
          className={`
            relative flex flex-col bg-[#faf9ff] border-r border-gray-200
            transition-all duration-300
            ${expanded ? "w-64" : "w-20"}
          `}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
        >
          {/* LOGO */}
          <div className="px-4 py-6 flex items-center gap-3">
            <div
              className={`
                h-10 w-10 rounded-xl bg-[#6b4df5]
                flex items-center justify-center
                text-white font-bold text-sm shadow-md
                transition-transform duration-300
                ${expanded ? "-rotate-6" : "rotate-0"}
              `}
            >
              NM
            </div>

            <div
              className={`
                transition-opacity duration-300
                ${expanded ? "opacity-100" : "opacity-0"}
              `}
            >
              <p className="text-sm font-semibold text-gray-900">NeuroMind</p>
              <p className="text-[11px] text-gray-400">Painel profissional</p>
            </div>
          </div>

          {/* NAV */}
          <nav className="flex-1 flex flex-col gap-2 mt-2 px-2">
            {/* Label navegação */}
            <p
              className={`
                text-[10px] text-gray-400 font-semibold tracking-wide px-3 mb-1
                transition-opacity duration-300
                ${expanded ? "opacity-100" : "opacity-0"}
              `}
            >
              NAVEGAÇÃO
            </p>

            {navItems.map((item) => (
              <NavItem key={item.to} config={item} expanded={expanded} />
            ))}

            {/* Label conta */}
            <p
              className={`
                text-[10px] text-gray-400 font-semibold tracking-wide px-3 mt-4 mb-1
                transition-opacity duration-300
                ${expanded ? "opacity-100" : "opacity-0"}
              `}
            >
              CONTA
            </p>

            <NavItem
              config={{
                to: "/professional/profile",
                label: "Meu perfil",
                icon: <UserRound className="h-5 w-5" />,
              }}
              expanded={expanded}
            />
          </nav>

          {/* FOOTER SIDEBAR */}
          <div className="px-4 py-4 border-t border-gray-200 flex items-center justify-between">
            <span
              className={`
                text-[10px] text-gray-400
                transition-opacity duration-300
                ${expanded ? "opacity-100" : "opacity-0"}
              `}
            >
              © {new Date().getFullYear()} NeuroMind
            </span>

            <button className="h-10 w-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-700 transition">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 flex flex-col bg-[#fcfcff]">
          {/* Topbar */}
          <header className="h-16 flex items-center justify-end px-6 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-medium text-gray-900">
                  Profissional logado
                </p>
                <p className="text-[11px] text-gray-400">Conta NeuroMind</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-[#ffe6f2] flex items-center justify-center text-xs font-semibold text-[#6b4df5]">
                NM
              </div>
            </div>
          </header>

          {/* Conteúdo das páginas */}
          <section className="flex-1 p-6 overflow-y-auto">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
}

/* NAV ITEM COM TOOLTIP E HIGHLIGHT */

type NavItemProps = {
  config: NavItemConfig;
  expanded: boolean;
};

function NavItem({ config, expanded }: NavItemProps) {
  const { to, label, icon } = config;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <NavLink
        to={to}
        end={to === "/professional/dashboard"}
        className={({ isActive }) =>
          [
            "group/item flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 relative border-l-4",
            isActive
              ? "bg-[#efe8ff] text-[#6b4df5] border-l-[#6b4df5]"
              : "text-gray-600 hover:bg-white hover:text-gray-900 border-l-transparent",
          ].join(" ")
        }
      >
        <span
          className={`
            flex items-center justify-center
            h-20 w-10 aspect-square
            rounded-xl border text-[13px]
            bg-white transition-all duration-200
            border-gray-200 text-gray-500
            group-hover/item:border-[#6b4df5]/40 group-hover/item:text-[#6b4df5]
          `}
        >
          <span className="flex items-center justify-center">
            {icon}
          </span>
        </span>

        <span
          className={`
            whitespace-nowrap text-sm
            transition-opacity duration-300
            ${expanded ? "opacity-100" : "opacity-0"}
          `}
        >
          {label}
        </span>
      </NavLink>

      {/* Tooltip quando a sidebar está colapsada */}
      {!expanded && hovered && (
        <div className="pointer-events-none absolute left-16 top-1/2 -translate-y-1/2 z-20">
          <div className="rounded-lg bg-gray-900 text-white text-[11px] px-2 py-1 shadow-lg">
            {label}
          </div>
        </div>
      )}
    </div>
  );
}
