import Link from "next/link";
import { StatusBadge, StatusKind } from "@/components/StatusBadge";
import { Newspaper, Flag } from "lucide-react";

export function NewsCard({
  id,
  title,
  excerpt,
  source,
  priority,
  status,
}: {
  id: string | number;
  title: string;
  excerpt: string;
  source?: string;
  priority?: "low" | "normal" | "high" | "urgent";
  status: StatusKind;
}) {
  const priorityLabel: Record<NonNullable<typeof priority>, string> = {
    low: "Aşağı",
    normal: "Normal",
    high: "Yüksək",
    urgent: "Təcili",
  } as const;

  return (
    <div className="group rounded-xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
        <StatusBadge status={status} />
      </div>
      <p className="mt-2 line-clamp-3 text-sm text-neutral-600">{excerpt}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          {source && (
            <span className="inline-flex items-center gap-1">
              <Newspaper size={14} className="text-neutral-500" /> {source}
            </span>
          )}
          {priority && (
            <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-0.5 text-neutral-700">
              <Flag size={12} className="text-neutral-500" /> {priorityLabel[priority]}
            </span>
          )}
        </div>
        <Link href={`/managers/${id}`} className="text-teal-700 hover:underline">
          Bax →
        </Link>
      </div>
    </div>
  );
}
