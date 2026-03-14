using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
        public class Pedido
        {
            public int PedidoId { get; set; }

            public int UsuarioId { get; set; }

            public int EmprendimientoId { get; set; }

            public DateTime FechaPedido { get; set; }

            public string EstadoPedido { get; set; } = string.Empty;

            public string DireccionEntrega { get; set; } = string.Empty;

            public string? Observaciones { get; set; }

            public decimal Total { get; set; }

            public List<DetallePedido> Detalles { get; set; } = new();
        }
    }