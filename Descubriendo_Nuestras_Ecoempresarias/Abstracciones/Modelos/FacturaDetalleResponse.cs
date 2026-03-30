using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    public class FacturaDetalleResponse
    {
        public int Factura_id { get; set; }
        public Guid Producto_id { get; set; }

        public string NombreProducto { get; set; } = string.Empty;

        public decimal Cantidad { get; set; }

        public decimal PrecioUnitario { get; set; }

        public decimal Subtotal { get; set; }
    }
}
