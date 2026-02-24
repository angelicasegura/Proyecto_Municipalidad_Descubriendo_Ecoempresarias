const API = "https://localhost:7050/api/Carrito";

function authHeader() {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function parseResponse(res: Response) {
  const contentType = res.headers.get("content-type") || "";
  return contentType.includes("application/json") ? res.json() : res.text();
}

export async function agregarAlCarrito(payload: {
  emprendimientoId: number;
  productoId: string; 
  cantidad: number;
}) {
  const res = await fetch(`${API}/Agregar`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(await res.text());
  return parseResponse(res);
}

export async function obtenerMiCarrito(emprendimientoId: number) {
  const res = await fetch(
    `${API}/MiCarrito?emprendimientoId=${encodeURIComponent(emprendimientoId)}`,
    {
      headers: authHeader(),
    }
  );

  if (!res.ok) throw new Error(await res.text());
  return parseResponse(res);
}

export async function actualizarCantidad(payload: {
  emprendimientoId: number;
  productoId: string; 
  cantidad: number;
}) {
  const res = await fetch(`${API}/ActualizarCantidad`, {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(await res.text());
  return parseResponse(res);
}

export async function eliminarItem(payload: {
  emprendimientoId: number;
  productoId: string; // GUID string
}) {
  const res = await fetch(`${API}/Eliminar`, {
    method: "DELETE",
    headers: authHeader(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(await res.text());
  return parseResponse(res);
}