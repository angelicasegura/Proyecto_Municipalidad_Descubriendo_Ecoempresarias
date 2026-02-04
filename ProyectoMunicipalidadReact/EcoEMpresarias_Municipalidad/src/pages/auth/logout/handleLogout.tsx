export function logoutUser() {
  localStorage.removeItem("token")
  localStorage.removeItem("usuario")

  // Redirigir al login
  window.location.href = "/login"
}
