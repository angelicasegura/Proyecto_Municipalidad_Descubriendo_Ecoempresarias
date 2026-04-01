using Abstracciones.Modelos.Eventos.Logica;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.API.Eventos.logica
{
    public interface IEventoPisoController
    {
        public Task<IActionResult> AgregarPisoAEvento(EventoPisoBase piso);
        public Task<IActionResult> CambiarDisponibilidadPiso(EventoPisoBase piso);
        public Task<IActionResult> ObtenerPisoEvento(EventoPisoResponse piso);
        public Task<IActionResult> ObtenerPisoEventoYEstado(int estadoid, EventoPisoResponse piso);
    }
}
