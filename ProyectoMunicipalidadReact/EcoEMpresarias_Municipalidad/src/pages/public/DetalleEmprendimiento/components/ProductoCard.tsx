import type { Producto } from "../../../../types/productosType";
import { Card, CardContent, CardFooter } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { calcularPrecioFinal, obtenerTextoDescuento, formatearPrecio } from "../../../../types/productosType";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  producto: Producto;
}

export default function ProductoCard({ producto }: Props) {
  const tieneDescuento = !!producto.descuento && producto.descuento > 0;
  const precioFinal = calcularPrecioFinal(producto.precio, producto.descuento);
  const textoDescuento = obtenerTextoDescuento(producto.descuento);
  
  return (
    <Card className="group overflow-hidden rounded-2xl border-0 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <Link to={`/producto/${producto.producto_id}`} className="block w-full h-full">
      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={`https://localhost:7050/api/Images/Buscar/3/${producto.ruta_Imagen}`}
          alt={producto.nombreProducto}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {tieneDescuento && (
          <Badge className="absolute right-3 top-3 bg-[#FF0000] text-white hover:bg-emprendimiento-hover font-bold shadow-md">
            {textoDescuento}
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {producto.categoriaNombre}
        </p>
        <h3 className="mb-1 text-base font-semibold text-emprendimiento-text line-clamp-1">
          {producto.nombreProducto}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {producto.descripcion}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between px-4 pb-4 pt-0">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-emprendimiento-text">
            {formatearPrecio(precioFinal)}
          </span>
          {tieneDescuento && (
            <span className="text-sm text-muted-foreground line-through">
              {formatearPrecio(producto.precio)}
            </span>
          )}
        </div>
        <Button
          size="sm"
          onClick={() => {}}
          className="rounded-xl bg-emprendimiento-primary text-emprendimiento-text hover:bg-emprendimiento-hover"
        >
          <Eye className="mr-1 h-4 w-4" />
          Ver
        </Button>
      </CardFooter>
      </Link>
    </Card>
  );
}
