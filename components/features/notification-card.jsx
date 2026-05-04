import Link from "next/link";
import { Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function formatDate(iso) {
  if (!iso) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date(iso));
}

const STATUS_STYLES = {
  SENDING: "bg-amber-900/40 text-amber-300 border-amber-700",
  SENT: "bg-green-900/40 text-green-300 border-green-700",
  FAILED: "bg-red-900/40 text-red-300 border-red-700",
};

export function NotificationCard({ notification }) {
  const { id, title, content, channelLabel, createdAt, updatedAt, statusLabel } = notification;

  const wasUpdated = updatedAt && createdAt && updatedAt !== createdAt;
  const createdValue = formatDate(createdAt);
  const updatedValue = wasUpdated ? formatDate(updatedAt) : null;

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge channelLabel={channelLabel} />
            {statusLabel && (
              <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[statusLabel] ?? "bg-muted text-muted-foreground border-border"}`}>
                {statusLabel}
              </span>
            )}
            <span className="text-xs text-muted-foreground/60 font-mono">#{id}</span>
            <h3 className="text-sm font-semibold text-foreground truncate">{title}</h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{content}</p>
          {(createdValue || updatedValue) && (
            <div className="flex flex-col gap-0.5">
              {createdValue && (
                <p className="text-xs text-muted-foreground/70">Created: {createdValue}</p>
              )}
              {updatedValue && (
                <p className="text-xs text-muted-foreground/70">Updated: {updatedValue}</p>
              )}
            </div>
          )}
        </div>
        <Link
          href={`/notifications/${id}/edit`}
          aria-label={`Edit notification ${title}`}
          className="shrink-0 flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
