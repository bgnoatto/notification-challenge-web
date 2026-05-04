import Link from "next/link";
import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

async function registerAction(formData) {
  "use server";
  const body = {
    name: formData.get("name"),
    lastName: formData.get("lastName"),
    userName: formData.get("userName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
  };

  const res = await apiFetch("/users", { method: "POST", body: JSON.stringify(body) });

  if (!res.ok) {
    redirect("/register?error=1");
  }

  redirect("/login?registered=1");
}

export default async function RegisterPage({ searchParams }) {
  const { error, registered } = await searchParams;

  return (
    <Card>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Create account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Start managing your notifications</p>
      </div>
      {error && (
        <p role="alert" className="mb-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Registration failed. The username may already be taken.
        </p>
      )}
      {registered && (
        <p className="mb-4 rounded-md bg-accent/10 px-3 py-2 text-sm text-accent">
          Account created! Sign in to continue.
        </p>
      )}
      <form action={registerAction} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Input id="name" name="name" label="First name" required placeholder="Juan" />
          <Input id="lastName" name="lastName" label="Last name" required placeholder="Pérez" />
        </div>
        <Input id="userName" name="userName" label="Username" required placeholder="juanito99" />
        <Input id="email" name="email" label="Email" type="email" required placeholder="juan@mail.com" />
        <Input id="phone" name="phone" label="Phone" required placeholder="+5491112345678" />
        <Input id="password" name="password" label="Password" type="password" required placeholder="••••••" />
        <Button type="submit">Register</Button>
      </form>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-accent hover:underline font-medium">Sign in</Link>
      </p>
    </Card>
  );
}
