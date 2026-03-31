using Abstracciones.Interfaces.DA.Eventos;
using Abstracciones.Interfaces.Flujo.Eventos;
using Abstracciones.Modelos.Eventos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flujo.Eventos
{
    public class EventoFlujo : IEventoFlujo
    {
        private readonly IEventoDA _eventoDA;

        public EventoFlujo(IEventoDA eventoDA)
        {
            _eventoDA = eventoDA;
        }

        public async Task<int> AgregarEvento(EventoRequest evento)
        {
            return await _eventoDA.AgregarEvento(evento);
        }

        public async Task<int> EditarEvento(int id, EventoRequest evento)
        {
            return await _eventoDA.EditarEvento(id, evento);
        }

        public async Task<int> InactivarEvento(int id)
        {
            return await _eventoDA.InactivarEvento(id);
        }

        public async Task<EventoResponse> ObtenerEventoPorId(int id)
        {
            return await _eventoDA.ObtenerEventoPorId(id);
        }

        public async Task<EventoResponse> ObtenerEventoPorNombre(string nombre)
        {
            return await _eventoDA.ObtenerEventoPorNombre(nombre);
        }

        public async Task<IEnumerable<EventoResponse>> ObtenerEventos()
        {
            return await _eventoDA.ObtenerEventos();
        }
    }
}
