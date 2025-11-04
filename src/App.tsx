import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminLogin from "./pages/Login"; // 👈 login antigo virou admin
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

// 👇 novos
import RoleSelect from "./pages/Login/RoleSelect";
import LoginProfessional from "./pages/Login/LoginProfessional";
import LoginPatient from "./pages/Login/LoginPatient";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 📂 Public routes */}
        <Route path="/" element={<Home />} />

        {/* novo fluxo de login por perfil */}
        <Route path="/login" element={<RoleSelect />} />
        <Route path="/login/professional" element={<LoginProfessional />} />
        <Route path="/login/patient" element={<LoginPatient />} />

        {/* login antigo → vira login da clínica/admin */}
        <Route path="/login/admin" element={<AdminLogin />} />

        <Route path="/register" element={<Register />} />

        {/* ⚙️ Protected routes */}
        <Route element={<Protected />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/feedbacks" element={<Feedbacks />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />

            {/* Boards */}
            <Route path="/pranchas" element={<BoardBuilder />} />

            {/* Patients */}
            <Route path="/patients" element={<PatientsList />} />
            <Route path="/patients/:id" element={<PatientProfile />} />

            {/* Evolution */}
            <Route path="/evolution" element={<EvolutionOverview />} />
            <Route path="/evolution/:patientId" element={<EvolutionPatient />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
