const API_URL = process.env.API_URL ?? "http://localhost:8080";

export async function apiFetch(path, options = {}, token) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
  return res;
}
