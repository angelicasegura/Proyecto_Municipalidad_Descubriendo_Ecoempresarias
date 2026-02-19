using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    public class Inventario
    {
        public Guid ProductoId { get; set; }

        public decimal CantidadActual { get; set; }

        public decimal CantidadMinima { get; set; }

        public int EstadoId { get; set; }

       
    }
}
