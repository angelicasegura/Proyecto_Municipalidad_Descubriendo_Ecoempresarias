import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  actualizarCantidad,
  eliminarItem,
  obtenerMiCarrito,
} from "../../../services/carritoService";
import { agregarPedido } from "../../../services/pedidoService";
import type { Pedido } from "../../../types/pedidoType";
import { useAuth } from "../../../auth/AuthContext";

type CarritoItem = {
  carrito_id: string;
  cantidad: number;

  producto_id: number;
  nombreProducto: string;
  descripcion?: string;
  precio: number;
  descuento?: number | null;
  ruta_imagen?: string | null;
  emprendimiento_id?: number;
};

export default function CarritoPage() {
  const [items, setItems] = useState<CarritoItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [direccionEntrega, setDireccionEntrega] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [creandoPedido, setCreandoPedido] = useState(false);

  const { user } = useAuth();

  console.log("itemssssssssssssssssss", items);

  const emprendimientoId = Number(localStorage.getItem("emprendimientoId") || 0);

  async function cargar() {
    try {
      if (!emprendimientoId) {
        setItems([]);
        return;
      }

      setLoading(true);
      const data = await obtenerMiCarrito(emprendimientoId);

      const lista = Array.isArray(data) ? data : data?.data ?? [];
      setItems(lista);
    } catch (e) {
      console.error(e);
      toast.error("No se pudo cargar el carrito");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargar();
  }, [emprendimientoId]);

  const total = useMemo(() => {
    return items.reduce((acc, it) => {
      const precio = Number(it.precio) || 0;
      const descuento = it.descuento != null ? Number(it.descuento) || 0 : 0;
      const cantidad = Number(it.cantidad) || 0;

      const precioFinal = precio - descuento;
      if (!Number.isFinite(cantidad) || !Number.isFinite(precioFinal)) {
        console.log("Item con valores inválidos:", it);
      }
      return acc + cantidad * precioFinal;
    }, 0);
  }, [items]);

  async function handleConfirmarPedido() {
    try {
      if (!emprendimientoId) {
        toast.error("No hay un emprendimiento seleccionado");
        return;
      }

      if (items.length === 0) {
        toast.error("No tenés productos en el carrito");
        return;
      }

      if (!direccionEntrega.trim()) {
        toast.error("Debés ingresar la dirección de entrega");
        return;
      }

      const usuarioId = user?.id ?? 0;

      if (!usuarioId) {
        toast.error("No se encontró el usuario logueado");
        return;
      }

      const pedido: Pedido = {
        usuarioId,
        emprendimientoId,
        direccionEntrega: direccionEntrega.trim(),
        observaciones: observaciones.trim(),
        detalles: items.map((item) => ({
          productoId: item.producto_id,
          cantidad: Number(item.cantidad),
          precioUnitario:
            (Number(item.precio) || 0) -
            (item.descuento != null ? Number(item.descuento) || 0 : 0),
        })),
      };

      console.log("Pedido a enviar:", pedido);

      setCreandoPedido(true);

      const resultado = await agregarPedido(pedido);

      toast.success(`Pedido #${resultado.pedidoId} creado correctamente`);

      setDireccionEntrega("");
      setObservaciones("");
      setItems([]);

      console.log("Pedido creado:", resultado);
    } catch (e) {
      console.error(e);
      toast.error("No se pudo crear el pedido");
    } finally {
      setCreandoPedido(false);
    }
  }

  if (loading) return <div className="p-6">Cargando carrito...</div>;

  if (!emprendimientoId) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-2">Mi carrito</h1>
        <div className="text-sm text-gray-600">
          No hay un emprendimiento seleccionado. Volvé a un producto y agregalo al carrito.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Mi carrito</h1>

      {items.length === 0 ? (
        <div>No tenés productos en el carrito.</div>
      ) : (
        <div className="space-y-4">
          {items.map((it) => (
            <div
              key={`${it.carrito_id}-${it.producto_id}`}
              className="border rounded-lg p-4 flex gap-4 items-center"
            >
              <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                {it.ruta_imagen ? (
                  <img
                    src={`https://localhost:7050/api/Images/Buscar/3/${it.ruta_imagen}`}
                    alt={it.nombreProducto}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-500">Sin imagen</span>
                )}
              </div>

              <div className="flex-1">
                <div className="font-medium">{it.nombreProducto}</div>
                <div className="text-sm text-gray-600">
                  ₡{Number(it.precio).toFixed(2)}
                  {it.descuento != null
                    ? ` (-₡${Number(it.descuento).toFixed(2)})`
                    : ""}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  className="w-20 border rounded px-2 py-1"
                  value={it.cantidad}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const v = raw === "" ? 1 : Number(raw);
                    const safe = Number.isFinite(v) && v >= 1 ? v : 1;

                    setItems((prev) =>
                      prev.map((x) =>
                        x.producto_id === it.producto_id
                          ? { ...x, cantidad: safe }
                          : x
                      )
                    );
                  }}
                />

                <button
                  className="px-3 py-1 border rounded"
                  onClick={async () => {
                    try {
                      await actualizarCantidad({
                        emprendimientoId,
                        productoId: it.producto_id,
                        Cantidad: Number(it.cantidad),
                      });
                      toast.success("Cantidad actualizada");
                      await cargar();
                    } catch (e) {
                      console.error(e);
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
                      await eliminarItem({
                        emprendimientoId,
                        productoId: it.producto_id,
                      });
                      toast.success("Eliminado");
                      await cargar();
                    } catch (e) {
                      console.error(e);
                      toast.error("No se pudo eliminar");
                    }
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <div className="flex justify-end mb-4">
              <div className="text-lg font-semibold">
                Total: ₡{total.toFixed(2)}
              </div>
            </div>

            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Dirección de entrega
                </label>
                <input
                  type="text"
                  value={direccionEntrega}
                  onChange={(e) => setDireccionEntrega(e.target.value)}
                  placeholder="Escribí la dirección de entrega"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Observaciones
                </label>
                <textarea
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Observaciones del pedido"
                  className="w-full border rounded px-3 py-2 min-h-[100px]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
                  onClick={handleConfirmarPedido}
                  disabled={creandoPedido}
                >
                  {creandoPedido ? "Creando pedido..." : "Confirmar pedido"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}