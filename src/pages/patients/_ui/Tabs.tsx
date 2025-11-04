import React from "react";

type TabProps = {
  value: string;
  label?: React.ReactNode;
  children: React.ReactNode;
};

type TabsProps = {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
};

export function Tabs({ value, onChange, children }: TabsProps) {
  // transforma em array
  const tabs = React.Children.toArray(children);

  return (
    <div>
      {/* header */}
      <div className="flex gap-2 border-b">
        {tabs.map((child) => {
          if (!React.isValidElement<TabProps>(child)) return null;

          const active = child.props.value === value;

          return (
            <button
              key={child.props.value}
              className={`px-3 py-2 text-sm rounded-t-md ${
                active
                  ? "bg-white border-x border-t border-b-transparent text-purple-700"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => onChange(child.props.value)}
            >
              {child.props.label ?? child.props.children}
            </button>
          );
        })}
      </div>

      {/* conteúdo */}
      <div className="mt-4">
        {tabs.map((child) => {
          if (!React.isValidElement<TabProps>(child)) return null;

          if (child.props.value !== value) return null;

          return (
            <div key={child.props.value}>
              {child.props.children}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Tab(_props: TabProps) {
  // o Tabs é quem renderiza, aqui não precisa fazer nada
  return null;
}
