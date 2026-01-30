import { handleCrearEmprendedor } from "./Actions/handleCrearEmprendedor";
import { handleEditarEmprendedor } from "./Actions/handleEditarEmprendedor";
import { handleEditar } from "./Actions/handleEditar";
import { handleToggleEstadoClick } from "./Actions/handleEstado";
import { handleToggleEstado } from "./Actions/handleConfirmarEstado";

import { EmprendedoresHeader } from "./components/emprendedorHeader";
import { EmprendedoresTable } from "./components/tablaEmprendedores";
import { ModalCrearEmprendimiento } from "../Emprendimientos/components/modalCrearEmprendimeinto";
import { EditarEmprendedor } from "../Emprendimientos/components/modalEditarEmprendimiento";
import { ConfirmStatusDialog } from "../Emprendimientos/components/modalDeConfirmacionDeEstado";
import { EmprendedoresFilters } from "../Emprendimientos/components/filtrosEmprendedor";
import type { Emprendedor } from "../../../types/emprendedoresType";
import { useEffect, useState } from "react";
import { Pagination } from "../../../components/ui/layout/Paginacion";
import { authFetch } from "../../../auth/AuthFetch";

export default function AdminEmprendedores() {
  const [emprendedores, setEmprendedores] = useState<Emprendedor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFilter, setTipoFilter] = useState("all");
  const [estadoFilter, setEstadoFilter] = useState("all");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);


    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    const limit = 10


    // ---------- CARGA DE DATOS ----------
      useEffect(() => {
        
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          search: searchTerm,
          tipo: tipoFilter,
          estado: estadoFilter,
        })
        
    
        authFetch(`http://localhost:5000/emprendedores?${params.toString()}`)
          .then(res => res.json())
          .then(data => {
            setEmprendedores(data.data)
            setTotalPages(data.pagination.totalPages)
          })
      }, [page])



  //Filtros
  const filteredEmprendedores = emprendedores.filter((emprendedor) => {
    const matchesSearch =
      emprendedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emprendedor.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emprendedor.cedula_juridica.includes(searchTerm);
    const matchesTipo =
      tipoFilter === "all" ||
      emprendedor.tipo_actividad_id === Number(tipoFilter);
    const matchesEstado =
      estadoFilter === "all" || emprendedor.estado_id === Number(estadoFilter);
    return matchesSearch && matchesTipo && matchesEstado;
  });

  //handles
  const [selectedEmprendedor, setSelectedEmprendedor] =
    useState<Emprendedor | null>(null);

  const onCreateEmprendedor = handleCrearEmprendedor({
    setCreateDialogOpen,
  });

  const onEditEmprendedor = handleEditarEmprendedor({
    setEditDialogOpen,
    setSelectedEmprendedor,
  });

  const onToggleStatus = handleToggleEstado({
    selectedEmprendedor,
    setStatusDialogOpen,
    setSelectedEmprendedor,
  });

  const onEdit = handleEditar({
    setSelectedEmprendedor,
    setEditDialogOpen,
  });

  const onToggleStatusClick = handleToggleEstadoClick({
    setSelectedEmprendedor,
    setStatusDialogOpen,
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <EmprendedoresHeader onCreateClick={() => setCreateDialogOpen(true)} />

      <EmprendedoresFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        tipoFilter={tipoFilter}
        onTipoChange={setTipoFilter}
        estadoFilter={estadoFilter}
        onEstadoChange={setEstadoFilter}
        onSearch={() => {}}
      />

      <EmprendedoresTable
        emprendedores={filteredEmprendedores}
        onEdit={onEdit}
        onToggleStatus={onToggleStatusClick}
      />
      <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />

    {/* Modals */}
      <ModalCrearEmprendimiento
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={onCreateEmprendedor}
      />

      <EditarEmprendedor
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        emprendedor={selectedEmprendedor}
        onSubmit={onEditEmprendedor}
      />

      <ConfirmStatusDialog
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        emprendedor={selectedEmprendedor}
        onConfirm={onToggleStatus}
      />
    </div>
  );
}
