using Abstracciones.Modelos.Eventos.Logica;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.API.Eventos.logica
{
    public interface IEventoZonaController
    {
        public Task<IActionResult> AgregarZonaAEvento(EventoZonaBase zona);
        public Task<IActionResult> InactivarZonaEvento(EventoZonaBase zona);
        public Task<IActionResult> ActivarZonaEvento(EventoZonaBase zona);
        public Task<IActionResult> ObtenerZonaAEvento(int evento_id);
        public Task<IActionResult> ObtenerZonaEventoActivos(int evento_id);

    }
}
