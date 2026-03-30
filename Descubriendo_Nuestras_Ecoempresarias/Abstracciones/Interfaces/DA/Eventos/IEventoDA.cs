using Abstracciones.Modelos.Eventos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.DA.Eventos
{
    public interface IEventoDA
    {
        public Task<int> AgregarEvento(EventoRequest evento);
        public Task<int> EditarEvento(int id, EventoRequest evento);
        public Task<int> InactivarEvento(int id);
        public Task<IEnumerable<EventoResponse>> ObtenerEventos();
        public Task<EventoResponse> ObtenerEventoPorId(int id);
        public Task<EventoResponse> ObtenerEventoPorNombre(string nombre);

    }
}
