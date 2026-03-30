using Abstracciones.Interfaces.DA.Eventos;
using Abstracciones.Interfaces.Flujo.Eventos;
using Abstracciones.Modelos.Eventos;
using DA.Eventos;
using System.Collections;


namespace Flujo.Eventos
{
    public class StandFlujo : IStandFlujo
    {
        private readonly IStandDA _standDA;

        public StandFlujo(IStandDA standDA)
        {
            _standDA = standDA;
        }

        public async Task<int> ActualizarStand(int id, StandRequest stand)
        {
            return await _standDA.ActualizarStand(id, stand);
        }

        public async Task<int> AgregarStand(StandRequest stand)
        {
            return await _standDA.AgregarStand(stand);
        }

        public async Task<int> CambiarEstadoStand(int stand_id, int estado_id)
        {
            return await _standDA.CambiarEstadoStand(stand_id, estado_id);

        }
        public async Task<StandResponse> ObtenerStandPorId(int stand_id)
        {
            return await _standDA.ObtenerStandPorId(stand_id);
        }

        public async Task<IEnumerable<StandResponse>> ObtenerStandPorMapa(int mapa_id)
        {
            return await _standDA.ObtenerStandPorMapa(mapa_id);
        }
    }
}
