using Abstracciones.Modelos.Eventos.Logica;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.Flujo.Eventos.logica
{
    public interface IEventoPisoFlujo
    {
        public Task<int> AgregarPisoAEvento(EventoPisoBase piso);
        public Task<int> CambiarDisponibilidadPiso(int estado_id, EventoPisoBase piso);
        public Task<IEnumerable<EventoPisoResponse>> ObtenerPisoEvento(int evento_id);
        public Task<IEnumerable<EventoPisoResponse>> ObtenerPisoEventoYEstado(int estadoid, int evento_id);

    }
}
