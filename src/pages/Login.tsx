// src/pages/Login.tsx
import { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import api from "../services/api";
import type { LoginResponse } from "../types/auth"; // { token: string; user: { id: number; name: string; email: string } }
import { setSession } from "../auth/session";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post<LoginResponse>("/Auth/login", { email, password });
      console.log("LOGIN RESPONSE >", data); // <-- veja no DevTools

      const { token, user } = response.data;
      setSession(token, { id: user.id, name: user.name, email: user.email });
      
      if (!token) {
        alert("Login falhou: token não recebido.");
        return;
      }

      // guarda credenciais e nome do usuário
      localStorage.setItem("token", token);
      if (user?.name) {
        localStorage.setItem("userName", user.name);
      } else {
        // fallback seguro
        localStorage.setItem("userName", "Usuário");
      }

      alert(`Login realizado com sucesso! Bem-vindo, ${user.name ?? "Usuário"}.`);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      const msg =
        error?.response?.data?.message ??
        "Login failed. Please check your credentials.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
          autoComplete="email"
          inputMode="email" />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
          autoComplete="current-password" />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition disabled:opacity-50"
          aria-busy={loading} >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}