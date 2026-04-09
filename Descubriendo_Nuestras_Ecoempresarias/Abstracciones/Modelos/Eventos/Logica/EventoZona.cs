using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos.Eventos.Logica
{
    public class EventoZonaBase
    {
        public int Evento_id { get; set; }
        public int Zona_id { get; set; }
        public int Estado_id { get; set; }
        public int Piso_id { get; set; }
    }

    public class EventoZonaResponse : EventoZonaBase
    {
        public string NombreEvento { get; set; }
        public DateTime Fecha_inicio { get; set; }
        public string NombreZona { get; set; }
        public string Nombre_piso { get; set; }
        public int Numero_piso { get; set; }
        public int Mapa_id { get; set; }
        public string NombreMapa { get; set; }
        public string Estado { get; set; }
    }
}
