import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getSession } from "@/lib/auth";

export default async function Home() {
  const session = await getSession(await cookies());
  redirect(session ? "/dashboard" : "/login");
}
