using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos.Eventos.Logica
{
    public class EventoZonaStandBase
    {
        public int Stand_id { get; set; }
        public int Evento_id { get; set; }
        public int Zona_id { get; set; }
        public int Estado_id { get; set; }
        public int? Emprendimiento_id { get; set; }
    }

    public class EventoZonaStandResponse: EventoZonaStandBase
    {
        public string NombreEvento { get; set; }
        public string NombreZona { get; set; }
        public string Codigo { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Ancho { get; set; }
        public int Alto { get; set; }
        public int Rotacion { get; set; }
        public string? NombreEmprendimiento { get; set; }
        public string Estado { get; set; }

    }
}
