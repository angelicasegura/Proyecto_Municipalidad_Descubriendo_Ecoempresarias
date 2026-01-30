import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table"
import { Badge } from "../../../../components/ui/badge"
import { Button } from "../../../../components/ui/button"
import { Alert, AlertDescription } from "../../../../components/ui/alert"
import { Pencil, Ban, Check, Inbox } from "lucide-react"
import { type Emprendedor, getTipoActividadNombre } from "../../../../types/emprendedoresType"

interface EmprendedoresTableProps {
  emprendedores: Emprendedor[]
  onEdit: (emprendedor: Emprendedor) => void
  onToggleStatus: (emprendedor: Emprendedor) => void
}

export function EmprendedoresTable({ emprendedores, onEdit, onToggleStatus }: EmprendedoresTableProps) {
  if (emprendedores.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="bg-muted/50 border-b">
          <CardTitle className="text-lg font-medium">Lista de Emprendedores</CardTitle>
        </CardHeader>
        <CardContent className="py-8">
          <Alert className="bg-blue-50 border-blue-200">
            <Inbox className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              No hay emprendedores registrados que coincidan con tu búsqueda
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-muted/50 border-b">
        <CardTitle className="text-lg font-medium">Lista de Emprendedores</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Nombre</TableHead>
                <TableHead>Cédula Jurídica</TableHead>
                <TableHead>Tipo de Actividad</TableHead>
                <TableHead className="hidden md:table-cell">Correo</TableHead>
                <TableHead className="hidden lg:table-cell">Teléfono</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emprendedores.map((emprendedor) => (
                <TableRow key={emprendedor.emprendedor_id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{emprendedor.nombre}</TableCell>
                  <TableCell className="font-mono text-sm">{emprendedor.cedula_juridica}</TableCell>
                  <TableCell>{getTipoActividadNombre(emprendedor.tipo_actividad_id)}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {emprendedor.correo}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{emprendedor.telefono}</TableCell>
                  <TableCell>
                    <Badge
                      variant={emprendedor.estado_id === 1 ? "default" : "destructive"}
                      className={emprendedor.estado_id === 1 ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {emprendedor.estado_id === 1 ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => onEdit(emprendedor)}
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className={`h-8 w-8 bg-transparent ${
                          emprendedor.estado_id === 1
                            ? "text-destructive hover:text-destructive"
                            : "text-green-600 hover:text-green-700"
                        }`}
                        onClick={() => onToggleStatus(emprendedor)}
                        title={emprendedor.estado_id === 1 ? "Desactivar" : "Activar"}
                      >
                        {emprendedor.estado_id === 1 ? <Ban className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
