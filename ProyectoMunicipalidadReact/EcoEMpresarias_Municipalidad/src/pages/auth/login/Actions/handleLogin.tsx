export interface LoginRequest {
  email: string
  contrasena: string
}

export interface LoginResponse {
  idUsuario: number;
  nombre: string;
  rol: string;
  token: string;
}
export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch("https://localhost:7050/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.text()
    throw new Error(errorData || "Credenciales inválidas")
  }

  const result: LoginResponse = await response.json();

  localStorage.setItem("token", result.token);

  const perfilUsuario = {
    id: result.idUsuario,
    nombre: result.nombre,
    rol: result.rol
  };
  localStorage.setItem("usuario", JSON.stringify(perfilUsuario));

  return result;
}