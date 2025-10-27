import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

interface Patient {
  id: number;
  name: string;
}

export default function PatientSearchInput() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length >= 2) {
        setLoading(true);
        fetch(`/api/patients?search=${query}`)
          .then(res => res.json())
          .then(setResults)
          .finally(() => setLoading(false));
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  function handleSelect(patient: Patient) {
    setQuery("");
    setResults([]);
    setShowDropdown(false);
    navigate(`/evolution/${patient.id}`);
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center gap-2">
        <Search className="text-gray-400" size={18} />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          placeholder="Buscar paciente por nome ou ID"
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
      </div>

      {showDropdown && results.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.map((patient) => (
            <li
              key={patient.id}
              onClick={() => handleSelect(patient)}
              className="px-4 py-2 hover:bg-purple-50 cursor-pointer text-sm text-gray-700"
            >
              {patient.name} <span className="text-gray-400">#{patient.id}</span>
            </li>
          ))}
        </ul>
      )}

      {showDropdown && !loading && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow p-2 text-sm text-gray-500">
          Nenhum paciente encontrado.
        </div>
      )}
    </div>
  );
}