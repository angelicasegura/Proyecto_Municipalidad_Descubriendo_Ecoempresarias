using Abstracciones.Modelos.Eventos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.DA.Eventos
{
    public interface IStandDA
    {
        public Task<int> AgregarStand(StandRequest stand);
        public Task<int> ActualizarStand(int id, StandRequest stand);
        public Task<int> CambiarEstadoStand(int stand_id, int estado_id);
        public Task<IEnumerable<StandResponse>> ObtenerStandPorMapa(int mapa_id);
        public Task<StandResponse> ObtenerStandPorId(int stand_id);

    }
}
