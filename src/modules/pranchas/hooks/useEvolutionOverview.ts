import { useEffect,  useState } from "react";

export type EvoDomain = "comms" | "touch" | "attention";
export type EvoRange = "4w" | "8w" | "12w";

type Point = { date: string; value: number };

type OverviewData = {
  series: Point[];
  totalSessions: number;
  activePatients: number;
  pendingFeedbacks: number;
  suggestions: string[];
  indicators: { label: string; pct: number }[];
};

function genDates(weeks: number) {
  const out: string[] = [];
  const now = new Date();
  for (let i = weeks - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i * 7);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

function seedFor(domain: EvoDomain) {
  if (domain === "comms") return 52;
  if (domain === "touch") return 58;
  return 46; // attention
}

export function useEvolutionOverview(range: EvoRange, domain: EvoDomain) {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // mock assíncrono
    setLoading(true);
    const weeks = range === "4w" ? 4 : range === "8w" ? 8 : 12;
    const base = seedFor(domain);
    const dates = genDates(weeks);

    const series: Point[] = dates.map((date, i) => ({
      date,
      value: Math.max(20, Math.min(95, base + i * (domain === "comms" ? 3 : 2) + (Math.random() * 6 - 3))),
    }));

    setTimeout(() => {
      setData({
        series,
        totalSessions: Math.round(weeks * 7 * 0.6),
        activePatients: 18,
        pendingFeedbacks: 5,
        suggestions: [
          "Trabalhar atenção sustentada",
          "Exercícios de comunicação por botões",
          "Revisar precisão no toque",
        ],
        indicators: [
          { label: "Comunicação por botões", pct: Math.round(series.at(-1)!.value) },
          { label: "Precisão no toque", pct: 64 },
          { label: "Tempo de atenção", pct: 58 },
        ],
      });
      setLoading(false);
    }, 300);
  }, [range, domain]);

  return { data, loading };
}