import { useEffect, useState } from "react";
import { format, isToday } from "date-fns";
import { es } from "date-fns/locale";
import { type Pedido } from "../../../../types/misPedidosType";
import { handleObtenerPedidosPendientes } from "./Actions/handleObtenerPedidos";
import CardPedidoPendiente from "./components/cardPedido";
import ModalFacturaPendiente from "./components/modalFactura";
import FiltroPedidosPendientes from "./components/filtroPedido";
import SeccionFechaPendientes from "./components/seccionFecha";
import { Loader2 } from "lucide-react";
import { Pagination } from "../../../../components/ui/layout/Pagination";
import { CardFooter } from "../../../../components/ui/card";

import { Package, History } from "lucide-react";
import { Link } from "react-router-dom";

function groupByDate(pedidos: Pedido[]): Record<string, Pedido[]> {
  const groups: Record<string, Pedido[]> = {};
  for (const p of pedidos) {
    const key = format(new Date(p.fechaPedido), "yyyy-MM-dd");
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  }
  return groups;
}

function formatDateLabel(dateKey: string): string {
  const date = new Date(dateKey + "T00:00:00");
  if (isToday(date)) return "Hoy";
  return format(date, "d 'de' MMMM, yyyy", { locale: es });
}

const MisPedidosPage = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [estadoFiltro, setEstadoFiltro] = useState("all");
  const [fechaFiltro, setFechaFiltro] = useState<Date | undefined>();
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const registrosPorPagina = 10;

  // ---------- CARGA DE PEDIDOS ----------
  useEffect(() => {
    setLoading(true);
    const estadoId = estadoFiltro !== "all" ? Number(estadoFiltro) : undefined;
    const fecha = fechaFiltro ? format(fechaFiltro, "yyyy-MM-dd") : undefined;

    const controller = new AbortController();
    handleObtenerPedidosPendientes(
      estadoId,
      fecha,
      page,
      registrosPorPagina
    )
      .then((res) => {
        setPedidos(res.items);
        setTotalCount(res.totalCount);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener pedidos:", err);
        setLoading(false);
      });

    return () => controller.abort();
  }, [estadoFiltro, fechaFiltro, page]);

  const grouped = groupByDate(pedidos);
  const sortedKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  const totalPages = Math.ceil(totalCount / registrosPorPagina);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 space-y-5">
        <nav className="border-b bg-card">
      <div className="mx-auto flex h-14 max-w-3xl items-center gap-6 px-4">
        <span className="text-lg font-bold tracking-tight">🛒 Pedidos</span>
        <div className="flex gap-1">
          <Link
            to="/pedidos/mis-pedidos"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            
          >
            <Package className="h-4 w-4" />
            Mis Pedidos
          </Link>
          
        </div>
      </div>
    </nav>
      <div>
        <h1 className="text-2xl font-bold">Mis Pedidos</h1>
        <p className="text-sm text-muted-foreground">Pedidos pendientes y en proceso</p>
      </div>

      {/* FILTROS */}
      <FiltroPedidosPendientes
        estadoFiltro={estadoFiltro}
        onEstadoChange={(e) => {
          setEstadoFiltro(e);
          setPage(1); // resetear página al cambiar filtro
        }}
        fechaFiltro={fechaFiltro}
        onFechaChange={(d) => {
          setFechaFiltro(d);
          setPage(1); // resetear página al cambiar fecha
        }}
      />

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : pedidos.length === 0 ? (
        <p className="text-center py-16 text-muted-foreground">No se encontraron pedidos.</p>
      ) : (
        <>
          {/* SECCIONES POR FECHA */}
          {sortedKeys.map((dateKey) => (
            <div key={dateKey}>
              <SeccionFechaPendientes label={formatDateLabel(dateKey)} />
              <div className="space-y-3">
                {grouped[dateKey].map((pedido) => (
                  <CardPedidoPendiente
                    key={pedido.pedido_id}
                    pedido={pedido}
                    onVerDetalles={setSelectedPedido}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* PAGINACION */}
          <CardFooter className="bg-muted/30 border-t py-3 flex justify-between items-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </CardFooter>
        </>
      )}

      {/* MODAL FACTURA */}
      <ModalFacturaPendiente
        pedido={selectedPedido}
        open={!!selectedPedido}
        onOpenChange={(open) => !open && setSelectedPedido(null)}
      />
    </div>
  );
};

export default MisPedidosPage;