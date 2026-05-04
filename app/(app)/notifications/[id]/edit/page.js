import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import { NotificationForm } from "@/components/features/notification-form";
import { Card } from "@/components/ui/card";

async function updateNotification(id, _, formData) {
  "use server";
  const { cookies } = await import("next/headers");
  const { getSession } = await import("@/lib/auth");
  const { apiFetch } = await import("@/lib/api");

  const session = await getSession(await cookies());
  if (!session) redirect("/login");

  const body = {
    title: formData.get("title"),
    content: formData.get("content"),
    channelCode: Number(formData.get("channelCode")),
  };

  if (!body.title || !body.content || !body.channelCode) {
    return {
      errors: {
        title: !body.title ? "Title is required" : undefined,
        content: !body.content ? "Content is required" : undefined,
        channelCode: !body.channelCode ? "Channel is required" : undefined,
      },
    };
  }

  const res = await apiFetch(`/notifications/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  }, session.token);

  if (!res.ok) {
    return { error: "Failed to update notification. Please try again." };
  }

  redirect("/dashboard");
}

export default async function EditNotificationPage({ params }) {
  const { id } = await params;
  const session = await getSession(await cookies());

  const res = await apiFetch(`/notifications`, {}, session.token);
  if (!res.ok) notFound();

  const notifications = await res.json();
  const notification = notifications.find((n) => String(n.id) === id);
  if (!notification) notFound();

  const boundAction = updateNotification.bind(null, id);

  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Edit notification</h1>
        <p className="mt-1 text-sm text-muted-foreground">Changes will trigger a resend via the configured channel</p>
      </div>
      <Card>
        <NotificationForm
          action={boundAction}
          defaultValues={notification}
          submitLabel="Update & resend"
        />
      </Card>
    </div>
  );
}
