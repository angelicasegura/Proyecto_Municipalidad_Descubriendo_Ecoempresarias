using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
        public class DetallePedido
        {
        public Guid ProductoId { get; set; }
        public int Cantidad { get; set; }
            public decimal PrecioUnitario { get; set; }
        }
    }
