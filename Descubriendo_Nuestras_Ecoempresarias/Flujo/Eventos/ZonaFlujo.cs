using Abstracciones.Interfaces.DA.Eventos;
using Abstracciones.Interfaces.Flujo.Eventos;
using Abstracciones.Modelos.Eventos;
using DA.Eventos;


namespace Flujo.Eventos
{
    public class ZonaFlujo : IZonaFlujo
    {
        private readonly IZonaDA _zonaDA;

        public ZonaFlujo(IZonaDA zonaDA)
        {
            _zonaDA = zonaDA;
        }

        public async Task<int> AgregarZona(ZonaRequest zona)
        {
            return await _zonaDA.AgregarZona(zona);
        }

        public async Task<int> CambiarEstadoZona(int zona_id, int estado_id)
        {
            return await _zonaDA.CambiarEstadoZona(zona_id, estado_id);
        }

        public async Task<int> EditarZona(int id, ZonaRequest zona)
        {
            return await _zonaDA.EditarZona(id, zona);
        }

        public async Task<ZonaResponse> ObtenerZonaPorId(int zona_id)
        {
            return await _zonaDA.ObtenerZonaPorId(zona_id);
        }

        public async Task<IEnumerable<ZonaResponse>> ObtenerZonasPorPiso(int piso_id)
        {
            return await _zonaDA.ObtenerZonasPorPiso(piso_id);
        }

        public async Task<IEnumerable<ZonaResponse>> ObtenerZonasPorPisoActivas(int piso_id)
        {
            return await _zonaDA.ObtenerZonasPorPisoActivas(piso_id);
        }
    }
}
