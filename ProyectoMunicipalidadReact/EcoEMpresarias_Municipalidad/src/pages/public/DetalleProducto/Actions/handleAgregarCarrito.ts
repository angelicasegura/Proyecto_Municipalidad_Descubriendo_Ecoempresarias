type AgregarCarritoRequest = {
  emprendimientoId: number;
  productoId: string;   // GUID como string
  cantidad: number;
};

export async function handleAgregarCarrito(payload: AgregarCarritoRequest) {
  const token = localStorage.getItem("token"); 

  const res = await fetch("https://localhost:7050/api/Carrito/Agregar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Error al agregar al carrito");
  }


  const contentType = res.headers.get("content-type") || "";
  return contentType.includes("application/json") ? res.json() : res.text();
}