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
        public Task<int> CambiarDisponibilidadZona(EventoZonaBase zona);
        public Task<int> ObtenerZonaEvento(EventoZonaResponse zona);
        public Task<int> ObtenerZonaAEventoYEstado(int estadoid, EventoZonaResponse zona);

    }
}
