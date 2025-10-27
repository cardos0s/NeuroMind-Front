// src/components/sidebar.tsx
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home, Users, BarChart2, FileText, MessageSquare, Settings, ChevronDown,
} from "lucide-react";

const linkBase =
  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors";
const linkIdle = "text-white/80 hover:bg-white/10";
const linkActive = "bg-white/15 text-white";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openPatients, setOpenPatients] = useState(false);
  const { pathname } = useLocation();

  // abre o submenu quando a rota começa com /patients
  useEffect(() => {
    if (pathname.startsWith("/patients")) setOpenPatients(true);
  }, [pathname]);

  return (
    <aside
      className={`bg-gradient-to-b from-purple-800 to-purple-700 text-white h-screen sticky top-0 p-4
        transition-all duration-300 ${isExpanded ? "w-64" : "w-16"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 py-3 mb-6">
        <div className="text-xl font-bold">🧠</div>
        {isExpanded && <div className="text-lg font-bold">NeuroMind</div>}
      </div>

      {/* Menu */}
      <nav className="space-y-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
        >
          <Home size={18} />
          {isExpanded && "Overview"}
        </NavLink>

        {/* Pacientes (item pai com submenu) */}
        <div className="space-y-1">
          {/* botão pai */}
          <button
            type="button"
            onClick={() => setOpenPatients((v) => !v)}
            className={`${linkBase} w-full justify-between ${linkIdle} ${
              pathname.startsWith("/patients") ? linkActive : ""
            }`}
            aria-expanded={openPatients}
            aria-controls="submenu-pacientes"
          >
            <span className="flex items-center gap-3">
              <Users size={18} />
              {isExpanded && "Pacientes"}
            </span>
            {isExpanded && (
              <ChevronDown
                size={16}
                className={`transition-transform ${openPatients ? "rotate-180" : ""}`}
              />
            )}
          </button>

          {/* submenu – só mostra quando expandido OU quando explicitamente aberto */}
          {(isExpanded && openPatients) && (
            <ul id="submenu-pacientes" className="ml-8 space-y-1">
              <li>
                <NavLink
                  to="/patients"
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? linkActive : linkIdle}`
                  }
                >
                  Todos os perfis
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/patients/new"
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? linkActive : linkIdle}`
                  }
                >
                  Novo paciente
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/patients/verify"
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? linkActive : linkIdle}`
                  }
                >
                  Verificar paciente
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        <NavLink
          to="/evolution"
          className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
        >
          <BarChart2 size={18} />
          {isExpanded && "Evolução"}
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
        >
          <FileText size={18} />
          {isExpanded && "Relatórios"}
        </NavLink>

        <NavLink
          to="/feedbacks"
          className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
        >
          <MessageSquare size={18} />
          {isExpanded && "Feedbacks"}
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
        >
          <Settings size={18} />
          {isExpanded && "Configurações"}
        </NavLink>

        <NavLink
          to="/pranchas"
          className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
        >
          <Settings size={18} />
          {isExpanded && "Pranchas"}
        </NavLink>
      </nav>
    </aside>
  );
}