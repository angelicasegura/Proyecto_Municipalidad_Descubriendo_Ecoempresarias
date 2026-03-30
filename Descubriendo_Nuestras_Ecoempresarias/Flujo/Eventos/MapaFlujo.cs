using Abstracciones.Interfaces.DA.Eventos;
using Abstracciones.Interfaces.Flujo.Eventos;
using Abstracciones.Modelos.Eventos;
using DA.Eventos;


namespace Flujo.Eventos
{
    public class MapaFlujo : IMapaFlujo
    {
        private readonly IMapaDA _mapaDA;

        public MapaFlujo(IMapaDA mapaDA)
        {
            _mapaDA = mapaDA;
        }

        public async Task<int> AgregarMapa(MapaRequest mapa)
        {
            return await _mapaDA.AgregarMapa(mapa);
        }

        public async Task<int> CambiarEstadoMapa(int mapa_id, int estado_id)
        {
            return await _mapaDA.CambiarEstadoMapa(mapa_id, estado_id);
        }

        public async Task<int> EditarMapa(int id, MapaRequest mapa)
        {
            return await _mapaDA.EditarMapa(id, mapa);
        }

        public async Task<MapaResponse> ObtenerMapaPorId(int mapa_id)
        {
            return await _mapaDA.ObtenerMapaPorId(mapa_id);
        }

        public async Task<IEnumerable<MapaResponse>> ObtenerMapas()
        {
            return await _mapaDA.ObtenerMapas();
        }
    }
}
