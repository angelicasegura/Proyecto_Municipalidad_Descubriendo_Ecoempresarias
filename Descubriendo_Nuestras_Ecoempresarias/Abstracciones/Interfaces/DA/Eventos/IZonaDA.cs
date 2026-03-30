using Abstracciones.Modelos.Eventos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.DA.Eventos
{
    public interface IZonaDA
    {
        public Task<int> AgregarZona(ZonaRequest zona);
        public Task<int> EditarZona(int id, ZonaRequest zona);
        public Task<int> CambiarEstadoZona(int zona_id, int estado_id);
        public Task<IEnumerable<ZonaResponse>> ObtenerZonasPorPiso(int piso_id);
        public Task<ZonaResponse> ObtenerZonaPorId(int zona_id);
    }
}
