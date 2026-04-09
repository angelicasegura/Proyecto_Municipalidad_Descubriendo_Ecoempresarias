using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos.Eventos
{
    public class ZonaBase
    {
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int? Mapa_id { get; set; }
    }
    public class ZonaRequest : ZonaBase
    {
        public int Piso_id { get; set; }
        public int Estado_id { get; set; }
    }

    public class ZonaResponse : ZonaBase
    {
        public string NombrePiso { get; set; }
        public string? NombreMapa { get; set; }
        public string EstadoNombre { get; set; }
        public int Piso_id { get; set; }
        public int Zona_id { get; set; } 
    }
}
