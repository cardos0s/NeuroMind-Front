import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import type { UserRegisterRequest } from "../types/user";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();

 const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload: UserRegisterRequest = { name, email, password };

  try {
    const { data } = await api.post("/User/register", payload);
    const anyData = data as any;

    const token = anyData?.token;
    const user = anyData?.user;

    if (token) {
      localStorage.setItem("token", token);
    }

    if (user?.name) {
      localStorage.setItem("userName", user.name);
    } else if (anyData?.email) {
      localStorage.setItem("userName", anyData.email);
    }

    alert("Conta criada com sucesso!");
    navigate("/dashboard");
  } catch (error) {
    console.error("Erro ao registrar:", error);
    alert("Erro ao criar conta. Verifique os dados e tente novamente.");
  }
};

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Lado Esquerdo */}
     <div className="hidden md:flex md:w-1/2 bg-purple-300 justify-center items-center p-10">
       <p className="text-3xl font-semibold text-purple-900 leading-tight max-w-sm">
        Tecnologia que entende. 
        Comunicação que transforma.        </p>
      </div>

      {/* Lado Direito */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-md bg-white p-6 rounded shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Crie sua conta</h2>

          <div className="flex gap-2 mb-4">
            <button type="button" className="flex-1 border rounded py-2 text-sm">
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                className="inline mr-2"
                alt="Google"
              />
              Login com o Google
            </button>
            <button type="button" className="flex-1 border rounded py-2 text-sm">
              <img
                src="https://img.icons8.com/fluency/16/000000/facebook-new.png"
                className="inline mr-2"
                alt="Facebook"
              />
              Login com o Facebook
            </button>
          </div>

          <div className="text-center text-gray-400 my-4">— ou —</div>

          <input
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-400 text-white py-2 rounded hover:bg-teal-500 transition"
          >
            Crie sua conta
          </button>

          <p className="text-sm text-center mt-4">
            Já tem uma conta?{" "}
            <a href="/login" className="text-purple-500 font-medium">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}