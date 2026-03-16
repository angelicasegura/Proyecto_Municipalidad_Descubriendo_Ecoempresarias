using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    public class Factura
    {
        public int Factura_id { get; set; }

        public DateTime Fecha { get; set; }

        public decimal Subtotal { get; set; }

        public decimal IVA { get; set; }

        public decimal Total { get; set; }

        public int UsuarioId { get; set; }

        public int EmprendimientoId { get; set; }

        public int EstadoId { get; set; }

        public List<FacturaDetalleResponse> Detalles { get; set; } = new();
    }
}
