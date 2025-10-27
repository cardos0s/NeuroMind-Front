import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

type EvolutionPoint = {
  weekStart: string;
  sessions: number;
  communicationRate: number;
  touchAccuracy: number;
};

type Props = {
  data?: EvolutionPoint[];
  fetchFromApi?: boolean;
  weeks?: number;
};

export default function ClinicEvolutionChart({
  data,
  fetchFromApi = false,
  weeks = 12,
}: Props) {
  const [loading, setLoading] = useState(fetchFromApi);
  const [error, setError] = useState<string | null>(null);
  const [serverData, setServerData] = useState<EvolutionPoint[] | null>(null);

  // Mock de desenvolvimento
  const mockData: EvolutionPoint[] = useMemo(() => {
    const today = new Date();
    const res: EvolutionPoint[] = [];

    for (let i = weeks - 1; i >= 0; i--) {
      const d = new Date(today);
      // força segunda-feira da semana correspondente
      const day = d.getDay(); // 0=Domingo, 1=Seg...
      const diffToMonday = (day + 6) % 7; // 0 se já for segunda
      d.setDate(d.getDate() - diffToMonday - i * 7);

      const sessions = Math.floor(10 + Math.random() * 25);
      const communicationRate = Math.floor(55 + Math.random() * 25);
      const touchAccuracy = Math.floor(50 + Math.random() * 30);

      res.push({
        weekStart: d.toISOString().slice(0, 10),
        sessions,
        communicationRate,
        touchAccuracy,
      });
    }

    return res;
  }, [weeks]);

  useEffect(() => {
    if (!fetchFromApi) return;

    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const resp = await fetch(
          `/api/analytics/clinic/weekly?weeks=${weeks}`,
          { credentials: "include" }
        );

        if (!resp.ok) {
          throw new Error(`HTTP ${resp.status}`);
        }

        const json = (await resp.json()) as EvolutionPoint[];
        setServerData(json);
      } catch (e: any) {
        setError(e?.message || "Erro ao buscar dados");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [fetchFromApi, weeks]);

  const chartData = data ?? serverData ?? mockData;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="weekStart"
          tickFormatter={(v) => {
            const [_, m, d] = String(v).split("-");
            return `${d}/${m}`;
          }}
          tick={{ fontSize: 12 }}
        />
        <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(value: any, name) =>
            name === "communicationRate" || name === "touchAccuracy"
              ? [`${value}%`, name]
              : [value, name]
          }
          labelFormatter={(label) => {
            const [y, m, d] = String(label).split("-");
            return `Semana de ${d}/${m}/${y}`;
          }}
        />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="sessions"
          name="Sessões"
          strokeWidth={2}
          dot={false}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="communicationRate"
          name="Comunicação por botões (%)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="touchAccuracy"
          name="Precisão no toque (%)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}