import { useEffect, useState } from "react";
import { FiltroUsuarios } from "./components/filtroUsuarios";
import { HeaderUsuarios } from "./components/headerUsuarios";
import { TablaUsuarios } from "./components/tablaUsuarios";
import { Pagination } from "../../../components/ui/layout/Pagination";
import { ModalCreacionUsuario } from "./components/modalCreacionUsuario";
import { ModalEdicionUsuario } from "./components/modalEdicionUsuarios";
import type { User } from "../../../types/userType";
import { ModalEstadoUsuarios } from "./components/modalEstadoUsuario";

import { openEditDialog } from "./Actions/handleEditDialog";
import { openStatusDialog } from "./Actions/handleStatusDialog";
import { handleCrearUser } from "./Actions/handleCrearUser";
import { handleEditarUser } from "./Actions/handleEditarUser";
import { handleToggleStatus } from "./Actions/handleConfirmarEstado";
import { CardFooter } from "../../../components/ui/card";

import { fetchUsuarios } from "./Actions/fetchUsuarios";





export default function AdminUsuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const limit = 10;


  


  // ---------- CARGA DE DATOS ----------
  const loadData = async (signal?: AbortSignal) => {
    try {
      const data = await fetchUsuarios({
        page,
        limit,
        searchTerm,
        roleFilter,
        signal
      });
      
      setUsers(data.items);
      setTotalUsers(data.totalCount);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error("Error al cargar usuarios:", err.message);
      }
    }
  };

  // 2. El useEffect ahora solo llama a loadData
  useEffect(() => {
    const controller = new AbortController();
    loadData(controller.signal);
    return () => controller.abort();
  }, [page, searchTerm, roleFilter, limit]);



  const totalPages = Math.ceil(totalUsers / limit);
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
    onSuccess: () => loadData(),
  });

  const onToggleStatus = handleToggleStatus({
    setStatusDialogOpen,
    setSelectedUser,
    onSuccess: () => loadData(),
  });

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleRoleChange = (role: string) => {
    setRoleFilter(role);
    setPage(1);
  };
  return (
    <main className=" bg-muted/30 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <HeaderUsuarios onCreateClick={() => setCreateDialogOpen(true)} />

        <FiltroUsuarios
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          roleFilter={roleFilter}
          onRoleChange={handleRoleChange}
        />

        <TablaUsuarios
          users={users}
          onEdit={onOpenEditDialog}
          onToggleStatus={onOpenStatusDialog}
        />

        <CardFooter className="bg-muted/30 border-t py-3 flex justify-between items-center">
          
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </CardFooter>

        {/* MODALS */}
        <ModalCreacionUsuario
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onSubmit={onCreateUser}
        />

        <ModalEdicionUsuario
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          userToEdit={selectedUser}
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
