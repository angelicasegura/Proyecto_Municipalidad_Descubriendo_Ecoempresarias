export function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");

  window.location.href = "/login";
};
gi