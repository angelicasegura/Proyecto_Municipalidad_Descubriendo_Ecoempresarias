using Abstracciones.Modelos.Eventos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.DA.Eventos
{
    public interface IMapaDA
    {
        public Task<int> AgregarMapa(MapaRequest mapa);
        public Task<int> EditarMapa(int id, MapaRequest mapa);
        public Task<int> CambiarEstadoMapa(int mapa_id, int estado_id);
        public Task<IEnumerable<MapaResponse>> ObtenerMapas();
        public Task<MapaResponse> ObtenerMapaPorId(int mapa_id);

    }
}
