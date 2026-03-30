using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos.Eventos
{
    public class MapaBase
    {
        public string Nombre { get; set; }
        public int Alto { get; set; }
        public int Ancho { get; set; }
        public decimal Escala { get; set; }

    }

    public class MapaRequest: MapaBase
    {
        public int Estado_id { get; set; }
        
    }

    public class MapaResponse : MapaBase
    {
        public string EstadoNombre { get; set; }
        public int Mapa_id { get; set; }
    }
}
