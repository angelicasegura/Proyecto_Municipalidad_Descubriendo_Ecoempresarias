using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.Flujo
{
    public interface IPedidoFlujo
    {
        Task<Pedido> AgregarPedido(int usuarioId, Pedido pedido);
    }
}
