import { useNavigate } from "react-router-dom"
import type { Producto } from "../../../types/productosType"

interface Props {
    producto: Producto
}

export default function ProductoCard({ producto }: Props) {
    const navigate = useNavigate() 

    // Calculamos el precio con descuento si existe
    const precioFinal = producto.descuento
        ? producto.precio - (producto.precio * producto.descuento) / 100
        : producto.precio

    return (
        <div
            onClick={() => navigate(`/producto/${producto.producto_id}`)}
            className="cursor-pointer rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
            {/* Imagen del producto */}
            <div className="aspect-[4/3] w-full bg-gray-50 flex items-center justify-center overflow-hidden">
                {producto.ruta_Imagen ? (
                    <img
                        src={`https://localhost:7050/api/Images/Buscar/3/${producto.ruta_Imagen}`}
                        alt={producto.nombreProducto}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-sm text-muted-foreground">Sin imagen</span>
                )}
            </div>

            {/* Info del producto */}
            <div className="p-4 space-y-1">
                {/* Categoría pequeña arriba */}
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {producto.categoriaNombre}
                </p>

                {/* Nombre */}
                <h3 className="font-semibold text-base leading-tight line-clamp-2">
                    {producto.nombreProducto}
                </h3>

                {/* Descripción recortada */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {producto.descripcion}
                </p>

                {/* Precio */}
                <div className="flex items-center justify-between pt-2">
                    <div>
                        {producto.descuento ? (
                            // Si tiene descuento, mostramos precio tachado y precio final
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground line-through">
                                    ₡{producto.precio.toLocaleString()}
                                </span>
                                <span className="font-bold text-green-600">
                                    ₡{precioFinal.toLocaleString()}
                                </span>
                            </div>
                        ) : (
                            <span className="font-bold text-gray-900">
                                ₡{producto.precio.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* Badge de estado */}
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${producto.nombreEstado === "Activo"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}>
                        {producto.nombreEstado}
                    </span>
                </div>
            </div>
        </div>
    )
}