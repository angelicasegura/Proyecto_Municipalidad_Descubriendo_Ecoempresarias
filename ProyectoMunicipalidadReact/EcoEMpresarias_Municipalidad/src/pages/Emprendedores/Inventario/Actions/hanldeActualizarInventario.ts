// lib/api.ts
import { authFetch } from "../../../../auth/AuthFetch";
import { type InventarioRequest } from "../../../../types/productosType";

export async function handleActualizarInventario(
  payload: InventarioRequest,
  CedulaJuridica: string,
  emprendimientoId: number,
) {
  // Validación básica
  if (!payload.productoId || !/^[0-9a-fA-F-]{36}$/.test(payload.productoId)) {
    throw new Error("Inventarioid inválido (debe ser GUID)");
  }

  if (!CedulaJuridica) throw new Error("Falta CedulaJuridica");
  if (!emprendimientoId) throw new Error("Falta emprendimientoId");

  // Verificar usuario (opcional, pero útil para debug)
  const userRes = await authFetch("https://localhost:7050/auth/me");
  if (!userRes.ok) throw new Error("No autenticado");
  const user = await userRes.json();
  if (!user?.id) throw new Error("Usuario no autenticado");

  
  const params = new URLSearchParams({
    Inventarioid: payload.productoId,
    emprendimiento_id: emprendimientoId.toString(),
    CedulaJuridica,
  });

  const url = `https://localhost:7050/api/Inventario/Editar?${params.toString()}`;
  console.debug("handleActualizarInventario -> URL:", url, "BODY:", payload);

  const res = await authFetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(
      "handleActualizarInventario - status:",
      res.status,
      "body:",
      text,
    );
    throw new Error(
      text || `Error actualizando inventario (status ${res.status})`,
    );
  }

  return res.json();
}
