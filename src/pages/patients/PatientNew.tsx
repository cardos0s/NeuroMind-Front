// src/pages/patients/PatientNew.tsx
import { useEffect, useMemo, useState } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import { PatientsApi } from "../../services/patients";
import type { CreatePatientDTO, Sex } from "../../types/patient";

export interface PatientNewProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (id: number) => void;
}

export default function PatientNew({ open, onClose, onCreated }: PatientNewProps) {
  const [saving, setSaving] = useState(false);

  // primeiro/último nome → name
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]  = useState("");

  // extras
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [sex, setSex]             = useState<Sex | "">("");

  // histórico (sem rótulo) + arquivo
  const [diagnosesText, setDiagnosesText] = useState(""); // "TEA, TDAH"
  const [summary, setSummary]             = useState("");
  const [file, setFile]                   = useState<File | null>(null);

  const fullName = useMemo(() => {
    const a = firstName.trim();
    const b = lastName.trim();
    return [a, b].filter(Boolean).join(" ");
  }, [firstName, lastName]);

  // limpar quando o modal fecha
  useEffect(() => {
    if (!open) {
      setSaving(false);
      setFirstName(""); setLastName("");
      setEmail(""); setPhone("");
      setBirthDate(""); setSex("");
      setDiagnosesText(""); setSummary("");
      setFile(null);
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName) return;

    setSaving(true);

    const diagnoses = diagnosesText
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const payload: CreatePatientDTO = {
      name: fullName,
      email: email || undefined,
      phone: phone || undefined,
      birthDate: birthDate || undefined,
      sex: (sex || undefined) as Sex | undefined,
      diagnoses,
      summary: summary || undefined,
    };

    try {
      const created = await PatientsApi.create(payload);

      if (file) {
        try {
          await PatientsApi.uploadFile?.(created.id, file);
        } catch (err) {
          console.warn("Falha ao enviar arquivo. Você pode anexar depois no perfil.", err);
        }
      }

      onCreated?.(created.id); // avisa a lista
      onClose();               // fecha o modal
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Novo paciente</h2>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100" aria-label="Fechar">
            <X className="size-5 text-gray-500" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="px-5 py-5 space-y-5">
          {/* nomes */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Primeiro nome *</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="Ex.: Ana"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Sobrenome</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="Ex.: Souza"
              />
            </div>
          </div>

          {/* sexo + nascimento */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <span className="block text-sm text-gray-600 mb-1">Sexo</span>
              <div className="flex flex-wrap items-center gap-4">
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="sex" value="F" checked={sex === "F"} onChange={() => setSex("F")} />
                  <span>Feminino</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="sex" value="M" checked={sex === "M"} onChange={() => setSex("M")} />
                  <span>Masculino</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="sex" value="X" checked={sex === "X"} onChange={() => setSex("X")} />
                  <span>Outro / Prefere não informar</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Data de nascimento</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
          </div>

          {/* contato */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@dominio.com"
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Telefone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(00) 00000-0000"
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
          </div>

          {/* histórico: resumo + diagnósticos + arquivo */}
          <div className="space-y-3">
            <label className="block text-sm text-gray-700 font-medium">Histórico médico</label>

            <input
              value={diagnosesText}
              onChange={(e) => setDiagnosesText(e.target.value)}
              placeholder="Diagnósticos (ex.: TEA, TDAH) — separe por vírgula"
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />

            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={3}
              placeholder="Resumo clínico (opcional)"
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />

            <label className="flex items-center gap-3 rounded-lg border-2 border-dashed p-4 cursor-pointer hover:bg-purple-50">
              <Upload className="size-5 text-purple-600" />
              <div className="text-sm">
                <div className="font-medium text-gray-800">Importar histórico (PDF, imagem...)</div>
                <div className="text-gray-500">Opcional — anexe relatórios/atestados</div>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </label>

            {file && (
              <div className="text-xs text-gray-600">
                Arquivo selecionado: <span className="font-medium">{file.name}</span>
              </div>
            )}
          </div>

          {/* ações */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-3 py-2 rounded-lg border hover:bg-gray-50">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving || !fullName}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
            >
              {saving && <Loader2 className="size-4 animate-spin" />}
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}