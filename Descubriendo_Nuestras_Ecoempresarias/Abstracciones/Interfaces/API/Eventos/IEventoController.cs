using Abstracciones.Modelos.Eventos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.API.Eventos
{
    public interface IEventoController
    {
        public Task<IActionResult> AgregarEvento(EventoRequest evento);
        public Task<IActionResult> EditarEvento(int id, EventoRequest evento);
        public Task<IActionResult> InactivarEvento(int id);
        public Task<IActionResult> ObtenerEventos();
        public Task<IActionResult> ObtenerEventoPorId(int id);
        public Task<IActionResult> ObtenerEventoPorNombre(string nombre);

    }
}
