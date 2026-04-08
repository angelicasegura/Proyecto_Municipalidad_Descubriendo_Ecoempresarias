using System;
using System.Threading.Tasks;
using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Abstracciones.Modelos.Pagination;

namespace Flujo
{
    public class PedidoFlujo : IPedidoFlujo
    {
        private readonly IPedidoDA _pedidoDA;

        public PedidoFlujo(IPedidoDA pedidoDA)
        {
            _pedidoDA = pedidoDA;
        }

        public async Task<ConfirmarPedidoResponse> ConfirmarPedido(int usuarioId, PedidoRequest pedido)
        {
            return await _pedidoDA.ConfirmarPedido(usuarioId, pedido);
        }

        public async Task<Guid> ActualizarEstadoPedido(Guid pedidoId, int EstadoID)
        {
            return await _pedidoDA.ActualizarEstadoPedido(pedidoId, EstadoID);
        }

        public async Task<Guid> InactivarPedido(Guid pedidoId, string descripcion)
        {
            return await _pedidoDA.InactivarPedido(pedidoId, descripcion);
        }

        public async Task<Emprendimiento.EmprendimientoResponse> obtenerEmprendimientoPedido(Guid pedidoId)
        {
            return await _pedidoDA.obtenerEmprendimientoPedido(pedidoId);
        }

        public async Task<PedidoResponse> obtenerPedido(Guid pedidoId)
        {
            return await _pedidoDA.obtenerPedido(pedidoId);
        }

        public async Task<PagedResult<PedidoResponse>> ObtenerPedidosAsync(int usuarioId, int? estadoId, int pagina, DateTime? fecha, int registrosPorPagina)
        {
            return await _pedidoDA.ObtenerPedidosAsync(usuarioId, estadoId, pagina, fecha, registrosPorPagina);
        }

        public async Task<PagedResult<PedidoResponse>> ObtenerPedidosPorEmprendimiento(int emprendimientoId, int? estadoId, int pagina, DateTime? fecha, int registrosPorPagina)
        {
            return await _pedidoDA.ObtenerPedidosPorEmprendimiento(emprendimientoId, estadoId, pagina, fecha, registrosPorPagina);
        }
    }
}