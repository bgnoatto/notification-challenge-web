const CHANNEL_STYLES = {
  EMAIL: "bg-teal-900 text-teal-300 ring-1 ring-teal-700",
  SMS: "bg-amber-900 text-amber-300 ring-1 ring-amber-700",
  PUSH: "bg-indigo-900 text-indigo-300 ring-1 ring-indigo-700",
};

export function Badge({ channelLabel }) {
  const label = channelLabel?.toUpperCase() ?? "UNKNOWN";
  const styles = CHANNEL_STYLES[label] ?? "bg-slate-800 text-slate-300 ring-1 ring-slate-600";

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${styles}`}>
      {label}
    </span>
  );
}
