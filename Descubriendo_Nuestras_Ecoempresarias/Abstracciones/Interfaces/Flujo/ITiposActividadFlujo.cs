using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Abstracciones.Modelos.TiposActividad;

namespace Abstracciones.Interfaces.Flujo
{
    public interface ITiposActividadFlujo
    {
        Task<IEnumerable<TipoActividadResponse>> ObtenerTiposActividad();

    }
}
