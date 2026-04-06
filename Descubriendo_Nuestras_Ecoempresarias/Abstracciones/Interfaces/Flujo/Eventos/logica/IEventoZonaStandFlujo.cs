using Abstracciones.Modelos.Eventos.Logica;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.Flujo.Eventos.logica
{
    public interface IEventoZonaStandFlujo
    {
        public Task<int> AgregarStandAEvento(EventoZonaStandBase stand);
        public Task<int> CambiarDisponibilidadStand(int estado_id, EventoZonaStandBase stand);
        public Task<IEnumerable<EventoZonaStandResponse>> ObtenerStandsEvento(int zona_id, int evento_id);


    }
}
