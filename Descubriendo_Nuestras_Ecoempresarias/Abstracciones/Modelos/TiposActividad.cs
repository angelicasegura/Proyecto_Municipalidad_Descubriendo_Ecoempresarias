using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    public class TiposActividad
    {
        public class TipoActividadBase
        {
            public string Nombre { get; set; }
            public string Descripcion { get; set; }
        }

        public class TipoActividadRequest : TipoActividadBase
        {
            
            public int? TipoActividadId { get; set; }
            public int EstadoId { get; set; }
        }

        public class TipoActividadResponse : TipoActividadBase
        {
            
            public int TipoActividadId { get; set; }
            public int EstadoId { get; set; }
        }
    }
}
