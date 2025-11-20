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

type NavItem = {
  to: string;
  label: string;
  icon: ReactNode;
};

const navItems: NavItem[] = [
  {
    to: "/professional/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    to: "/professional/patients",
    label: "Pacientes",
    icon: <Users className="h-4 w-4" />,
  },
  {
    to: "/professional/sessions",
    label: "Sessões",
    icon: <ClipboardList className="h-4 w-4" />,
  },
  {
    to: "/professional/schedule",
    label: "Agenda",
    icon: <CalendarClock className="h-4 w-4" />,
  },
  {
    to: "/professional/boards",
    label: "Pranchas",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    to: "/professional/reports",
    label: "Relatórios",
    icon: <FileText className="h-4 w-4" />,
  },
];

export default function ProfessionalLayout() {
  return (
    <div className="min-h-screen w-full bg-[#f5f5ff] flex">
      {/* container geral do painel */}
      <div className="flex flex-1 bg-white shadow-[0_0_40px_rgba(0,0,0,0.04)] group">
      {/* SIDEBAR */}
<aside
  className="
    relative flex flex-col bg-[#faf9ff] border-r border-gray-200 
    transition-all duration-300
    w-20 group-hover:w-64
    overflow-hidden
  "
>
  {/* LOGO */}
  <div className="px-4 py-6 flex items-center gap-3">
    <div className="h-10 w-10 rounded-xl bg-[#6b4df5] flex items-center justify-center text-white font-bold text-sm shadow-md">
      NM
    </div>

    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <p className="text-sm font-semibold text-gray-900">NeuroMind</p>
      <p className="text-[11px] text-gray-400">Painel profissional</p>
    </div>
  </div>

  {/* NAV */}
  <nav className="flex-1 flex flex-col gap-2 mt-2 px-2">
    
    {/* label */}
    <p className="text-[10px] text-gray-400 font-semibold tracking-wide px-3 mb-1
       opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      NAVEGAÇÃO
    </p>

    {navItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.to === "/professional/dashboard"}
        className={({ isActive }) =>
          `
          group/item flex items-center gap-3 px-3 py-2 rounded-xl
          transition-all duration-200
          ${isActive
            ? "bg-[#efe8ff] text-[#6b4df5]"
            : "text-gray-600 hover:bg-white hover:text-gray-900"}
        `
        }
      >
        <span
          className={`
            flex items-center justify-center
            h-10 w-10 rounded-xl border text-[13px]
            bg-white transition-all duration-200
            border-gray-200 text-gray-500
            group-hover/item:border-[#6b4df5]/40 group-hover/item:text-[#6b4df5]
          `}
        >
          {item.icon}
        </span>

        <span
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm">
          {item.label}
        </span>
      </NavLink>
    ))}

    {/* label conta */}
    <p className="text-[10px] text-gray-400 font-semibold tracking-wide px-3 mt-4 mb-1
       opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      CONTA
    </p>

    {/* Meu perfil */}
    <NavLink
      to="/professional/profile"
      className={({ isActive }) =>
        `
        group/item flex items-center gap-3 px-3 py-2 rounded-xl
        transition-all duration-200
        ${isActive
          ? "bg-[#efe8ff] text-[#6b4df5]"
          : "text-gray-600 hover:bg-white hover:text-gray-900"}
      `
      }
    >
      <span
        className="
        flex items-center justify-center
        h-10 w-10 rounded-xl border text-[12px]
        bg-white transition-all duration-200
        border-gray-200 text-gray-500
        group-hover/item:border-[#6b4df5]/40 group-hover/item:text-[#6b4df5]
      "
      >
        <UserRound className="h-4 w-4" />
      </span>

      <span
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm">
        Meu perfil
      </span>
    </NavLink>
  </nav>

  {/* FOOTER */}
  <div className="px-4 py-4 border-t border-gray-200 flex items-center justify-between">
    <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      © 2025 NeuroMind
    </span>

    <button className="h-10 w-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-700 transition">
      <LogOut className="h-4 w-4" />
    </button>
  </div>
</aside>

        {/* MAIN */}
        <main className="flex-1 flex flex-col bg-[#fcfcff]">
          {/* Topbar simples, sem título duplicado */}
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

function NavItem({ to, label, icon }: NavItem) {
  return (
    <NavLink
      to={to}
      end={to === "/professional/dashboard"}
      className={({ isActive }) =>
        [
          "group/item flex items-center gap-3 px-2 py-2 rounded-xl text-xs font-medium transition-colors",
          isActive
            ? "bg-[#efe8ff] text-[#6b4df5]"
            : "text-gray-600 hover:bg-white hover:text-gray-900",
        ].join(" ")
      }
    >
      <span
        className={
          "h-8 w-8 rounded-xl border flex items-center justify-center text-gray-400 text-[11px] transition-colors " +
          "border-gray-200 bg-white group-hover/item:border-[#6b4df5]/40 group-hover/item:text-[#6b4df5]"
        }
      >
        {icon}
      </span>
      <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {label}
      </span>
    </NavLink>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="px-2 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      {label}
    </p>
  );
}
