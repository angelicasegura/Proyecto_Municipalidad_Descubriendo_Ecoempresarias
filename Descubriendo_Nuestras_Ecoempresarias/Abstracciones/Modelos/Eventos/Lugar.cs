using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos.Eventos
{
    public class LugarBase
    {
        public string Nombre { get; set; }
        public string Provincia { get; set; }
        public string Canton { get; set; }
        public string Distrito { get; set; }
        public string Detalles { get; set; }
    }

    public class LugarRequest : LugarBase
    {
        public int Estado_id { get; set; }
    }

    public class LugarResponse : LugarBase
    {
        public int Lugar_id { get; set; }
        public string NombreEstado { get; set; }
    }
}
