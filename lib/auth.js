import { jwtVerify } from "jose";

const RAW = process.env.JWT_SECRET ?? "dGhpcy1pcy1hLXZlcnktc2VjcmV0LWtleS10aGF0LWlzLWF0LWxlYXN0LTMyLWJ5dGVz";
const SECRET = Buffer.from(RAW, "base64");

export async function verifyToken(token) {
  const { payload } = await jwtVerify(token, SECRET);
  return payload;
}

export async function getSession(cookieStore) {
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  try {
    const payload = await verifyToken(token);
    return { token, payload };
  } catch {
    return null;
  }
}
