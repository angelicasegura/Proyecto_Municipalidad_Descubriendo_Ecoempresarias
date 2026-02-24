// Tabla que muestra los productos pendientes con botones de aprobar, rechazar y ver detalle.

import { useNavigate } from "react-router-dom"
import type { Producto } from "../../../../types/productosType"
import { Button } from "../../../../components/ui/button"
import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,
} from "../../../../components/ui/table"
import { Eye, Check, X } from "lucide-react"

interface Props {
    productos: Producto[]
    onAprobar: (producto: Producto) => void
    onRechazar: (producto: Producto) => void
}

export function ProductosPendientesTable({ productos, onAprobar, onRechazar }: Props) {
    const navigate = useNavigate()

    if (productos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border bg-muted/30 py-16">
                <p className="text-muted-foreground font-medium">No hay productos pendientes</p>
            </div>
        )
    }

    return (
        <div className="rounded-xl border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50">
                        <TableHead>Imagen</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Emprendimiento</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {productos.map((producto) => (
                        <TableRow key={producto.producto_id}>

                            {/* Imagen */}
                            <TableCell>
                                {producto.ruta_Imagen ? (
                                    <img
                                        src={`https://localhost:7050/api/Images/Buscar/3/${producto.ruta_Imagen}`}
                                        alt={producto.nombreProducto}
                                        className="h-12 w-12 rounded-lg object-cover border"
                                    />
                                ) : (
                                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                        Sin img
                                    </div>
                                )}
                            </TableCell>

                            {/* Nombre */}
                            <TableCell className="font-medium max-w-[160px] truncate">
                                {producto.nombreProducto}
                            </TableCell>

                            {/* Emprendimiento — necesitamos este campo en el tipo */}
                            <TableCell className="text-muted-foreground">
                                {producto.emprendimientoNombre ?? "—"}
                            </TableCell>

                            {/* Categoría */}
                            <TableCell className="text-muted-foreground">
                                {producto.categoriaNombre}
                            </TableCell>

                            {/* Precio */}
                            <TableCell>₡{producto.precio.toLocaleString()}</TableCell>

                            {/* Estado */}
                            <TableCell>
                                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-yellow-100 text-yellow-700">
                                    {producto.nombreEstado}
                                </span>
                            </TableCell>

                            {/* Acciones */}
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => navigate(`/productos/${producto.producto_id}`)}
                                        title="Ver detalle"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                        onClick={() => onAprobar(producto)}
                                        title="Aprobar"
                                    >
                                        <Check className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => onRechazar(producto)}
                                        title="Rechazar"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}