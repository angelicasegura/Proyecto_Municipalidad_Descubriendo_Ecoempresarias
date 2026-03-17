using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos.Eventos
{
    public class StandBase
    {
        public string Codigo { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Ancho { get; set; }
        public int Alto { get; set; }
        public int Rotacion { get; set; }

    }

    public class StandRequest : StandBase
    {
        public int Mapa_id { get; set; }
        public int Estado_id { get; set; }
    }
    public class StandResponse : StandBase
    {
        public int Estado_id { get; set; }
        public int Stand_id { get; set; }
        public string NombreEstado { get; set; }
    }
}
