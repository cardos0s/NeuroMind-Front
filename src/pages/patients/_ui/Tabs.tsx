import React from "react";

export function Tabs({
  value, onChange, children,
}: { value: string; onChange: (v: any) => void; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex gap-2 border-b">
        {React.Children.map(children, (child: any) => {
          const active = child.props.value === value;
          return (
            <button
              className={`px-3 py-2 text-sm rounded-t-md ${
                active ? "bg-white border-x border-t border-b-transparent text-purple-700"
                       : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => onChange(child.props.value)}>
              {child.props.children}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Tab({ children }: { value: string; children: React.ReactNode }) {
  return <>{children}</>;
}