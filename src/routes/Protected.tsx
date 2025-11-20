import { Outlet } from "react-router-dom";

export default function Protected() {
  // MODO FRONT-ONLY:
  // por enquanto não bloqueia nada, só libera as rotas protegidas.
  return <Outlet />;
}
