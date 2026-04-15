import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../auth/AuthContext";

import { handleFetchCarrito } from "./Actions/handleCargarCarrito";
import { handleActualizarCantidad } from "./Actions/handleActualizarCarrito";
import { handleEliminarItemCarrito } from "./Actions/handleEliminarItemCarrito";
import { handleCrearPedido } from "./Actions/handleConfirmarPedido";

import CarritoItemCard from "./components/carritoItemCard";
import CarritoResumen from "./components/carritoResumen";
import CarritoFormularioPedido from "./components/CarritoFormularioPedido";




import { useNavigate } from "react-router-dom";

export default function CarritoPage() {

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creandoPedido, setCreandoPedido] = useState(false);
  const [direccionEntrega, setDireccionEntrega] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const emprendimientoId = Number(localStorage.getItem("emprendimientoId") || 0); //TODO recuerda que esto no se debe hacer asi, que primero se haga una lsita de carritos y asi, esto hay que cambiarlo a futuro

  async function cargarCarrito() {

    try {

      setLoading(true);

      const data = await handleFetchCarrito(emprendimientoId);

      setItems(data);

    } catch {

      toast.error("No se pudo cargar el carrito");

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {
    cargarCarrito();
  }, [emprendimientoId]);

  const total = useMemo(() => {

    return items.reduce((acc, it) => {

      const precio = Number(it.precio) || 0;
      const descuento = Number(it.descuento) || 0;
      const cantidad = Number(it.cantidad) || 0;

      return acc + cantidad * (precio - descuento);

    }, 0);

  }, [items]);

  async function confirmarPedido() {

    try {
      setCreandoPedido(true);
      const usuarioId = user?.id;

      if (!usuarioId) {
        toast.error("Usuario no encontrado");
        setCreandoPedido(false);
        return;
      }

      const pedidoId = await handleCrearPedido(
        usuarioId,
        emprendimientoId,
        direccionEntrega,
        observaciones
      );

      toast.success("Pedido creado correctamente");
      
     

      
       navigate("https://descubriendoecoempresarias.netlify.app/pedidos/mis-pedidos/pedidos/mis-pedidos");

    } catch {

      toast.error("No se pudo crear el pedido");
      setCreandoPedido(false);
    }

  }

  if (loading) return <div className="p-6">Cargando carrito...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">
        Mi carrito
      </h1>

      {items.length === 0 && (
        <div>No tenés productos en el carrito.</div>
      )}

      {items.map((item) => (
        <CarritoItemCard
          key={`${item.carrito_id}-${item.producto_id}`}
          item={item}
          actualizarCantidad={handleActualizarCantidad}
          eliminarItem={handleEliminarItemCarrito}
          reload={cargarCarrito}
          emprendimientoId={emprendimientoId}
        />
      ))}

      <CarritoResumen total={total} />

      <CarritoFormularioPedido
        direccionEntrega={direccionEntrega}
        setDireccionEntrega={setDireccionEntrega}
        observaciones={observaciones}
        setObservaciones={setObservaciones}
        confirmarPedido={confirmarPedido}
      />

      {creandoPedido && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-sm font-medium">Confirmando pedido...</p>
      </div>
    </div>
  )}
    </div>
  );
}
