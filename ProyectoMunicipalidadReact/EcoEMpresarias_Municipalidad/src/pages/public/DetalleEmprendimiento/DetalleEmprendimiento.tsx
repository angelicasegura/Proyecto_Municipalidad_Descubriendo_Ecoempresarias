import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import type { Emprendedor } from "../../../types/emprendedoresType";
import type { Producto, CategoriaProducto } from "../../../types/productosType";

import { handleFetchEmprendimiento } from "./Actions/handleFecthEmprendimiento";
import { handleFetchProductos } from "./Actions/handleFecthProductos";
import { handleFetchCategorias } from "./Actions/handleFetchCategorias";

import EmprendimientoHeader from "./components/EmprendimientoHeader";
import EmprendimientoMap from "./components/EmprendimientoMap";
import ProductosFilters from "./components/ProductosFilters";
import ProductosGrid from "./components/ProductosGrid";

import { Button } from "../../../components/ui/button";
import ComentariosSection from "./components/ComentarioSection";
export default function DetalleEmprendimiento() {
  const { id, cedulaJuridica } = useParams<{ id: string; cedulaJuridica: string }>();

  // Estados de Datos
  const [emprendedor, setEmprendedor] = useState<Emprendedor | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<CategoriaProducto[]>([]);

  // Estados de UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  // Filtros (Como en tu ejemplo)
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("all");

  const numericId = useMemo(() => Number(id) || null, [id]);

  // 
  useEffect(() => {
    if (!numericId || !cedulaJuridica) return;

    const loadInitialData = async () => {
      try {
        const [empData, catData] = await Promise.all([
          handleFetchEmprendimiento(cedulaJuridica),
          handleFetchCategorias(numericId)
        ]);
        setEmprendedor(empData);
        setCategorias(catData);
      } catch (err) {
        console.error("Error cargando info base:", err);
      }
    };

    loadInitialData();
  }, [numericId, cedulaJuridica]);

  // 2. 
  useEffect(() => {
    if (!numericId) return;

    const getFilteredProductos = async () => {
      try {
        setLoading(true);
        const data = await handleFetchProductos(numericId, categoriaFilter == "all" ? undefined : categoriaFilter, searchTerm);
        console.log(categoriaFilter)
        setProductos(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Error al filtrar productos");
      } finally {
        setLoading(false);
      }
    };

    // Debounce para no saturar la API mientras escribes
    const timer = setTimeout(getFilteredProductos, 400);
    return () => clearTimeout(timer);

  }, [searchTerm, categoriaFilter, numericId]);

 

  return (
    <main className="min-h-screen bg-emprendimiento-bg">

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 md:py-10">
        
        <Button
          variant="ghost"
          className="mb-6 pl-0 text-muted-foreground"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </Button>
        <EmprendimientoHeader emprendedor={emprendedor} loading={!emprendedor} />

        {emprendedor?.direccion && <EmprendimientoMap direccion={emprendedor.direccion} />}

        <ProductosFilters
          busqueda={searchTerm}
          setBusqueda={setSearchTerm}
          categoriaSeleccionada={categoriaFilter}
          setCategoriaSeleccionada={setCategoriaFilter}
          categorias={categorias}
          onLimpiar={() => {
            setSearchTerm("");
            setCategoriaFilter("all");
          }}
        />

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {productos.length} {productos.length === 1 ? "producto encontrado" : "productos encontrados"}
          </p>
        </div>

        <ProductosGrid
          productos={productos}
          loading={loading}
        />
        <div className="px-4 pb-4 bg-white">
          <h3 className="text-xl font-semibold">Comentarios</h3>
         
          <div className="px-4 pb-4">
            {numericId && (
              <ComentariosSection emprendimientoId={numericId} />
            )}
          </div>
        </div>

      </div>

    </main>
  );
}