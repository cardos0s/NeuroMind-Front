import { useEffect, useMemo, useState } from "react";
import type { EvoDomain, EvoRange } from "./useEvolutionOverview";
import type { Point } from "../../../components/EvolutionChart";

type Goal = { id: number; title: string; target: number; current: number; trendPct?: number };
type Note = { id: number; author: string; date: string; text: string };

export function usePatientEvolution(patientId: string, range: EvoRange, domain: EvoDomain) {
  const [series, setSeries] = useState<Point[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const weeks = range === "4w" ? 4 : range === "8w" ? 8 : 12;
    const today = new Date();
    const base = domain === "comms" ? 48 : domain === "touch" ? 55 : 45;

    const s: Point[] = Array.from({ length: weeks }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (weeks - 1 - i) * 7);

    return {
    x: d.toISOString().slice(0, 10),
    y: Math.max(15, Math.min(95, base + i * 3 + (Math.random() * 8 - 4)))
  };
});

    setTimeout(() => {
      setSeries(s);
      setGoals([
        { id: 1, title: "Aumentar comunicação por botões", target: 80, current: Math.round(s.at(-1)!.y), trendPct: +12 },
        { id: 2, title: "Melhorar precisão no toque", target: 70, current: 64, trendPct: +6 },
      ]);
      setNotes([
        { id: 1, author: "Fonoaudióloga", date: String(s[0].x), text: "Boa aceitação à rotina de comunicação." },
        { id: 2, author: "TO", date: String(s[0].x), text: "Atenção sustentada melhorou com reforço visual." },
      ]);
      setLoading(false);
    }, 250);
  }, [patientId, range, domain]);

  const kpis = useMemo(() => {
    if (!series.length) return [];
    const last = series.at(-1)!.y;
    const first = series[0].y;
    const change = Math.round(((last - first) / Math.max(1, first)) * 100);
    return [
      { label: "Média da janela", value: Math.round(series.reduce((a, b) => a + b.y, 0) / series.length) },
      { label: "Variação", value: (change > 0 ? "+" : "") + change + "%" },
      { label: "Melhor semana", value: Math.round(Math.max(...series.map(s => s.y))) },
    ];
  }, [series]);

  return { series, goals, notes, kpis, loading };
}