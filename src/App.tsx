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
import Feedbacks from "./pages/Feedbacks";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas, sem sidebar */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {<Route path="/pranchas" element={<BoardBuilder />} /> }

        {/* Rotas com layout (Sidebar aparece aqui UMA única vez) */}
        <Route element={<Layout />}>
           <Route path="/profiles" element={<Profiles />} />       
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/evolution" element={<Evolution />} />
          {<Route path="/pranchas" element={<BoardBuilder />} /> }
          <Route path="/feedbacks" element={<Feedbacks />} />
        </Route>
      </Routes>
    </Router>
  );
}