// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="h-14 border-b bg-white flex items-center justify-between px-4">
          <h1 className="text-sm font-semibold text-gray-700">NeuroMind</h1>
          <div className="text-sm text-gray-500">Olá, Julia</div>
        </header>

        <div className="p-6">
          <Outlet /> {/* <-- as páginas internas renderizam aqui */}
        </div>
      </main>
    </div>
  );
}