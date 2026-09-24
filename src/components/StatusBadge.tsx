export function StatusBadge({
  status,
}: {
  status:
    | "missing"
    | "pending"
    | "approved"
    | "rejected"
    | "in_progress"
    | "ready"
    | "proceeded";
}) {
  const map: Record<string, { label: string; dot: string; text: string }> = {
    missing: { label: "Manquant", dot: "bg-eef-border", text: "text-eef-secondary" },
    pending: { label: "En revue", dot: "bg-eef-blue", text: "text-eef-deep" },
    approved: { label: "Approuvé", dot: "bg-eef-navy", text: "text-eef-navy" },
    rejected: { label: "Refusé", dot: "bg-eef-ink", text: "text-eef-ink" },
    in_progress: { label: "En cours", dot: "bg-eef-blue", text: "text-eef-secondary" },
    ready: { label: "Prêt", dot: "bg-eef-navy", text: "text-eef-navy" },
    proceeded: { label: "Poursuivi", dot: "bg-eef-blue", text: "text-eef-deep" },
  };

  const item = map[status] ?? map.missing;

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${item.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
      {item.label}
    </span>
  );
}
