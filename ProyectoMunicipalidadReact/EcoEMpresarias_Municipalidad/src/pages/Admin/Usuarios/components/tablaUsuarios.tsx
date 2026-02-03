import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card"
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
import { Pencil, Ban, Check } from "lucide-react"
import { type User, getRolNombre } from "../../../../types/userType"

interface TablaUsuariosProps {
  users: User[]
  onEdit: (user: User) => void
  onToggleStatus: (user: User) => void
}

// Actualizamos las keys para que coincidan con los IDs de tu lógica
const roleBadgeColors: Record<number, string> = {
  1: "bg-blue-600 hover:bg-blue-700 text-white", // Administrador
  2: "bg-green-600 hover:bg-green-700 text-white", // Emprendedor
  3: "bg-gray-600 hover:bg-gray-700 text-white", // Usuario (ajustado de 4 a 3 según tu ROLES const)
}

export function TablaUsuarios({ users, onEdit, onToggleStatus }: TablaUsuariosProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b bg-card">
        <CardTitle className="text-lg font-medium">Listado de Usuarios</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-15">ID</TableHead>
                <TableHead>Nombre Completo</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Telefono</TableHead>
                <TableHead className="hidden lg:table-cell">Edad</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                /* Cambio: usuario_id -> idUsuario */
                <TableRow key={user.idUsuario} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-sm">{user.idUsuario}</TableCell>
                  <TableCell className="font-medium">
                    {user.nombre} {user.apellidos}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{user.telefono}</TableCell>
                  <TableCell className="hidden lg:table-cell">{user.edad}</TableCell>
                  <TableCell>
                    <Badge
                      /* Cambio: rol_id -> idRol */
                      variant={user.idRol === 1 ? "default" : user.idRol === 3 ? "outline" : "secondary"}
                      className={roleBadgeColors[user.idRol] || ""}
                    >
                      {getRolNombre(user.idRol)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      /* Cambio: estado_id -> idEstado */
                      variant={user.idEstado === 1 ? "default" : "destructive"}
                      className={user.idEstado === 1 ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                    >
                      {user.idEstado === 1 ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => onEdit(user)}
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className={`h-8 w-8 ${
                          user.idEstado === 1
                            ? "text-destructive hover:text-destructive"
                            : "text-green-600 hover:text-green-700"
                        }`}
                        onClick={() => onToggleStatus(user)}
                        title={user.idEstado === 1 ? "Desactivar" : "Activar"}
                      >
                        {user.idEstado === 1 ? <Ban className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 border-t py-3">
        <p className="text-sm text-muted-foreground">
          Se encontraron <strong className="text-foreground">{users.length}</strong> usuarios en esta página
        </p>
      </CardFooter>
    </Card>
  )
}
