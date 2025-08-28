import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Calendar, FileText, Plus, MessageSquare, Edit3 } from "lucide-react";

type Patient = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  gender?: string;
  birthDate?: string;
  phone?: string;
  address?: string;
  city?: string;
  insurance?: string;
  registeredAt?: string;
  status?: "active" | "inactive";
  stats?: { past: number; upcoming: number };
};

type Note = { id: string; text: string; author: string; date: string };
type Doc = { id: string; name: string; size: string };
type Appointment = {
  id: string; date: string; time: string; type: string; doctor: string; nurse?: string; notes?: string;
};
type Payment = { id: string; label: string; amount: number };

const currency = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function PatientProfile() {
  const { id } = useParams(); // futuramente buscar da API com esse id

  // ------- MOCKS (substituir por fetch/RTK/React-Query depois) -------
  const patient: Patient = useMemo(() => ({
    id: id ?? "1",
    name: "Kate Enderson",
    email: "kenderson@gmail.com",
    avatarUrl: "https://i.pravatar.cc/120?img=47",
    gender: "Feminino",
    birthDate: "1992-10-30",
    phone: "(44) 5995-7777",
    address: "Rua das Flores, 100",
    city: "Curitiba",
    insurance: "DentiTech",
    registeredAt: "2023-05-06",
    status: "active",
    stats: { past: 15, upcoming: 4 },
  }), [id]);

  const notes: Note[] = [
    { id: "n1", text: "Solicitar exames complementares.", author: "Dr. Gabriel", date: "27/11/2027" },
    { id: "n2", text: "Atenção a alergia a penicilina.", author: "Enf. Laura", date: "20/11/2027" },
  ];

  const docs: Doc[] = [
    { id: "d1", name: "Exames de sangue.pdf", size: "27 kb" },
    { id: "d2", name: "Receita médica 09-08.pdf", size: "91 kb" },
    { id: "d3", name: "Raio-X 02.pdf", size: "27 kb" },
  ];

  const appts: Appointment[] = [
    { id: "a1", date: "01/06/20", time: "09:00", type: "Consulta", doctor: "Dr. Arkadiy Ch.", nurse: "Loren", notes: "Retorno" },
    { id: "a2", date: "01/06/20", time: "09:30", type: "Procedimento", doctor: "Dr. Arkadiy Ch.", nurse: "Loren" },
  ];

  const payments: Payment[] = [
    { id: "p1", label: "Consulta com médico", amount: 205 },
    { id: "p2", label: "Medicação", amount: 65 },
    { id: "p3", label: "Consulta com doutor", amount: 35 },
  ];
  // -------------------------------------------------------------------

  const totalPayments = payments.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Topbar da página */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="size-4" />
          <span>{new Date().toLocaleString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
            <MessageSquare className="size-4" />
            Enviar mensagem
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-sm text-white hover:bg-purple-700">
            <Plus className="size-4" />
            Nova consulta
          </button>
        </div>
      </div>

      {/* Cabeçalho do paciente */}
      <section className="rounded-xl border bg-white p-4">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* card do paciente */}
          <div className="flex-1 rounded-lg border bg-white p-4">
            <div className="flex items-center gap-4">
              <img src={patient.avatarUrl} className="size-16 rounded-full object-cover" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{patient.name}</h2>
                <p className="text-sm text-gray-500">{patient.email}</p>

                <div className="mt-3 grid grid-cols-2 gap-6 text-center text-sm">
                  <div>
                    <div className="text-xl font-semibold">{patient.stats?.past}</div>
                    <div className="text-gray-500">Passadas</div>
                  </div>
                  <div>
                    <div className="text-xl font-semibold">{patient.stats?.upcoming}</div>
                    <div className="text-gray-500">Próximas</div>
                  </div>
                </div>
              </div>
              <div className="ms-auto">
                <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
                  <Edit3 className="size-4" />
                  Editar paciente
                </button>
              </div>
            </div>
          </div>

          {/* dados rápidos */}
          <div className="flex-[1.6] rounded-lg border bg-white p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <Field label="Gênero" value={patient.gender} />
              <Field label="Nascimento" value={formatDate(patient.birthDate)} />
              <Field label="Telefone" value={patient.phone} />
              <Field label="Endereço" value={patient.address} />
              <Field label="Cidade" value={patient.city} />
              <Field label="Convênio" value={patient.insurance} />
              <Field label="Registrado em" value={formatDate(patient.registeredAt)} />
              <Field label="Status" value={patient.status === "active" ? "Ativo" : "Inativo"} />
            </div>
          </div>

          {/* documentos rápidos */}
          <div className="w-full md:w-72 rounded-lg border bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-medium text-gray-800">Documentos</h3>
              <button className="text-xs text-purple-600 hover:underline inline-flex items-center gap-1">
                <Plus className="size-4" /> Adicionar
              </button>
            </div>
            <ul className="space-y-2">
              {docs.map((d) => (
                <li key={d.id} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-purple-600" />
                    <span className="truncate max-w-[140px]">{d.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{d.size}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Corpo */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Histórico/agenda */}
        <div className="lg:col-span-2 rounded-xl border bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Atendimentos</h3>
            <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
              <Plus className="size-4" />
              Add atendimento
            </button>
          </div>

          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2">Data</th>
                  <th className="py-2">Hora</th>
                  <th className="py-2">Tipo</th>
                  <th className="py-2">Médico</th>
                  <th className="py-2 hidden md:table-cell">Enfermeiro</th>
                  <th className="py-2">Notas</th>
                </tr>
              </thead>
              <tbody>
                {appts.map((a) => (
                  <tr key={a.id} className="border-t">
                    <td className="py-2">{a.date}</td>
                    <td className="py-2">{a.time}</td>
                    <td className="py-2">{a.type}</td>
                    <td className="py-2">{a.doctor}</td>
                    <td className="py-2 hidden md:table-cell">{a.nurse ?? "-"}</td>
                    <td className="py-2 text-purple-600">{a.notes ? "Ver notas" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notas + Pagamentos */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Notas</h3>
              <button className="text-xs text-purple-600 hover:underline">Ver todas</button>
            </div>
            <ul className="space-y-3">
              {notes.map((n) => (
                <li key={n.id} className="rounded-lg border p-3 text-sm">
                  <p className="text-gray-700">{n.text}</p>
                  <div className="mt-1 text-xs text-gray-500">por {n.author} • {n.date}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border bg-white p-4">
            <h3 className="mb-3 font-semibold text-gray-800">Pagamentos</h3>
            <ul className="space-y-2 text-sm">
              {payments.map((p) => (
                <li key={p.id} className="flex items-center justify-between">
                  <span className="text-gray-700">{p.label}</span>
                  <span className="font-medium">{currency(p.amount)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t pt-2 flex items-center justify-between text-sm">
              <span className="text-gray-500">Total mensal:</span>
              <span className="font-semibold">{currency(totalPayments)}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/** ------ pequenos helpers ------ */
function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-sm text-gray-700">{value ?? "—"}</div>
    </div>
  );
}

function formatDate(d?: string) {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}