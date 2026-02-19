import type { Producto } from "../../../../types/productosType";
import ProductoCard from "./ProductoCard";
import { Skeleton } from "../../../../components/ui/skeleton";
import { PackageOpen } from "lucide-react";

interface Props {
  productos: Producto[];
  loading: boolean;
  onVerDetalle: (producto: Producto) => void;
}

export default function ProductosGrid({ productos, loading, onVerDetalle }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl shadow-sm">
            <Skeleton className="aspect-[4/3] w-full" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <div className="flex justify-between pt-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-8 w-16 rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-muted/50 py-16">
        <PackageOpen className="h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-medium text-muted-foreground">
          No se encontraron productos
        </p>
        <p className="text-sm text-muted-foreground">
          Intenta con otros filtros de búsqueda
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {productos.map((producto) => (
        <ProductoCard
          key={producto.producto_id}
          producto={producto}
          onVerDetalle={onVerDetalle}
        />
      ))}
    </div>
  );
}