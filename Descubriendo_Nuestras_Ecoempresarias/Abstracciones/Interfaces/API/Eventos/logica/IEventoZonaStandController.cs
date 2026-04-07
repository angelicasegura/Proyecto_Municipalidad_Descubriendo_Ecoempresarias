using Abstracciones.Modelos.Eventos.Logica;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.API.Eventos.logica
{
    public interface IEventoZonaStandController
    {

        public Task<IActionResult> AgregarStandAEvento(EventoZonaStandBase stand);
        public Task<IActionResult> OcuparStandEvento(EventoZonaStandBase stand);
        public Task<IActionResult> DesocuparStandEvento(EventoZonaStandBase stand);
        public Task<IActionResult> BloquearStandEvento(EventoZonaStandBase stand);
        public Task<IActionResult> ObtenerStandEvento(int zona_id, int evento_id);
        
    }
}
