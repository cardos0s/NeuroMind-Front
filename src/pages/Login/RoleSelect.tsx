import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Stethoscope } from "lucide-react";

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0b0218] via-[#28094a] to-[#100017] text-white px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        Choose your access type
      </motion.h1>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* PROFESSIONAL */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/login/professional")}
          className="flex flex-col items-center justify-center bg-purple-700/30 hover:bg-purple-600/40 border border-purple-500/40 rounded-2xl px-10 py-8 shadow-lg w-64 transition-all"
        >
          <Stethoscope className="w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold mb-1">Professional</h2>
          <p className="text-sm text-gray-300 text-center">
            Therapists, speech-language pathologists, occupational therapists
          </p>
        </motion.button>

        {/* PATIENT */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/login/patient")}
          className="flex flex-col items-center justify-center bg-violet-600/30 hover:bg-violet-500/40 border border-violet-500/40 rounded-2xl px-10 py-8 shadow-lg w-64 transition-all"
        >
          <User className="w-10 h-10 mb-3" />
          <h2 className="text-xl font-semibold mb-1">Patient</h2>
          <p className="text-sm text-gray-300 text-center">
            Patients and caregivers accessing reports and progress
          </p>
        </motion.button>
      </div>
    </div>
  );
}
