import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  name: string;
};
export default function UserMenu({ name }: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
  }, [open]);

  const initial = (name?.trim()?.charAt(0) || "U").toUpperCase();

  function goSettings() {
    setOpen(false);
    navigate("/settings");
  }

  function switchUser() {
    // Mantém token? Você pode decidir.
    // Aqui vamos apenas ir pra /login e limpar o nome.
    localStorage.removeItem("userName");
    setOpen(false);
    navigate("/login");
  }

  function logout() {
    // Limpa tudo que for de sessão
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setOpen(false);
    navigate("/login");
  }

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 border rounded-lg px-3 py-1.5 hover:bg-gray-50"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-semibold">
          {initial}
        </span>
        <span className="text-sm font-medium text-gray-700">{name || "Usuário"}</span>
        <svg
          className={`size-4 text-gray-500 transition ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-xl border bg-white shadow-lg z-50 overflow-hidden"
        >
          <button
            onClick={goSettings}
            className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50"
            role="menuitem"
          >
            Configurações
          </button>
          <button
            onClick={switchUser}
            className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50"
            role="menuitem"
          >
            Trocar usuário
          </button>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
            role="menuitem"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}