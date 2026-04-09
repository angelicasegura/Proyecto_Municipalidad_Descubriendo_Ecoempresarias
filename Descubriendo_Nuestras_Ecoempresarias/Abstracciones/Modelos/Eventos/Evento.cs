using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos.Eventos
{
    public class EventoBase
    {
        public string NombreEvento { get; set; }
        public string Descripcion { get; set; }
        public DateTime Fecha_inicio { get; set; }
        public DateTime Fecha_Final { get; set; }
        public TimeSpan Horario { get; set; }
        public int Cupos { get; set; }
        public int Cupos_actuales { get; set; }


    }
    public class EventoRequest : EventoBase
    {
        public int Estado_id { get; set; }
        public int Lugar_id { get; set; }

    }

    public class EventoResponse : EventoBase
    {
        public int Evento_id { get; set; }
        public string Lugar_id { get; set; }
        
        public string NombreEstado { get; set; }

        public string NombreLugar { get; set; }



    }
}
