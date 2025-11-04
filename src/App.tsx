
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Profiles from "./pages/Profiles";
import Feedbacks from "./pages/Feedbacks";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import Layout from "./components/layout";
import Protected from "./routes/Protected";

import BoardBuilder from "./modules/pranchas/pages/BoardBuilder";

import PatientsList from "./pages/patients/PatientsList";
import PatientProfile from "./pages/patients/PatientProfile";

import EvolutionOverview from "./pages/evolution/EvolutionOverview";
import EvolutionPatient from "./pages/evolution/EvolutionPatient";

// OBS: PatientNew deve ser usado como modal dentro de PatientsList, não aqui como rota.

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 📂 Rotas públicas (sem layout) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ⚙️ Rotas protegidas com layout */}
        <Route element={<Protected />}>
          <Route element={<Layout />}>
            {/* Dashboard e páginas principais */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/feedbacks" element={<Feedbacks />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />

            {/* Módulo de pranchas */}
            <Route path="/pranchas" element={<BoardBuilder />} />

            {/* Pacientes */}
            <Route path="/patients" element={<PatientsList />} />
            <Route path="/patients/:id" element={<PatientProfile />} />

            {/* Evolução */}
            <Route path="/evolution" element={<EvolutionOverview />} />
            <Route path="/evolution/:patientId" element={<EvolutionPatient />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}