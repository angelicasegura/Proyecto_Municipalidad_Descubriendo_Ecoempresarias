using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos.Eventos.Logica
{
    public class EventoPisoBase
    {
        public int Evento_id { get; set; }
        public int Piso_id { get; set; }
        public int Estado_id { get; set; }

    }

    public class EventoPisoResponse: EventoPisoBase
    {
        public string NombreEvento { get; set; }
        public DateTime Fecha_inicio { get; set; }
        public string Nombre_piso { get; set; }
        public int Numero_piso { get; set; }
        public string NombreLugar { get; set; }
        public string Estado { get; set; }
    }
}
