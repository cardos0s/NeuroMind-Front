import { useState } from "react";
// import api from "../services/api"; // (deixa comentado até ligar no backend)

type Profile = {
  name: string;
  email: string;
};

type Prefs = {
  theme: "light" | "dark" | "system";
  language: "pt-BR" | "en-US" | "es-ES";
};

type Notifs = {
  email: boolean;
  push: boolean;
  weeklySummary: boolean;
};

export default function Settings() {
  // mocks iniciais (depois você pode carregar do backend)
  const [profile, setProfile] = useState<Profile>({
    name: "Julia Cardoso",
    email: "julia@example.com",
  });

  const [prefs, setPrefs] = useState<Prefs>({
    theme: "system",
    language: "pt-BR",
  });

  const [notifs, setNotifs] = useState<Notifs>({
    email: true,
    push: false,
    weeklySummary: true,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showPasswords: false,
  });

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    // await api.put("/me/profile", profile);
    alert("Perfil atualizado (mock).");
  };

  const handleSavePrefs = async (e: React.FormEvent) => {
    e.preventDefault();
    // await api.put("/me/preferences", prefs);
    alert("Preferências salvas (mock).");
  };

  const handleSaveNotifs = async (e: React.FormEvent) => {
    e.preventDefault();
    // await api.put("/me/notifications", notifs);
    alert("Notificações atualizadas (mock).");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (security.newPassword !== security.confirmPassword) {
      alert("As senhas novas não conferem.");
      return;
    }
    // await api.post("/me/change-password", { ...security });
    alert("Senha alterada (mock).");
    setSecurity((s) => ({
      ...s,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Configurações</h2>
        <p className="text-sm text-gray-500">
          Ajuste seu perfil, preferências e segurança da conta.
        </p>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna esquerda (perfil + preferências) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Perfil */}
          <section className="bg-white border rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Perfil</h3>
            <form className="grid sm:grid-cols-2 gap-3" onSubmit={handleSaveProfile}>
              <div className="sm:col-span-1">
                <label className="block text-xs text-gray-500 mb-1">Nome</label>
                <input
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Seu nome" />
              </div>
              <div className="sm:col-span-1">
                <label className="block text-xs text-gray-500 mb-1">E-mail</label>
                <input
                  type="email"
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="voce@exemplo.com" />
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded bg-purple-600 text-white hover:bg-purple-700"
                >
                  Salvar perfil
                </button>
              </div>
            </form>
          </section>

          {/* Preferências */}
          <section className="bg-white border rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Preferências</h3>
            <form className="grid sm:grid-cols-3 gap-3" onSubmit={handleSavePrefs}>
              <div className="sm:col-span-1">
                <label className="block text-xs text-gray-500 mb-1">Tema</label>
                <select
                  className="w-full border rounded px-3 py-2 text-sm bg-white"
                  value={prefs.theme}
                  onChange={(e) =>
                    setPrefs({ ...prefs, theme: e.target.value as Prefs["theme"] })
                  }
                >
                  <option value="system">Sistema</option>
                  <option value="light">Claro</option>
                  <option value="dark">Escuro</option>
                </select>
              </div>
              <div className="sm:col-span-1">
                <label className="block text-xs text-gray-500 mb-1">Idioma</label>
                <select
                  className="w-full border rounded px-3 py-2 text-sm bg-white"
                  value={prefs.language}
                  onChange={(e) =>
                    setPrefs({ ...prefs, language: e.target.value as Prefs["language"] })
                  }
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>
              <div className="sm:col-span-1 flex items-end">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm rounded bg-purple-600 text-white hover:bg-purple-700"
                >
                  Salvar preferências
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Coluna direita (notificações + segurança) */}
        <div className="space-y-6">
          {/* Notificações */}
          <section className="bg-white border rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Notificações</h3>
            <form className="space-y-3" onSubmit={handleSaveNotifs}>
              <Toggle
                label="E-mail"
                checked={notifs.email}
                onChange={(v) => setNotifs((n) => ({ ...n, email: v }))}
              />
              <Toggle
                label="Push (navegador)"
                checked={notifs.push}
                onChange={(v) => setNotifs((n) => ({ ...n, push: v }))}
              />
              <Toggle
                label="Resumo semanal"
                checked={notifs.weeklySummary}
                onChange={(v) => setNotifs((n) => ({ ...n, weeklySummary: v }))}
              />
              <div className="pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded bg-purple-600 text-white hover:bg-purple-700"
                >
                  Salvar notificações
                </button>
              </div>
            </form>
          </section>

          {/* Segurança */}
          <section className="bg-white border rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Segurança</h3>
            <form className="space-y-3" onSubmit={handleChangePassword}>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Senha atual</label>
                <input
                  type={security.showPasswords ? "text" : "password"}
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={security.currentPassword}
                  onChange={(e) =>
                    setSecurity((s) => ({ ...s, currentPassword: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Nova senha</label>
                <input
                  type={security.showPasswords ? "text" : "password"}
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={security.newPassword}
                  onChange={(e) =>
                    setSecurity((s) => ({ ...s, newPassword: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Confirmar nova senha</label>
                <input
                  type={security.showPasswords ? "text" : "password"}
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={security.confirmPassword}
                  onChange={(e) =>
                    setSecurity((s) => ({ ...s, confirmPassword: e.target.value }))
                  }
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={security.showPasswords}
                  onChange={(e) =>
                    setSecurity((s) => ({ ...s, showPasswords: e.target.checked }))
                  }
                />
                Mostrar senhas
              </label>
              <div className="pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded bg-purple-600 text-white hover:bg-purple-700"  >
                  Alterar senha
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

/** Toggle simples para reuso */
function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4">
      <span className="text-sm text-gray-700">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition
          ${checked ? "bg-purple-600" : "bg-gray-300"}`}  >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition
            ${checked ? "translate-x-6" : "translate-x-1"}`}  />
      </button>
    </label>
  );
}