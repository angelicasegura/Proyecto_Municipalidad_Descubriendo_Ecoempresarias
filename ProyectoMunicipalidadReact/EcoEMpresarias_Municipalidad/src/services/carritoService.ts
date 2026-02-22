const API = "https://localhost:7050/api/Carrito";

function authHeader() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function agregarAlCarrito(productoId: string, cantidad: number) {
  const res = await fetch(`${API}/Agregar`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ productoId, cantidad }),
  });

  if (!res.ok) throw new Error("No se pudo agregar al carrito");
  return res.json();
}

export async function obtenerMiCarrito() {
  const res = await fetch(`${API}/MiCarrito`, {
    headers: authHeader(),
  });

  if (!res.ok) throw new Error("No se pudo obtener el carrito");
  return res.json();
}

export async function actualizarCantidad(carritoId: number, cantidad: number) {
  const res = await fetch(`${API}/ActualizarCantidad`, {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify({ carritoId, cantidad }),
  });

  if (!res.ok) throw new Error("No se pudo actualizar cantidad");
  return res.json();
}

export async function eliminarItem(carritoId: number) {
  const res = await fetch(`${API}/Eliminar/${carritoId}`, {
    method: "DELETE",
    headers: authHeader(),
  });

  if (!res.ok) throw new Error("No se pudo eliminar item");
  return res.json();
}