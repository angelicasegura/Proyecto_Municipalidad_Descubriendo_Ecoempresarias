// Tabla que lista todos los productos del emprendedor.
// Cada fila tiene botones de Ver detalle, Editar y Eliminar.

import { useNavigate } from "react-router-dom"
import type { Producto } from "../../../../types/productosType"
import { Button } from "../../../../components/ui/button"
import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow
} from "../../../../components/ui/table"
import { Eye, Pencil, Trash2 } from "lucide-react"

interface Props {
    productos: Producto[]
    onEditar: (producto: Producto) => void
    onEliminar: (producto: Producto) => void
}

export function MisProductosTable({ productos, onEditar, onEliminar }: Props) {
    const navigate = useNavigate()

    if (productos.length === 0 || productos.every(p => p.nombreEstado !== "Activo")) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border bg-muted/30 py-16">
                <p className="text-muted-foreground font-medium">Aún no tenés productos registrados</p>
                <p className="text-sm text-muted-foreground">Usá el botón "Agregar producto" para comenzar</p>
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
                        <TableHead>Categoría</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Descuento</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {productos.map((producto) => (
                        <TableRow key={producto.producto_id}>

                            {/* Imagen miniatura */}
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
                            <TableCell className="font-medium max-w-[180px] truncate">
                                {producto.nombreProducto}
                            </TableCell>

                            {/* Categoría */}
                            <TableCell className="text-muted-foreground">
                                {producto.categoriaNombre}
                            </TableCell>

                            {/* Precio */}
                            <TableCell>₡{producto.precio.toLocaleString()}</TableCell>

                            {/* Descuento */}
                            <TableCell>
                                {producto.descuento ? (
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                        -{producto.descuento}%
                                    </span>
                                ) : (
                                    <span className="text-muted-foreground text-xs">—</span>
                                )}
                            </TableCell>

                            {/* Estado */}
                            <TableCell>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${producto.nombreEstado === "Activo"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-500"
                                    }`}>
                                    {producto.nombreEstado}
                                </span>
                            </TableCell>

                            {/* Botones de acción */}
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
                                        onClick={() => onEditar(producto)}
                                        title="Editar"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => onEliminar(producto)}
                                        title="Eliminar"
                                    >
                                        <Trash2 className="h-4 w-4" />
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