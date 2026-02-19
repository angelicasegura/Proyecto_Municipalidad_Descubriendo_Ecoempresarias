import type { Producto } from "../../../../types/productosType"
import type { Estado } from "../../../../types/userType"
interface Props {
  producto: Producto
}

export default function ProductoInfo({ producto }: Props) {
  const precioFinal = producto.descuento
    ? producto.precio - (producto.precio * producto.descuento) / 100
    : producto.precio

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">
        {producto.nombreProducto}
      </h1>


      <p className="text-muted-foreground">
        {producto.descripcion}
      </p>

      <div className="flex items-center gap-3">
        {producto.descuento && (
          <span className="text-lg line-through text-muted-foreground">
            ₡ {producto.precio}
          </span>
        )}

        <span className="text-2xl font-semibold text-primary">
          ₡ {precioFinal}
        </span>

        {producto.descuento && (
          <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            -{producto.descuento}%
          </span>
        )}
      </div>
    </div>
  )
}