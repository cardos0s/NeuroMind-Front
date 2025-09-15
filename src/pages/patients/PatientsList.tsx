import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PatientsApi } from "../../services/patients";
import type { Patient } from "../../types/patient";

import {
  Search, Filter, Plus, Pencil, ChevronLeft, ChevronRight, CircleDollarSign
} from "lucide-react";

type Status = "OP" | "IP";               // OP = outpatient, IP = inpatient
type PayStatus = "paid" | "due";

const PAGE_SIZE = 10;

function Badge({
  children,
  tone = "gray",
}: { children: React.ReactNode; tone?: "green" | "red" | "gray" }) {
  const tones: Record<string, string> = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    red: "bg-rose-50 text-rose-700 border-rose-200",
    gray: "bg-gray-50 text-gray-700 border-gray-200",
  };
  return (
    <span className={`px-2 py-0.5 text-xs border rounded-full ${tones[tone]}`}>
      {children}
    </span>
  );
}

export default function PatientsList() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await PatientsApi.list();
      setPatients(data);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return patients;
    return patients.filter((p) =>
      [
        p.name,
        (p as any).code,
        p.email,
        (p as any).city,
        (p as any).phone,
        (p as any).diagnoses?.join?.(","),
      ]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term))
    );
  }, [patients, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    // se filtrar/atualizar, mantenha página válida
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  return (
    <div className="p-6">
      {/* Topbar */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg sm:text-xl font-semibold">Patients</h1>
          <span className="text-purple-700 font-bold text-xl">
            {filtered.length}
          </span>
          <span className="text-sm text-gray-500 -ml-2">Patients</span>
        </div>

        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by patient name or code…"
              className="w-full pl-9 pr-3 py-2 rounded-lg border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>
        </div>

        <button
          type="button"
          className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-50"
          onClick={() => alert("Filtro: em breve 😉")}
        >
          <Filter className="size-4" />
          Filter
        </button>

        <button
          onClick={() => nav("/patients/new")}
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg"
        >
          <Plus className="size-4" />
          Add patient
        </button>
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Profile</th>
              <th className="text-left px-4 py-3 font-medium">Phone number</th>
              <th className="text-left px-4 py-3 font-medium">City</th>
              <th className="text-left px-4 py-3 font-medium">Gender</th>
              <th className="text-left px-4 py-3 font-medium">Diseases</th>
              <th className="text-left px-4 py-3 font-medium">Last appointment</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Payment</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>

            <tbody className="divide-y">
              {loading && (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-gray-500">
                    Carregando…
                  </td>
                </tr>
              )}

              {!loading && current.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-gray-500">
                    Nenhum paciente encontrado.
                  </td>
                </tr>
              )}

              {current.map((p) => {
                const code = (p as any).code ?? "—";
                const phone = (p as any).phone ?? "—";
                const city = (p as any).city ?? "—";
                const sex = (p as any).sex ?? (p as any).gender ?? "—";
                const diagnoses = (p as any).diagnoses?.join?.(", ") ?? "—";
                const last = (p as any).lastAppointment ?? "—";
                const status: Status | undefined = (p as any).status;
                const pay: PayStatus | undefined = (p as any).paymentStatus;

                return (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => nav(`/patients/${p.id}`)}
                  >
                    {/* Profile */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full bg-gradient-to-br from-purple-200 to-purple-400 text-white grid place-items-center font-semibold">
                          {p.name?.charAt(0)?.toUpperCase() ?? "P"}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{p.name}</div>
                          <div className="text-xs text-gray-500">{code}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-gray-700">{phone}</td>
                    <td className="px-4 py-3 text-gray-700">{city}</td>
                    <td className="px-4 py-3 text-gray-700">{sex}</td>
                    <td className="px-4 py-3 text-gray-700">{diagnoses}</td>
                    <td className="px-4 py-3 text-gray-700">{last}</td>

                    <td className="px-4 py-3">
                      {status ? (
                        <Badge tone="gray">
                          {status === "OP" ? "OP (outpatient)" : "IP (inpatient)"}
                        </Badge>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {pay ? (
                        <Badge tone={pay === "paid" ? "green" : "red"}>
                          <span className="inline-flex items-center gap-1">
                            <CircleDollarSign className="size-3.5" />
                            {pay === "paid" ? "Paid" : "Due"}
                          </span>
                        </Badge>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>

                    <td
                      className="px-4 py-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        nav(`/patients/${p.id}`);
                      }}
                    >
                      <button
                        className="p-1.5 rounded-md border hover:bg-gray-50"
                        title="Editar"
                      >
                        <Pencil className="size-4 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          className="px-2 py-1.5 rounded border disabled:opacity-40"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          <ChevronLeft className="size-4" />
        </button>

        <span className="text-sm text-gray-600">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          className="px-2 py-1.5 rounded border disabled:opacity-40"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}