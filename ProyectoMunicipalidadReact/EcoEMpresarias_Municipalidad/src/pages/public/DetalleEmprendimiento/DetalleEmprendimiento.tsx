import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import type { Emprendedor} from "../../../types/emprendedoresType";
import type { Producto, CategoriaProducto } from "../../../types/productosType";
import { handleFetchEmprendimiento } from "./Actions/handleFecthEmprendimiento";
import { handleFetchProductos } from "./Actions/handleFecthProductos";
import { handleFetchCategorias } from "./Actions/handleFetchCategorias";
import EmprendimientoHeader from "./components/EmprendimientoHeader";
import EmprendimientoMap from "./components/EmprendimientoMap";
import ProductosFilters from "./components/ProductosFilters";
import ProductosGrid from "./components/ProductosGrid";

export default function DetalleEmprendimiento() {
  const { id, cedulaJuridica } = useParams<{ id: string; cedulaJuridica: string }>();
  
  const [emprendedor, setEmprendedor] = useState<Emprendedor | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<CategoriaProducto[]>([]);
  const [loadingEmprendedor, setLoadingEmprendedor] = useState(true);
  const [loadingProductos, setLoadingProductos] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all");

  // Modal detalle
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Validar id
  const numericId = useMemo(() => {
    const parsed = Number(id);
    return !isNaN(parsed) && Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }, [id]);

  useEffect(() => {
    if (!numericId || !cedulaJuridica) {
      setError("ID de emprendimiento inválido");
      setLoadingEmprendedor(false);
      setLoadingProductos(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoadingEmprendedor(true);
        setLoadingProductos(true);
        setError(null);

        const [empData, prodData, catData] = await Promise.all([
          handleFetchEmprendimiento(cedulaJuridica),
          handleFetchProductos(numericId),
          handleFetchCategorias(numericId),
        ]);

        setEmprendedor(empData);
        setProductos(prodData);
        setCategorias(catData);
      } catch (err) {
        setError("Error al cargar los datos del emprendimiento");
        console.error(err);
      } finally {
        setLoadingEmprendedor(false);
        setLoadingProductos(false);
      }
    };

    fetchData();
  }, [numericId, cedulaJuridica]);

  // Filtrado local
  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const matchNombre = p.nombreProducto
        .toLowerCase()
        .includes(busqueda.toLowerCase());
      const matchCategoria =
        categoriaSeleccionada === "all" || p.categoriaNombre === categoriaSeleccionada;
      return matchNombre && matchCategoria;
    });
  }, [productos, busqueda, categoriaSeleccionada]);

  const handleLimpiarFiltros = () => {
    setBusqueda("");
    setCategoriaSeleccionada("all");
  };

  const handleVerDetalle = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setDialogOpen(true);
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-emprendimiento-bg p-4">
        <div className="rounded-2xl bg-card p-8 text-center shadow-md">
          <p className="text-lg font-medium text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-emprendimiento-bg">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 md:py-10">
        {/* 1. Hero */}
        <EmprendimientoHeader emprendedor={emprendedor} loading={loadingEmprendedor} />

        {/* 2. Mapa */}
        {emprendedor?.direccion && (
          <EmprendimientoMap direccion={emprendedor.direccion} />
        )}

        {/* 3. Filtros */}
        <ProductosFilters
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          categoriaSeleccionada={categoriaSeleccionada}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
          categorias={categorias}
          onLimpiar={handleLimpiarFiltros}
        />

        {/* 4. Grid de Productos */}
        <ProductosGrid
          productos={productosFiltrados}
          loading={loadingProductos}
          onVerDetalle={handleVerDetalle}
        />

        
      </div>
    </main>
  );
}