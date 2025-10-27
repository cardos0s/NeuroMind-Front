import { useEffect, useRef } from "react";

export type Point = { x: number | string; y: number };

type Props = {
  series: Point[];
  loading?: boolean;
};


/**
 * Stub simples: renderiza uma “faixa” com os pontos.
 * Depois você pode trocar por Recharts/Chart.js facilmente.
 */
export default function EvolutionChart({ series, loading }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // aqui entraria o código de gráfico real (Recharts/Chart.js)
    // por enquanto nada :)
  }, [series, loading]);

  return (
    <div
      ref={ref}
      className="h-48 rounded-lg border bg-gradient-to-r from-purple-50 to-white grid place-items-center text-sm text-gray-500"
    >
      {loading ? "Carregando gráfico…" : `Pontos: ${series.length}`}
    </div>
  );
}