import { useState } from "react";
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  MapPin,
  User2,
  X,
} from "lucide-react";

type Appointment = {
  id: string;
  weekday: "Segunda" | "Terça" | "Quarta" | "Quinta" | "Sexta";
  time: string;
  patientName: string;
  professionalRole: string; // TO, Fono, Fisio...
  context: string; // Clínica, Escola, Online...
};

const mockAppointments: Appointment[] = [
  {
    id: "1",
    weekday: "Segunda",
    time: "09:00",
    patientName: "João da Silva",
    professionalRole: "TO",
    context: "Clínica",
  },
  {
    id: "2",
    weekday: "Segunda",
    time: "14:00",
    patientName: "Maria Oliveira",
    professionalRole: "Fono",
    context: "Escola",
  },
  {
    id: "3",
    weekday: "Terça",
    time: "10:30",
    patientName: "Pedro Santos",
    professionalRole: "TO",
    context: "Online",
  },
  {
    id: "4",
    weekday: "Quarta",
    time: "15:00",
    patientName: "Ana Costa",
    professionalRole: "Fisio",
    context: "Clínica",
  },
  {
    id: "5",
    weekday: "Sexta",
    time: "08:00",
    patientName: "João da Silva",
    professionalRole: "TO",
    context: "Clínica",
  },
  {
    id: "6",
    weekday: "Sexta",
    time: "11:00",
    patientName: "Maria Oliveira",
    professionalRole: "Fono",
    context: "Escola",
  },
];

type SelectedAppointment = Appointment & {
  note?: string;
};

export default function ProfessionalSchedule() {
  const [weekOffset, setWeekOffset] = useState(0); // 0 = semana atual (mock)
  const [selected, setSelected] = useState<SelectedAppointment | null>(null);
  const [noteText, setNoteText] = useState("");
  const [savedNotes, setSavedNotes] = useState<Record<string, string>>({});

  const weekdays: Array<Appointment["weekday"]> = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
  ];

  // no futuro isso viria filtrado por semana + API
  const appointmentsByDay: Record<string, Appointment[]> = weekdays.reduce(
    (acc, day) => {
      acc[day] = mockAppointments.filter((a) => a.weekday === day);
      return acc;
    },
    {} as Record<string, Appointment[]>
  );

  const weekLabel =
    weekOffset === 0
      ? "Semana atual"
      : weekOffset === -1
      ? "Semana anterior"
      : weekOffset === 1
      ? "Próxima semana"
      : `Semana ${weekOffset > 0 ? "+" : ""}${weekOffset}`;

  const handleOpenAppointment = (appt: Appointment) => {
    const existingNote = savedNotes[appt.id];
    setSelected({ ...appt, note: existingNote });
    setNoteText(existingNote ?? "");
  };

  const handleCloseModal = () => {
    setSelected(null);
    setNoteText("");
  };

  const handleSaveNote = () => {
    if (!selected) return;
    const trimmed = noteText.trim();
    setSavedNotes((prev) => ({ ...prev, [selected.id]: trimmed }));
    setSelected({ ...selected, note: trimmed });
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl p-6 md:p-7 lg:p-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">Agenda</h1>
            <p className="text-xs md:text-sm text-slate-500">
              Visualize seus atendimentos organizados por dia da semana.
            </p>
            <p className="mt-1 text-[11px] text-slate-400">{weekLabel}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-end">
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 text-xs md:text-sm">
              <button
                type="button"
                onClick={() => setWeekOffset((prev) => prev - 1)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-white transition"
              >
                <ChevronLeft className="h-4 w-4" />
                Semana anterior
              </button>
              <button
                type="button"
                onClick={() => setWeekOffset((prev) => prev + 1)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-white transition border-l border-slate-200"
              >
                Próxima semana
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <button className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#6b4df5] text-white text-xs md:text-sm font-medium shadow-sm hover:bg-[#5a3ee0] transition">
              + Novo agendamento
            </button>
          </div>
        </div>

        {/* COLUNAS DA SEMANA */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mt-4">
          {weekdays.map((day) => {
            const dayAppointments = appointmentsByDay[day] ?? [];
            const subtitle =
              dayAppointments.length === 0
                ? "Sem atendimentos"
                : `${dayAppointments.length} atendimento${
                    dayAppointments.length > 1 ? "s" : ""
                  }`;

            return (
              <div
                key={day}
                className="rounded-3xl border border-slate-100 bg-slate-50/60 px-4 py-4 flex flex-col gap-3"
              >
                <div>
                  <h2 className="text-sm font-semibold text-slate-800">
                    {day}
                  </h2>
                  <p className="text-[11px] text-slate-400">{subtitle}</p>
                </div>

                <div className="flex flex-col gap-3 mt-1">
                  {dayAppointments.map((appt) => (
                    <button
                      key={appt.id}
                      type="button"
                      onClick={() => handleOpenAppointment(appt)}
                      className="w-full text-left rounded-2xl bg-[#f5f1ff] hover:bg-[#eee7ff] border border-[#ebe4ff] px-3 py-2.5 transition shadow-[0_4px_12px_rgba(134,117,255,0.05)]"
                    >
                      <p className="text-xs font-semibold text-slate-900 mb-0.5">
                        {appt.time} • {appt.patientName}
                      </p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1">
                        <User2 className="h-3 w-3 text-violet-500" />
                        {appt.professionalRole}
                        <span className="mx-1">•</span>
                        <MapPin className="h-3 w-3 text-violet-500" />
                        {appt.context}
                      </p>
                    </button>
                  ))}

                  {dayAppointments.length === 0 && (
                    <p className="text-[11px] text-slate-400">
                      Nenhum atendimento agendado.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL DE DETALHE DO ATENDIMENTO */}
      {selected && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
            {/* header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-semibold text-xs">
                  {selected.patientName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-sm md:text-base font-semibold">
                    {selected.patientName}
                  </h2>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <CalendarClock className="h-3.5 w-3.5 text-violet-500" />
                    {selected.weekday} • {selected.time} •{" "}
                    {selected.professionalRole} • {selected.context}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* conteúdo */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {/* bloco info */}
              <div className="p-5 md:p-6 space-y-3">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Informações do atendimento
                </h3>

                <div className="space-y-2 text-xs md:text-sm">
                  <InfoRow label="Paciente" value={selected.patientName} />
                  <InfoRow
                    label="Profissional"
                    value={selected.professionalRole}
                  />
                  <InfoRow label="Contexto" value={selected.context} />
                  <InfoRow label="Dia" value={selected.weekday} />
                  <InfoRow label="Horário" value={selected.time} />
                </div>

                <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3 flex items-start gap-3 text-[11px] text-slate-600">
                  <CalendarClock className="h-4 w-4 text-violet-500 mt-0.5" />
                  <p>
                    Use o campo ao lado para registrar{" "}
                    <span className="font-semibold">
                      como foi este atendimento
                    </span>{" "}
                    (participação, recursos usados, observações importantes).
                  </p>
                </div>
              </div>

              {/* bloco nota rápida */}
              <div className="p-5 md:p-6 flex flex-col h-full">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Nota rápida do atendimento
                </h3>

                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={5}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs md:text-sm outline-none focus:bg-white focus:ring-2 focus:ring-violet-100 focus:border-violet-400 resize-none"
                  placeholder="Ex: Paciente chegou calmo, respondeu bem às pranchas de rotina, precisou de ajuda visual para concluir as atividades..."
                />

                <div className="flex justify-between items-center mt-3 text-[11px] text-slate-400">
                  {selected.note && (
                    <span>Última nota salva: “{selected.note}”</span>
                  )}

                  <button
                    type="button"
                    onClick={handleSaveNote}
                    className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#6b4df5] text-white text-xs font-medium hover:bg-[#5a3ee0] transition"
                  >
                    Salvar nota
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* COMPONENTE AUXILIAR */

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] text-slate-500">{label}</span>
      <span className="text-xs md:text-sm text-slate-800">{value}</span>
    </div>
  );
}
