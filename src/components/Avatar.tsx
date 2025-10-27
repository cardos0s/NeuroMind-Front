// src/components/Avatar.tsx
type Props = {
  name?: string;
  url?: string;      // URL da foto, se tiver
  size?: number;     // tamanho em px
  className?: string;
};

export default function Avatar({ name = "", url, size = 64, className = "" }: Props) {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase() ?? "")
      .join("") || "P";

  const style = { width: size, height: size };

  if (url) {
    return (
      <img
        src={url}
        alt={name || "Avatar"}
        style={style}
        className={`rounded-full object-cover bg-gray-100 ${className}`}
      />
    );
  }

  return (
    <div
      style={style}
      className={`rounded-full grid place-items-center font-semibold text-white ${className}
                  bg-gradient-to-br from-purple-400 to-purple-600`}
    >
      {initials}
    </div>
  );
}