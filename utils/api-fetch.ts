export default function apiFetch(
  get: () => any,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  path: string,
  body?: any
) {
  const contentType =
    body instanceof FormData ? "multipart/form-data" : "application/json";

  return fetch(`https://api.toylandapp.com${path}`, {
    method,
    body,
    headers: {
      "Content-Type": contentType,
      Authorization: `Bearer ${get().token}`,
    },
  });
}
