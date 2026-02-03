import { useEffect, useState } from "react";
import { authFetch } from "../../../auth/AuthFetch";
import { FiltroUsuarios } from "./components/filtroUsuarios";
import { HeaderUsuarios } from "./components/headerUsuarios";
import { TablaUsuarios } from "./components/tablaUsuarios";
import { Pagination } from "../../../components/ui/layout/Paginacion";
import { ModalCreacionUsuario } from "./components/modalCreacionUsuario";
import { ModalEdicionUsuarios } from "./components/modalEdicionUsuarios";
import type { User } from "../../../types/userType";
import { ModalEstadoUsuarios } from "./components/modalEstadoUsuario";

import { openEditDialog } from "./Actions/handleEditDialog";
import { openStatusDialog } from "./Actions/handleStatusDialog";
import { handleCrearUser } from "./Actions/handleCrearUser";
import { handleEditarUser } from "./Actions/handleEditarUser";
import { handleToggleStatus } from "./Actions/handleConfirmarEstado";

/*  //Todo Lista cosas por hacer 
-Agregacion con api pero falta para ello

*/

export default function AdminUsuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const limit = 10;

  // ---------- CARGA DE DATOS ----------
  useEffect(() => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search: searchTerm,
      role: roleFilter,
    });

    authFetch(`http://localhost:5000/usuarios?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setTotalPages(data.pagination.totalPages);
      });
  }, [page]);

  // ---------- ACCIONES ----------
  const onOpenEditDialog = openEditDialog({
    setSelectedUser,
    setEditDialogOpen,
  });

  const onOpenStatusDialog = openStatusDialog({
    setSelectedUser,
    setStatusDialogOpen,
  });

  const onCreateUser = handleCrearUser({
    setCreateDialogOpen,
    setPage,
  });

  const onEditUser = handleEditarUser({
    setEditDialogOpen,
    setSelectedUser,
  });

  const onToggleStatus = handleToggleStatus({
    setStatusDialogOpen,
    setSelectedUser,
  });

  return (
    <main className=" bg-muted/30 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <HeaderUsuarios onCreateClick={() => setCreateDialogOpen(true)} />

        <FiltroUsuarios
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          roleFilter={roleFilter}
          onRoleChange={setRoleFilter}
        />

        <TablaUsuarios
          users={users}
          onEdit={onOpenEditDialog}
          onToggleStatus={onOpenStatusDialog}
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

        {/* MODALS */}
        <ModalCreacionUsuario
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onSubmit={onCreateUser}
        />

        <ModalEdicionUsuarios
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          user={selectedUser}
          onSubmit={onEditUser}
        />

        <ModalEstadoUsuarios
          open={statusDialogOpen}
          onOpenChange={setStatusDialogOpen}
          user={selectedUser}
          onConfirm={onToggleStatus}
        />
      </div>
    </main>
  );
}
