export type TimelineItem = {
  label: string;
  date?: string;
  state?: "completed" | "current" | "upcoming";
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative ml-3 border-l pl-6">
      {items.map((it, i) => (
        <li key={i} className="mb-6">
          <span className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border bg-white" />
          <div className="text-sm font-medium">{it.label}</div>
          {it.date && <div className="text-xs text-neutral-500">{it.date}</div>}
        </li>
      ))}
    </ol>
  );
}
