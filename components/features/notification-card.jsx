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
  }).format(new Date(iso));
}

export function NotificationCard({ notification }) {
  const { id, title, content, channelLabel, createdAt, updatedAt } = notification;

  const wasUpdated = updatedAt && createdAt && updatedAt !== createdAt;
  const dateLabel = wasUpdated ? "Updated" : "Created";
  const dateValue = formatDate(updatedAt ?? createdAt);

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge channelLabel={channelLabel} />
            <h3 className="text-sm font-semibold text-foreground truncate">{title}</h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{content}</p>
          {dateValue && (
            <p className="text-xs text-muted-foreground/70">
              {dateLabel}: {dateValue}
            </p>
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
