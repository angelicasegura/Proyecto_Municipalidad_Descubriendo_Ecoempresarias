using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos.Eventos
{
    public class ReservaEventoBase
    {
        public int Evento_id { get; set; }
        public int Emprendimiento_id { get; set; }
        public int Estado_id { get; set; }
    }

    public class ReservaEventoRequest : ReservaEventoBase
    {
        

        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Cedula { get; set; }

        public string NombreEmprendimiento { get; set; }
        public string Productos { get; set; }
        public string Correo { get; set; }
        public string NombreEvento { get; set; }
    }
    public class ReservaEventoResponse : ReservaEventoBase
    {
        public string Nombre { get; set; }
        public int Reserva_id { get; set; }
        public string NombreEmprendimiento { get; set; }
        public string NombreEvento { get; set; }
        public string Estado { get; set; }
        public string Correo { get; set; }
    }

    public class solicitudReservaEvento : ReservaEventoBase
    {
        public int numero { get; set; }
        public string Evento { get; set; }
        public string Nombre { get; set; }
        public string Emprendimiento { get; set; }

        public string Estado { get; set; }
    }
}
