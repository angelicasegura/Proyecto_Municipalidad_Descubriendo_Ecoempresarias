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
    public class EventoZonaFlujo : IEventoZonaFlujo
    {
        private readonly IZonaEventoDA _zonaEventoDA;

        public EventoZonaFlujo(IZonaEventoDA zonaEventoDA)
        {
            _zonaEventoDA = zonaEventoDA;
        }

        public async Task<int> AgregarZonaAEvento(EventoZonaBase zona)
        {
            return await _zonaEventoDA.AgregarZonaAEvento(zona);
        }

        public async Task<int> CambiarDisponibilidadZona(int estado_id, EventoZonaBase zona)
        {
            return await _zonaEventoDA.CambiarDisponibilidadZona(estado_id, zona);
        }

        public async Task<IEnumerable<EventoZonaResponse>> ObtenerZonaAEventoYEstado(int estadoid, int evento_id)
        {
            return await _zonaEventoDA.ObtenerZonaAEventoYEstado(estadoid, evento_id);
        }

        public async Task<IEnumerable<EventoZonaResponse>> ObtenerZonaEvento(int evento_id)
        {
            return await _zonaEventoDA.ObtenerZonaEvento(evento_id);
        }
    }
}
