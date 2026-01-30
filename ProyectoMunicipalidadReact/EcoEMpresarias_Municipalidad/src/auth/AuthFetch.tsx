export async function authFetch(
  url: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("token")

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  if (res.status === 401) {
    localStorage.removeItem("token")
    window.location.href = "/login"
    throw new Error("No autorizado")
  }

  return res
}
