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
        public Task<int> CambiarDisponibilidadPiso(EventoPisoBase piso);
        public Task<int> ObtenerPisoEvento(EventoPisoResponse piso);
        public Task<int> ObtenerPisoEventoYEstado(int estadoid, EventoPisoResponse piso);

    }
}
