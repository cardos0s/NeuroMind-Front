import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../auth/session";

export default function Protected() {
  const authed = isAuthenticated();
  const location = useLocation();
  return authed ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}