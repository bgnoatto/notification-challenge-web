import Link from "next/link";
import { cookies } from "next/headers";
import { Plus } from "lucide-react";
import { getSession } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import { NotificationCard } from "@/components/features/notification-card";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await getSession(await cookies());
  const res = await apiFetch("/notifications", {}, session.token);

  let notifications = [];
  if (res.ok) {
    const all = await res.json();
    notifications = all
      .sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          const diff = new Date(b.createdAt) - new Date(a.createdAt);
          if (diff !== 0) return diff;
        } else if (a.createdAt) return -1;
        else if (b.createdAt) return 1;

        if (a.updatedAt && b.updatedAt) {
          const diff = new Date(b.updatedAt) - new Date(a.updatedAt);
          if (diff !== 0) return diff;
        } else if (a.updatedAt) return -1;
        else if (b.updatedAt) return 1;

        return b.id - a.id;
      })
      .slice(0, 5);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Your notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">Last 5 sent notifications</p>
        </div>
        <Link href="/notifications/new">
          <Button>
            <Plus className="h-4 w-4" aria-hidden="true" />
            New
          </Button>
        </Link>
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border py-16 text-center">
          <p className="text-sm text-muted-foreground">You haven&apos;t sent any notifications yet.</p>
          <Link href="/notifications/new">
            <Button variant="secondary">Create your first notification</Button>
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-3" aria-label="Recent notifications">
          {notifications.map((n) => (
            <li key={n.id}>
              <NotificationCard notification={n} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
