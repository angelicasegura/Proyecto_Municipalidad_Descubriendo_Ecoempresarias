using Abstracciones.Modelos;
using Abstracciones.Modelos.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Abstracciones.Modelos.Emprendimiento;

namespace Abstracciones.Interfaces.Flujo
{
    public interface IPedidoFlujo
    {
        Task<Guid> AgregarPedido(int usuarioId, PedidoRequest pedido);
        Task<PagedResult<PedidoResponse>> ObtenerPedidosAsync(int usuarioId, int? estadoId, int pagina, DateTime? fecha, int registrosPorPagina);

        Task<Guid> ActualizarEstadoPedido(Guid pedidoId, int EstadoID);
        Task<Guid> InactivarPedido(Guid pedidoId, String descripcion);

        Task<EmprendimientoResponse> obtenerEmprendimientoPedido(Guid pedidoId);

        Task<PedidoResponse> obtenerPedido(Guid pedidoId);

        Task<PagedResult<PedidoResponse>> ObtenerPedidosPorEmprendimiento(int emprendimientoId, int? estadoId, int pagina, DateTime? fecha, int registrosPorPagina);
    }
}
