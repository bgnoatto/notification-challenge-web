import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

async function loginAction(formData) {
  "use server";
  let res;
  try {
    res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        userName: formData.get("userName"),
        password: formData.get("password"),
      }),
    });
  } catch {
    redirect("/login?error=network");
  }

  if (!res.ok) {
    redirect("/login?error=1");
  }

  const { token } = await res.json();
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/dashboard");
}

export default async function LoginPage({ searchParams }) {
  const { error } = await searchParams;

  return (
    <Card>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">Welcome back</p>
      </div>
      {error === "network" && (
        <p role="alert" className="mb-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Cannot reach the server. Make sure the backend is running.
        </p>
      )}
      {error === "1" && (
        <p role="alert" className="mb-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Invalid username or password.
        </p>
      )}
      <form action={loginAction} className="flex flex-col gap-4">
        <Input id="userName" name="userName" label="Username" required placeholder="juanito99" />
        <Input id="password" name="password" label="Password" type="password" required placeholder="••••••" />
        <Button type="submit">Sign in</Button>
      </form>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        No account?{" "}
        <Link href="/register" className="text-accent hover:underline font-medium">Register</Link>
      </p>
    </Card>
  );
}
