using Abstracciones.Interfaces.DA.Eventos.logica;
using Abstracciones.Interfaces.Flujo.Eventos.logica;
using Abstracciones.Modelos.Eventos.Logica;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flujo.Eventos.Logica
{
    public class EventoPisoFlujo : IEventoPisoFlujo
    {
        private readonly IPisoEventoDA _pisoEventoDA;

        public EventoPisoFlujo(IPisoEventoDA pisoEventoDA)
        {
            _pisoEventoDA = pisoEventoDA;
        }

        public async Task<int> AgregarPisoAEvento(EventoPisoBase piso)
        {
            return await _pisoEventoDA.AgregarPisoAEvento(piso);
        }

        public async Task<int> CambiarDisponibilidadPiso(int estado_id, EventoPisoBase piso)
        {
            return await _pisoEventoDA.CambiarDisponibilidadPiso(estado_id, piso);
        }

        public async Task<IEnumerable<EventoPisoResponse>> ObtenerPisoEvento(int evento_id)
        {
            return await _pisoEventoDA.ObtenerPisoEvento(evento_id);
        }

        public async Task<IEnumerable<EventoPisoResponse>> ObtenerPisoEventoYEstado(int estadoid, int evento_id)
        {
            return await _pisoEventoDA.ObtenerPisoEventoYEstado(estadoid, evento_id);
        }
    }
}
