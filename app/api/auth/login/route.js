import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api";

export async function POST(request) {
  const body = await request.json();

  const res = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const { token } = await res.json();

  const response = NextResponse.json({ ok: true });
  response.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
