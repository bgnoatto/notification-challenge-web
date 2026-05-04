import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import { parseNotificationForm } from "@/lib/notifications";
import { NotificationForm } from "@/components/features/notification-form";
import { Card } from "@/components/ui/card";

async function createNotification(_, formData) {
  "use server";
  const session = await getSession(await cookies());
  if (!session) redirect("/login");

  const result = parseNotificationForm(formData);
  if ("errors" in result) return result;

  const res = await apiFetch("/notifications", {
    method: "POST",
    body: JSON.stringify(result.body),
  }, session.token);

  if (!res.ok) return { error: "Failed to create notification. Please try again." };
  redirect("/dashboard");
}

export default async function NewNotificationPage() {
  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">New notification</h1>
        <p className="mt-1 text-sm text-muted-foreground">Fill in the details and choose a channel</p>
      </div>
      <Card>
        <NotificationForm action={createNotification} submitLabel="Send notification" />
      </Card>
    </div>
  );
}
