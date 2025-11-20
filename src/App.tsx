import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";

// 👇 login antigo (vira admin)
import AdminLogin from "./pages/Login";

// 👇 novas telas de login (pasta pages/Login)
import RoleSelect from "./pages/Login/RoleSelect";
import LoginProfessional from "./pages/Login/LoginProfessional";
import LoginPatient from "./pages/Login/LoginPatient";

// 👇 novas telas de registro (pasta pages/Register)
import RegisterRoleSelect from "./pages/Login/Register/RegisterRoleSelect";
import RegisterProfessional from "./pages/Login/Register/RegisterProfessional";
import RegisterPatient from "./pages/Login/Register/RegisterPatient";
import RegisterAdmin from "./pages/Register";

import Protected from "./routes/Protected";

// 🔹 ÁREA DO PROFISSIONAL (NOVO)
import ProfessionalLayout from "./pages/Professional/layout/ProfessionalLayout";
import ProfessionalDashboard from "./pages/Professional/Dashboard/ProfessionalDashboard";
import ProfessionalPatientsList from "./pages/Professional/Patients/PatientsList";
import PatientDetails from "./pages/Professional/Patients/PatientDetails";
import SessionsList from "./pages/Professional/Sessions/SessionsList";
import SessionCreate from "./pages/Professional/Sessions/SessionCreate";
import ProfessionalSchedule from "./pages/Professional/Schedule/ProfessionalSchedule";
import BoardsList from "./pages/Professional/Boards/BoardsList";
import ReportsHome from "./pages/Professional/Reports/ReportsHome";
import ProfessionalProfile from "./pages/Professional/Profile/ProfessionalProfile";



import PatientLayout from "./pages/Patient/layout/PatientLayout";
import PatientDashboard from "./pages/Patient/Dashboard/PatientDashboard";
import PatientEvolution from "./pages/Patient/Evolution/PatientEvolution";
import PatientBoards from "./pages/Patient/Boards/PatientBoards";
import PatientProfile from "./pages/Patient/Profile/PatientProfile";



export default function App() {
  return (
    <Router>
      <Routes>
        {/* 📂 Public routes */}
        <Route path="/" element={<Home />} />

        {/* 🔐 LOGIN FLOW */}
        <Route path="/login" element={<RoleSelect />} />
        <Route path="/login/professional" element={<LoginProfessional />} />
        <Route path="/login/patient" element={<LoginPatient />} />
        <Route path="/login/admin" element={<AdminLogin />} />

        {/* 📝 REGISTER FLOW */}
        <Route path="/register" element={<RegisterRoleSelect />} />
        <Route path="/register/professional" element={<RegisterProfessional />} />
        <Route path="/register/patient" element={<RegisterPatient />} />
        <Route path="/register/admin" element={<RegisterAdmin />} />

        {/* ⚙️ ÁREA LOGADA DO PROFISSIONAL */}
        <Route element={<Protected />}>
          <Route element={<ProfessionalLayout />}>
            {/* redireciona /professional → /professional/dashboard */}
            <Route
              path="/professional"
              element={
                <Navigate to="/professional/dashboard" replace />
              }
            />

            <Route
              path="/professional/dashboard"
              element={<ProfessionalDashboard />}
            />
            <Route
              path="/professional/patients"
              element={<ProfessionalPatientsList />}
            />
            <Route
              path="/professional/patients/:id"
              element={<PatientDetails />}
            />
            <Route
              path="/professional/sessions"
              element={<SessionsList />}
            />
            <Route
              path="/professional/sessions/new"
              element={<SessionCreate />}
            />
            <Route
              path="/professional/schedule"
              element={<ProfessionalSchedule />}
            />
            <Route
              path="/professional/boards"
              element={<BoardsList />}
            />
            <Route
              path="/professional/reports"
              element={<ReportsHome />}
            />
            <Route
              path="/professional/profile"
              element={<ProfessionalProfile />}
            />
          </Route>
        </Route>

       {/* PACIENTE */}
      <Route element={<PatientLayout />}>
        <Route
          path="/patient"
          element={<Navigate to="/patient/dashboard" replace />}
        />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/evolution" element={<PatientEvolution />} />
        <Route path="/patient/boards" element={<PatientBoards />} />
        <Route path="/patient/profile" element={<PatientProfile />} />
      </Route>
    

        

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
