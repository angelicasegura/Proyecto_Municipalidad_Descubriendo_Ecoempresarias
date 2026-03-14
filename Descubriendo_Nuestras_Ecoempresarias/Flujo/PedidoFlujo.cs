using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class PedidoFlujo : IPedidoFlujo
    {
        private readonly IPedidoDA _pedidoDA;

        public PedidoFlujo(IPedidoDA pedidoDA)
        {
            _pedidoDA = pedidoDA;
        }

        public Task<Pedido> AgregarPedido(int usuarioId, Pedido pedido)
        {
            return _pedidoDA.AgregarPedido(usuarioId, pedido);
        }
    }
}
