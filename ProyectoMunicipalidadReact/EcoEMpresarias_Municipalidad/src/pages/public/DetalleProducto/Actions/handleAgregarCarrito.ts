import { authFetch } from "../../../../auth/AuthFetch";
import toast from "react-hot-toast";

type AgregarCarritoRequest = {
  emprendimientoId: number;
  productoId: string;
  cantidad: number;
};

export async function handleAgregarCarrito(payload: AgregarCarritoRequest) {

  const toastId = toast.loading("Agregando producto al carrito...");

  try {
    const res = await authFetch("https://apidescubriendoecoempresarias-gybugkhkbagse2e4.canadacentral-01.azurewebsites.net/api/Carrito/Agregar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Error al agregar al carrito");
    }

    const contentType = res.headers.get("content-type") || "";
    const result = contentType.includes("application/json")
      ? await res.json()
      : await res.text();

    toast.success("Producto agregado al carrito", { id: toastId });

    return result;

  } catch (error: any) {
    toast.error(error.message || "No se pudo agregar al carrito", { id: toastId });
    throw error;
  }
}