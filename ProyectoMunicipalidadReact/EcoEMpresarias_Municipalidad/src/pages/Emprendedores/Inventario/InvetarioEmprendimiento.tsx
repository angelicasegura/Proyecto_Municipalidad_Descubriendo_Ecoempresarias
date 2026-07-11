import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import type { Inventario, InventarioRequest } from "../../../types/productosType";
import { handleFetchInventarioEmprendimientoFiltrado } from "./Actions/handleFetchInventarioEMprendimeinto";
import { InventarioGrid } from "./components/InventarioGrid";
import { useDebounce } from "../../../types/useDebounce";

export default function InventarioEmprendimiento() {
  const { id, cedulaJuridica } = useParams<{ id: string; cedulaJuridica: string }>();
  const [inventario, setInventario] = useState<Inventario[]>([]);
  const [nombre, setNombre] = useState("");
  const numericId = useMemo(() => Number(id) || null, [id]);

  const nombreDebounced = useDebounce(nombre, 400);

  useEffect(() => {
    if (!numericId || !cedulaJuridica) return;
    const loadInventario = async () => {
      try {
        const inventarioData = await handleFetchInventarioEmprendimientoFiltrado(
          numericId.toString(),
          cedulaJuridica,
          nombreDebounced
        );
        setInventario(inventarioData);
      } catch (err) {
        console.error("Error cargando inventario:", err);
      }
    };
    loadInventario();
  }, [numericId, cedulaJuridica, nombreDebounced]);

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
        nombreBusqueda={nombre}
        onNombreBusquedaChange={setNombre}
      />
    </div>
  );
}