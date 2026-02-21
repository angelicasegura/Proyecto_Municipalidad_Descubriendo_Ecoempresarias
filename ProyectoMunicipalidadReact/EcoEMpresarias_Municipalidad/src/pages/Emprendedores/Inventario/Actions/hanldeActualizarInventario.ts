// lib/api.ts
import { authFetch } from "../../../../auth/AuthFetch";
import { type InventarioRequest } from "../../../../types/productosType";
import toast from "react-hot-toast";

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

  const res = authFetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(async (response) => {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error al actualizar el inventario");
    }
    return response.json();
  });

  toast.promise(res, {
    loading: "Actualizando inventario...",
    success: "Inventario actualizado correctamente 🎉",
    error: (err) => err.message || "No se pudo actualizar el inventario",
  },
{ duration: 4000 });

  return res;
}
