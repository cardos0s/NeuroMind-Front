// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Evolution from "./pages/Evolution";
import Profiles from "./pages/Profiles";
import Layout from "./components/layout";
import BoardBuilder from "./modules/pranchas/pages/BoardBuilder";
import Protected from "./routes/Protected";
import Feedbacks from "./pages/Feedbacks";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import PatientsList from "./pages/patients/PatientsList";
import PatientNew from "./pages/patients/PatientNew.tsx";
import PatientProfile from "./pages/patients/PatientProfile.tsx";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas, sem sidebar */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {<Route path="/pranchas" element={<BoardBuilder />} /> }

        {/* Pacientes */}
          <Route path="/patients" element={<PatientsList />} />
          <Route path="/patients/new" element={<PatientNew />} />
          <Route path="/patients/:id" element={<PatientProfile />} />



         {/* protegidas */}
        <Route element={<Protected />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/evolution" element={<Evolution />} />
            <Route path="/pranchas" element={<BoardBuilder />} />
            <Route path="/feedbacks" element={<Feedbacks />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />

            

          </Route>
        </Route>
      </Routes>
    </Router>
  );
}