using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    public class Pedido
    {
        public Guid PedidoId { get; set; }
        public int FacturaId { get; set; }
        public int UsuarioId { get; set; }
        public int EmprendimientoId { get; set; }
        public DateTime FechaPedido { get; set; }
        public int Estado_id { get; set; }
    }

    public class PedidoRequest
    {
        public int EmprendimientoId { get; set; }
    }

    public class PedidoResponse
    {
        public Guid Pedido_id { get; set; }
        public DateTime FechaPedido { get; set; }
        public int Estado_id { get; set; }
        public int Factura_id { get; set; }
        public Factura Factura { get; set; } = new();
    }

    public class ConfirmarPedidoResponse
    {
        public int Pedido_id { get; set; }
        public int Factura_id { get; set; }
        public decimal Total { get; set; }
    }
}