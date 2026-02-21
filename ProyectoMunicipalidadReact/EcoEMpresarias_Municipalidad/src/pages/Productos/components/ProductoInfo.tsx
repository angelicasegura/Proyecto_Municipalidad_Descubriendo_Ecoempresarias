import type { Producto } from "../../../types/productosType"

interface Props {
    producto: Producto
}

export default function ProductoInfo({ producto }: Props) {
    const precioFinal = producto.descuento
        ? producto.precio - (producto.precio * producto.descuento) / 100
        : producto.precio

    return (
        <div className="space-y-4">
            {/* Categoría */}
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
                {producto.categoriaNombre}
            </p>

            {/* Nombre */}
            <h1 className="text-3xl font-bold">{producto.nombreProducto}</h1>
                        {/* Descripción */}
            <p className="text-muted-foreground leading-relaxed">
                {producto.descripcion}
            </p>

            {/* Precio */}
            <div className="flex items-center gap-3">
                {producto.descuento ? (
                    <>
                        <span className="text-2xl font-bold text-green-600">
                            ₡{precioFinal.toLocaleString()}
                        </span>
                        <span className="text-lg text-muted-foreground line-through">
                            ₡{producto.precio.toLocaleString()}
                        </span>
                        <span className="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            -{producto.descuento}%
                        </span>
                    </>
                ) : (
                    <span className="text-2xl font-bold">
                        ₡{producto.precio.toLocaleString()}
                    </span>
                )}
            </div>

            {/* Estado */}
            <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${producto.nombreEstado === "Activo"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}>
                {producto.nombreEstado}
            </span>
        </div>
    )
}