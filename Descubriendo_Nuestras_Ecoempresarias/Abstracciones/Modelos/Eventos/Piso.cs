using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos.Eventos
{
    public class PisoBase
    {
        public string Nombre_Piso { get; set; }
        public int Numero_Piso { get; set; }

    }
    public class PisoRequest : PisoBase
    {
        
        public int Lugar_id { get; set; }
        public int Estado_id { get; set; }
    }

    public class PisoResponse : PisoBase
    {
        public int Piso_id { get; set; } 
        public string NombreLugar { get; set; }
        public string NombreEstado { get; set; }
    }
}
