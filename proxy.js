import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const RAW = process.env.JWT_SECRET ?? "dGhpcy1pcy1hLXZlcnktc2VjcmV0LWtleS10aGF0LWlzLWF0LWxlYXN0LTMyLWJ5dGVz";
const SECRET = Buffer.from(RAW, "base64");

const PUBLIC_PATHS = ["/login", "/register", "/api/auth"];

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await jwtVerify(token, SECRET);
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
