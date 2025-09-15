// src/components/layout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import UserMenu from "./UserMenu";
import { getUser } from "../auth/session";

export default function Layout() {
  const userName =
    getUser()?.name ??
    localStorage.getItem("userName") ??
    "Usuário"; // <-- sempre string

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="h-14 border-b bg-white flex items-center justify-between px-4">
          <h1 className="text-sm font-semibold text-gray-700">NeuroMind</h1>
          <UserMenu name={userName} /> {/* agora é string */}
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}