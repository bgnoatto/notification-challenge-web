import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Bell } from "lucide-react";
import { getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";

async function logoutAction() {
  "use server";
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/login");
}

export default async function AppLayout({ children }) {
  const session = await getSession(await cookies());
  if (!session) redirect("/login");

  const userName = session.payload?.sub ?? "User";

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-primary/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-foreground">
            <Bell className="h-5 w-5 text-accent" aria-hidden="true" />
            Notificaciones
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">@{userName}</span>
            <form action={logoutAction}>
              <Button type="submit" variant="ghost" className="text-sm">Sign out</Button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8">
        {children}
      </main>
    </div>
  );
}
