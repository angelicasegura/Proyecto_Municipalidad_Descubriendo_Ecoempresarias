using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flujo
{
    public class TiposActividadFlujo : ITiposActividadFlujo
    {
        private ITiposActividadDA tiposActividadDA;
        public TiposActividadFlujo(ITiposActividadDA _tiposActividadDA)
        {
            tiposActividadDA = _tiposActividadDA;
        }
        public async Task<IEnumerable<TiposActividad.TipoActividadResponse>> ObtenerTiposActividad()
        {
            return await tiposActividadDA.ObtenerTiposActividad();
        }
    }
}
