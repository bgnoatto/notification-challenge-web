import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { LoginForm } from "@/components/features/login-form";

async function loginAction(_, formData) {
  "use server";
  const userName = formData.get("userName");
  let res;
  try {
    res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        userName,
        password: formData.get("password"),
      }),
    });
  } catch {
    return { error: "Cannot reach the server. Make sure the backend is running.", userName };
  }

  if (!res.ok) {
    return { error: "Invalid username or password.", userName };
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

export default async function LoginPage() {
  return (
    <Card>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">Welcome back</p>
      </div>
      <LoginForm action={loginAction} />
    </Card>
  );
}
