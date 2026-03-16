using Abstracciones.Modelos;
using Abstracciones.Modelos.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.DA
{

        public interface IPedidoDA
        {
        Task<Guid> AgregarPedido(int usuarioId, PedidoRequest pedido);
        Task<PagedResult<PedidoResponse>> ObtenerPedidosAsync(int usuarioId, int? estadoId, int pagina, int registrosPorPagina);
        }
    }
