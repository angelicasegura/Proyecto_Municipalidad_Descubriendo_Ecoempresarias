using Abstracciones.Modelos.Eventos.Logica;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.DA.Eventos.logica
{
    public interface IZonaEventoDA
    {
        public Task<int> AgregarZonaAEvento(EventoZonaBase zona);
        public Task<int> CambiarDisponibilidadZona(int estado_id, EventoZonaBase zona);
        public Task<IEnumerable<EventoZonaResponse>> ObtenerZonaEvento(int evento_id);
        public Task<IEnumerable<EventoZonaResponse>> ObtenerZonaAEventoYEstado(int estadoid, int evento_id);

    }
}
