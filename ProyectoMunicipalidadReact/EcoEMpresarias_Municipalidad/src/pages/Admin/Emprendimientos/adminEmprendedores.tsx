import { handleCrearEmprendedor } from "./Actions/handleCrearEmprendedor";
import { handleEditar } from "./Actions/handleEditar";
import { handleToggleEstadoClick } from "./Actions/handleEstado";

import { EmprendedoresHeader } from "./components/emprendedorHeader";
import { EmprendedoresTable } from "./components/tablaEmprendedores";
import { ModalCrearEmprendimiento } from "../Emprendimientos/components/modalCrearEmprendimeinto";
import { EditarEmprendedor } from "../Emprendimientos/components/modalEditarEmprendimiento";
import { ConfirmStatusDialog } from "../Emprendimientos/components/modalDeConfirmacionDeEstado";
import { EmprendedoresFilters } from "../Emprendimientos/components/filtrosEmprendedor";
import type { Emprendedor } from "../../../types/emprendedoresType";
import { useEffect, useState } from "react";
import { Pagination } from "../../../components/ui/layout/Pagination";
import { authFetch } from "../../../auth/AuthFetch";

import type { TipoActividad } from "../../../types/emprendedoresType";
import { fetchTiposActividad } from "../../../types/emprendedoresType";

import {toggleEstadoEmprendimiento } from "../../../types/emprendedoresType";
import toast from "react-hot-toast"


export default function AdminEmprendedores() {
  const [emprendedores, setEmprendedores] = useState<Emprendedor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFilter, setTipoFilter] = useState<"all" | string>("all");
  const [estadoFilter, setEstadoFilter] = useState("all");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [tiposActividad, setTiposActividad] = useState<TipoActividad[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchEmprendedores = async () => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search: searchTerm || "",
      tipoActividadId: tipoFilter === "all" || !tipoFilter ? "" : String(tipoFilter),
      estadoId: estadoFilter === "all" || !estadoFilter ? "" : String(estadoFilter),
    });

    const res = await authFetch(
      `https://localhost:7050/api/emprendimientos/paginados?${params.toString()}`,
    );
    const data = await res.json();

    setEmprendedores(data.items || []);
    setTotalPages(Math.ceil((data.totalCount || 0) / limit));
  };




  useEffect(() => {
    fetchTiposActividad().then((data) => setTiposActividad(data));
  }, []);

  // ---------- 2. CARGA DE DATOS PAGINADOS ----------
  useEffect(() => {
    fetchEmprendedores();
  }, [page, searchTerm, tipoFilter, estadoFilter]);

  //handles
  const [selectedEmprendedor, setSelectedEmprendedor] =
    useState<Emprendedor | null>(null);

  const onCreateEmprendedor = handleCrearEmprendedor({
    setCreateDialogOpen,
    refreshData: fetchEmprendedores,
  });

  const onEditConfirmado = async () => {
    await fetchEmprendedores()  // refresca la tabla
  }

  const onToggleStatus = async () => {
    if (!selectedEmprendedor) return
    try {
      await toggleEstadoEmprendimiento(selectedEmprendedor.emprendimientoId)
      const accion = selectedEmprendedor.estadoId === 1 ? "inactivado" : "activado"
      toast.success(`Emprendimiento ${accion} correctamente`)
      await fetchEmprendedores()
    } catch (err) {
      toast.error("Error al cambiar el estado")
      console.error(err)
    }
  }

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
        onSearchChange={(val) => {
          setSearchTerm(val);
          setPage(1);
        }}
        tipoFilter={tipoFilter}
        onTipoChange={(val) => {
          setTipoFilter(val);
          setPage(1);
        }}
        estadoFilter={estadoFilter}
        onEstadoChange={(val) => {
          setEstadoFilter(val);
          setPage(1);
        }}
        onSearch={() => { }}
        tiposActividad={tiposActividad}
      />

      <EmprendedoresTable
        emprendedores={emprendedores}
        tiposActividad={tiposActividad}
        onEdit={onEdit}
        onToggleStatus={onToggleStatusClick}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* Modals */}
      <ModalCrearEmprendimiento
        open={createDialogOpen}
        onSubmit={onCreateEmprendedor}
        tiposActividad={tiposActividad}
        onOpenChange={setCreateDialogOpen}
      />

      <EditarEmprendedor
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        emprendedor={selectedEmprendedor}
        tiposActividad={tiposActividad}
        onSubmit={onEditConfirmado}  // 👈 ahora solo refresca
      />

      <ConfirmStatusDialog
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        emprendedor={selectedEmprendedor}
        onConfirm={onToggleStatus}  // 👈 ahora es async
      />
    </div>
  );
}
