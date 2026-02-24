import type { Producto } from "../../../types/productosType"
import { Store, Tag } from "lucide-react"

interface Props {
    producto: Producto
}

export default function ProductoInfo({ producto }: Props) {
    const precioFinal = producto.descuento
        ? producto.precio - (producto.precio * producto.descuento) / 100
        : producto.precio

    const getBadgeEstado = () => {
        switch (producto.nombreEstado) {
            case "Activo":
                return "bg-emerald-50 text-emerald-700 border border-emerald-200"
            case "Producto creado pendiente de aprobación":
            case "Producto editado pendiente de aprobación":
                return "bg-amber-50 text-amber-700 border border-amber-200"
            case "Rechazado":
                return "bg-red-50 text-red-600 border border-red-200"
            default:
                return "bg-gray-100 text-gray-500 border border-gray-200"
        }
    }

    return (
        <div className="space-y-5">

            {/* Fila superior: categoría + estado */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-widest font-medium">
                    <Tag className="h-3 w-3" />
                    {producto.categoriaNombre}
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getBadgeEstado()}`}>
                    {producto.nombreEstado}
                </span>
            </div>

            {/* Nombre del producto */}
            <div className="space-y-1.5">
                <h1 className="text-2xl font-bold leading-tight tracking-tight">
                    {producto.nombreProducto}
                </h1>

                {/* Emprendimiento */}
                {producto.emprendimientoNombre && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Store className="h-3.5 w-3.5 shrink-0" />
                        <span>{producto.emprendimientoNombre}</span>
                    </div>
                )}
            </div>

            {/* Separador */}
            <div className="border-t" />

            {/* Precio */}
            <div className="flex items-baseline gap-3">
                {producto.descuento ? (
                    <>
                        <span className="text-3xl font-bold text-emerald-600">
                            ₡{precioFinal.toLocaleString()}
                        </span>
                        <span className="text-base text-muted-foreground line-through">
                            ₡{producto.precio.toLocaleString()}
                        </span>
                        <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                            -{producto.descuento}%
                        </span>
                    </>
                ) : (
                    <span className="text-3xl font-bold">
                        ₡{producto.precio.toLocaleString()}
                    </span>
                )}
            </div>

            {/* Separador */}
            <div className="border-t" />

            {/* Descripción */}
            <p className="text-sm text-muted-foreground leading-relaxed">
                {producto.descripcion}
            </p>

        </div>
    )
}