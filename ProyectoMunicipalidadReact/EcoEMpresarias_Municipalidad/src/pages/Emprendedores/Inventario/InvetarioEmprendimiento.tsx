// InventarioEmprendimiento.tsx (padre)
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import type { Inventario, InventarioRequest } from "../../../types/productosType";
import { handleFetchInventarioEmprendimiento } from "./Actions/handleFetchInventarioEMprendimeinto";
import { InventarioGrid } from "./components/InventarioGrid";

export default function InventarioEmprendimiento() {
  const { id, cedulaJuridica } = useParams<{ id: string; cedulaJuridica: string }>();
  const [inventario, setInventario] = useState<Inventario[]>([]);
  const numericId = useMemo(() => Number(id) || null, [id]);

  useEffect(() => {
    if (!numericId || !cedulaJuridica) return;
    const loadInventario = async () => {
      try {
        const inventarioData = await handleFetchInventarioEmprendimiento(numericId.toString(), cedulaJuridica);
        setInventario(inventarioData);
      } catch (err) {
        console.error("Error cargando inventario:", err);
      }
    };
    loadInventario();
  }, [numericId, cedulaJuridica]);

  
  const handleUpdated = (payload: InventarioRequest) => {
    setInventario(prev =>
      prev.map(it =>
        it.productoId === payload.productoId
          ? { ...it, cantidadActual: payload.cantidadActual, cantidadMinima: payload.cantidadMinima }
          : it
      )
    );
  };

  return (
    <div>
      <InventarioGrid
        items={inventario}
        CedulaJuridica={cedulaJuridica || ""}
        emprendimientoId={numericId || undefined}
        onUpdated={handleUpdated}
      />
    </div>
  );
}
