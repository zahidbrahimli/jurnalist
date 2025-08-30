import clsx from "clsx";

export type StatusKind = "pending" | "in_review" | "approved" | "needs_edit" | "rejected";

const styles: Record<StatusKind, string> = {
  pending: "bg-yellow-100 text-yellow-800 ring-yellow-200",
  in_review: "bg-blue-100 text-blue-800 ring-blue-200",
  approved: "bg-green-100 text-green-800 ring-green-200",
  needs_edit: "bg-orange-100 text-orange-800 ring-orange-200",
  rejected: "bg-red-100 text-red-800 ring-red-200",
};

export function StatusBadge({ status, className }: { status: StatusKind; className?: string }) {
  const text: Record<StatusKind, string> = {
    pending: "Gözləyir",
    in_review: "Baxılır",
    approved: "Təsdiq",
    needs_edit: "Redaktəyə qaytar",
    rejected: "Rədd",
  };
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
        styles[status],
        className
      )}
    >
      {text[status]}
    </span>
  );
}
