import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  actualizarCantidad,
  eliminarItem,
  obtenerMiCarrito,
} from "../../../services/carritoService";

type CarritoItem = {
  Carrito_id: number; 
  Cantidad: number;

  Producto_id: string; 
  NombreProducto: string;
  Descripcion?: string;
  Precio: number;
  Descuento?: number | null;
  Ruta_Imagen?: string | null;
  Emprendimiento_id?: number;
};

export default function CarritoPage() {
  const [items, setItems] = useState<CarritoItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function cargar() {
    try {
      setLoading(true);
      const data = await obtenerMiCarrito();

      const lista = Array.isArray(data) ? data : data?.data ?? [];
      setItems(lista);
    } catch {
      toast.error("No se pudo cargar el carrito");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  const total = useMemo(() => {
    return items.reduce((acc, it) => {
      const precioFinal =
        it.Descuento != null ? it.Precio - it.Descuento : it.Precio;
      return acc + Number(it.Cantidad) * Number(precioFinal);
    }, 0);
  }, [items]);

  if (loading) return <div className="p-6">Cargando carrito...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Mi carrito</h1>

      {items.length === 0 ? (
        <div>No tenés productos en el carrito.</div>
      ) : (
        <div className="space-y-4">
          {items.map((it) => (
            <div
              key={it.Carrito_id}
              className="border rounded-lg p-4 flex gap-4 items-center"
            >
              <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                {it.Ruta_Imagen ? (
                  <img
                    src={it.Ruta_Imagen}
                    alt={it.NombreProducto}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-500">Sin imagen</span>
                )}
              </div>

              <div className="flex-1">
                <div className="font-medium">{it.NombreProducto}</div>
                <div className="text-sm text-gray-600">
                  ₡{Number(it.Precio).toFixed(2)}
                  {it.Descuento != null
                    ? ` (-₡${Number(it.Descuento).toFixed(2)})`
                    : ""}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  className="w-20 border rounded px-2 py-1"
                  value={it.Cantidad}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setItems((prev) =>
                      prev.map((x) =>
                        x.Carrito_id === it.Carrito_id
                          ? { ...x, Cantidad: v }
                          : x
                      )
                    );
                  }}
                />

                <button
                  className="px-3 py-1 border rounded"
                  onClick={async () => {
                    try {
                      await actualizarCantidad(it.Carrito_id, Number(it.Cantidad));
                      toast.success("Cantidad actualizada");
                      await cargar();
                    } catch {
                      toast.error("No se pudo actualizar");
                    }
                  }}
                >
                  Guardar
                </button>

                <button
                  className="px-3 py-1 border rounded text-red-600"
                  onClick={async () => {
                    try {
                      await eliminarItem(it.Carrito_id);
                      toast.success("Eliminado");
                      await cargar();
                    } catch {
                      toast.error("No se pudo eliminar");
                    }
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t flex justify-end">
            <div className="text-lg font-semibold">
              Total: ₡{total.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}