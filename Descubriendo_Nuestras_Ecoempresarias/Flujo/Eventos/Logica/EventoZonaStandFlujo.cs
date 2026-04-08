using Abstracciones.Interfaces.DA.Eventos.logica;
using Abstracciones.Interfaces.Flujo.Eventos.logica;
using Abstracciones.Modelos.Eventos.Logica;


namespace Flujo.Eventos.Logica
{
    public class EventoZonaStandFlujo : IEventoZonaStandFlujo
    {
        private readonly IEventoZonaStandDA _eventoZonaStandDA;

        public EventoZonaStandFlujo(IEventoZonaStandDA eventoZonaStandDA)
        {
            _eventoZonaStandDA = eventoZonaStandDA;
        }

        public async Task<int> AgregarStandAEvento(EventoZonaStandBase stand)
        {
            return await _eventoZonaStandDA.AgregarStandAEvento(stand);
        }

        public async Task<int> CambiarDisponibilidadStand(int estado_id, EventoZonaStandBase stand)
        {
            return await _eventoZonaStandDA.CambiarDisponibilidadStand(estado_id, stand);
        }

        public async Task<IEnumerable<EventoZonaStandResponse>> ObtenerStandsEvento(int zona_id, int evento_id)
        {
            return await _eventoZonaStandDA.ObtenerStandsEvento(zona_id, evento_id);
        }
    }
}
