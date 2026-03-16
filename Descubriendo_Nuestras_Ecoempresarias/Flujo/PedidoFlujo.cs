using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        public async Task<Guid> AgregarPedido(int usuarioId, PedidoRequest pedido)
        {
            return await _pedidoDA.AgregarPedido(usuarioId, pedido);
        }

        public async Task<PagedResult<PedidoResponse>> ObtenerPedidosAsync(int usuarioId, int? estadoId, int pagina, int registrosPorPagina)
        {
            return await _pedidoDA.ObtenerPedidosAsync(usuarioId, estadoId, pagina, registrosPorPagina);
        }
    }
}
