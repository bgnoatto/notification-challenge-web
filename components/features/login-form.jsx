"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm({ action }) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <>
      {state?.error && (
        <p role="alert" className="mb-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}
      <form action={formAction} className="flex flex-col gap-4">
        <Input
          id="userName"
          name="userName"
          label="Username"
          required
          placeholder="juanito99"
          defaultValue={state?.userName ?? ""}
        />
        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          required
          placeholder="••••••"
        />
        <Button type="submit" disabled={isPending}>Sign in</Button>
      </form>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        No account?{" "}
        <Link href="/register" className="text-accent hover:underline font-medium">Register</Link>
      </p>
    </>
  );
}
