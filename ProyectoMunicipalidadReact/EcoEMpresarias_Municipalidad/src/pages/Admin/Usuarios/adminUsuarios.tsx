import { useState } from "react"
import { FiltroUsuarios } from "./components/filtroUsuarios"
import { HeaderUsuarios } from "./components/headerUsuarios"
import { TablaUsuarios } from "./components/tablaUsuarios"
import { ModalCreacionUsuario } from "./components/modalCreacionUsuario"
import { ModalEdicionUsuarios } from "./components/modalEdicionUsuarios"
import type { User } from "../../../types/userType"
import { ModalEstadoUsuarios } from "./components/modalEstadoUsuario"

/*  //Todo Lista cosas por hacer 
-Agregacion con api pero falta para ello
-poner bien los colores y estilos
-pagina emprendedores
*/
const initialUsers: User[] = [
  {
    usuario_id: 1,
    nombre: "Juan Carlos",
    apellidos: "Pérez",
    email: "juan.perez@ecoempresarias.mx",
    telefono: "+52 555-1234",
    edad: 35,
    rol_id: 1,
    estado_id: 1,
  },
  {
    usuario_id: 2,
    nombre: "María",
    apellidos: "García López",
    email: "maria.garcia@ecoempresarias.mx",
    telefono: "+52 555-5678",
    edad: 28,
    rol_id: 2,
    estado_id: 1,
  },
  {
    usuario_id: 3,
    nombre: "Carlos",
    apellidos: "Hernández Ruiz",
    email: "carlos.hernandez@ecoempresarias.mx",
    telefono: "+52 555-9012",
    edad: 42,
    rol_id: 3,
    estado_id: 2,
  },
]

export default function AdminUsuarios() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("")
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      `${user.nombre} ${user.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = !roleFilter || user.rol_id === Number(roleFilter)
    return matchesSearch && matchesRole
  })

  const handleCreateUser = (newUser: Omit<User, "usuario_id" | "estado_id">) => {
    const user: User = {
      ...newUser,
      usuario_id: Math.max(...users.map((u) => u.usuario_id)) + 1,
      estado_id: 1, // Activo por defecto
    }
    setUsers([...users, user])
    setCreateDialogOpen(false)
  }

  const handleEditUser = (updatedUser: User) => {
    setUsers(users.map((u) => (u.usuario_id === updatedUser.usuario_id ? updatedUser : u)))
    setEditDialogOpen(false)
    setSelectedUser(null)
  }

  const handleToggleStatus = () => {
    if (selectedUser) {
      setUsers(
        users.map((u) =>
          u.usuario_id === selectedUser.usuario_id
            ? { ...u, estado_id: u.estado_id === 1 ? 2 : 1 }
            : u
        )
      )
      setStatusDialogOpen(false)
      setSelectedUser(null)
    }
  }

  const openEditDialog = (user: User) => {
    setSelectedUser(user)
    setEditDialogOpen(true)
  }

  const openStatusDialog = (user: User) => {
    setSelectedUser(user)
    setStatusDialogOpen(true)
  }

  return (
    <main className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <HeaderUsuarios onCreateClick={() => setCreateDialogOpen(true)} />

        <FiltroUsuarios
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          roleFilter={roleFilter}
          onRoleChange={setRoleFilter}
        />

        <TablaUsuarios
          users={filteredUsers}
          onEdit={openEditDialog}
          onToggleStatus={openStatusDialog}
        />

        <ModalCreacionUsuario
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onSubmit={handleCreateUser}
        />

        <ModalEdicionUsuarios
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          user={selectedUser}
          onSubmit={handleEditUser}
        />

        <ModalEstadoUsuarios
          open={statusDialogOpen}
          onOpenChange={setStatusDialogOpen}
          user={selectedUser}
          onConfirm={handleToggleStatus}
        />
      </div>
    </main>
  )
}