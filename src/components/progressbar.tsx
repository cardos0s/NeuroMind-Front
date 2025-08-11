type Props = { label: string; percent: number };

export default function ProgressBar({ label, percent }: Props) {
  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-xs text-gray-500">{percent}%</span>
      </div>
      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-purple-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}