import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  BarChart2,
  FileText,
  MessageSquare,
  Settings,
  LayoutTemplate,
  ChevronDown,
} from "lucide-react";

const base =
  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors";
const idle = "text-white/80 hover:bg-white/10";
const active = "bg-white/15 text-white";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openPatients, setOpenPatients] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/patients")) setOpenPatients(true);
  }, [pathname]);

  // estilo de ícones (mesmo tamanho em todos)
  const iconStyle = "w-5 h-5 shrink-0";

  return (
    <aside
      className={`bg-gradient-to-b from-purple-800 to-purple-700 text-white h-screen sticky top-0 p-4
        transition-all duration-300 ${isExpanded ? "w-64" : "w-16"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <div className="flex items-center justify-center mb-8">
        <div className="text-xl font-bold">🧠</div>
        {isExpanded && (
          <div className="ml-2 text-lg font-bold whitespace-nowrap">
            NeuroMind
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="space-y-1">
        {/* Overview */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${base} ${isActive ? active : idle}`}
        >
          <Home className={iconStyle} />
          {isExpanded && "Overview"}
        </NavLink>

        {/* Pacientes */}
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setOpenPatients((v) => !v)}
            className={`${base} w-full justify-between ${
              pathname.startsWith("/patients") ? active : idle
            }`}
          >
            <span className="flex items-center gap-3">
              <Users className={iconStyle} />
              {isExpanded && "Pacientes"}
            </span>
            {isExpanded && (
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openPatients ? "rotate-180" : ""
                }`}
              />
            )}
          </button>

          {isExpanded && openPatients && (
            <ul className="ml-2 space-y-1">
              <li>
                <NavLink
                  to="/patients"
                  className={({ isActive }) =>
                    `flex items-center px-9 py-2 rounded-lg text-sm transition ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "text-white/75 hover:bg-white/5"
                    }`
                  }
                >
                  Todos os perfis
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/patients/verify"
                  className={({ isActive }) =>
                    `flex items-center px-9 py-2 rounded-lg text-sm transition ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "text-white/75 hover:bg-white/5"
                    }`
                  }
                >
                  Verificar paciente
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* Evolução */}
        <NavLink
          to="/evolution"
          className={({ isActive }) => `${base} ${isActive ? active : idle}`}
        >
          <BarChart2 className={iconStyle} />
          {isExpanded && "Evolução"}
        </NavLink>

        {/* Relatórios */}
        <NavLink
          to="/reports"
          className={({ isActive }) => `${base} ${isActive ? active : idle}`}
        >
          <FileText className={iconStyle} />
          {isExpanded && "Relatórios"}
        </NavLink>

        {/* Feedbacks */}
        <NavLink
          to="/feedbacks"
          className={({ isActive }) => `${base} ${isActive ? active : idle}`}
        >
          <MessageSquare className={iconStyle} />
          {isExpanded && "Feedbacks"}
        </NavLink>

        {/* Configurações */}
        <NavLink
          to="/settings"
          className={({ isActive }) => `${base} ${isActive ? active : idle}`}
        >
          <Settings className={iconStyle} />
          {isExpanded && "Configurações"}
        </NavLink>

        {/* Pranchas */}
        <NavLink
          to="/pranchas"
          className={({ isActive }) => `${base} ${isActive ? active : idle}`}
        >
          <LayoutTemplate className={iconStyle} />
          {isExpanded && "Pranchas"}
        </NavLink>
      </nav>
    </aside>
  );
}
