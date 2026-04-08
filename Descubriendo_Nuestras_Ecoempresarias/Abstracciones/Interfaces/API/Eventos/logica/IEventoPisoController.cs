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
        public Task<IActionResult> InactivarPisoEvento( EventoPisoBase piso);
        public Task<IActionResult> ActivarPisoEvento( EventoPisoBase piso);
        public Task<IActionResult> ObtenerPisoEvento(int evento_id);
        public Task<IActionResult> ObtenerPisoEventoActivos( int evento_id);
    }
}
