import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Producto } from "../../../types/productosType";

import { handleFetchProducto } from "./Actions/handleFetchProducto";



import ProductoInfo from "./components/ProductoInfo";
import ProductoCantidad from "./components/ProductoCantidad";
import { Button } from "../../../components/ui/button";

import { PageLoader } from "../../../components/ui/layout/pageLoader";

import { useNavigate } from "react-router-dom";

export default function DetalleProductoPage() {
  const { id } = useParams<{ id: string }>();

  const [producto, setProducto] = useState<Producto | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
  if (!id) return;

  const fetchData = async () => {
    try {
      const data = await handleFetchProducto(id);
      setProducto(data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, [id]);

 if (!producto) {
  return <PageLoader />;
}

  return (
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 md:py-10">
        <Button
  variant="ghost"
  className="mb-6 pl-0 text-muted-foreground"
  onClick={() => navigate(-1)}
>
  ← Volver
</Button>
      <div className="grid md:grid-cols-2 gap-12 items-start">

      {/* IZQUIERDA — IMAGEN */}
      <div className="rounded-2xl border bg-white p-10 flex items-center justify-center">
        {producto ? (
          <img
            src={`https://localhost:7050/api/Images/Buscar/3/${producto.ruta_Imagen}`}
            alt="Imagen del producto"
            className="max-h-[450px] w-auto object-contain"
          />
        ) : (
          <div className="text-muted-foreground">Sin imagen disponible</div>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <ProductoInfo producto={producto} />

        <ProductoCantidad cantidad={cantidad} setCantidad={setCantidad} />

        <Button
          className="mt-4 w-full"
          size="lg"
          onClick={() =>
            console.log("Agregar:", {
              producto_id: producto.producto_id,
              cantidad,
            })
          }
        >
          Agregar al carrito
        </Button>
      </div>
    </div>
        </div>
  );
}
