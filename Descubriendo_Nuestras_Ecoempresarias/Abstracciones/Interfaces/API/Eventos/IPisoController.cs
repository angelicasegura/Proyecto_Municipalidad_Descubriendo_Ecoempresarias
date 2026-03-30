using Abstracciones.Modelos.Eventos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.API.Eventos
{
    public interface IPisoController
    {
        public Task<IActionResult> AgregarPiso(PisoRequest piso);
        public Task<IActionResult> EditarPiso(int id, PisoRequest piso);
        public Task<IActionResult> InactivarPiso(int id);
        public Task<IActionResult> ObtenerPisosPorLugar(int lugar_id);
        public Task<IActionResult> ObtenerPisoPorId(int id);

    }
}
