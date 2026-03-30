using Abstracciones.Modelos.Eventos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.API.Eventos
{
    public interface ILugarController
    {
        public Task<IActionResult> AgregarLugar(LugarRequest lugar);
        public Task<IActionResult> EditarLugar(int id, LugarRequest lugar);
        public Task<IActionResult> InactivarLugar(int id);
        public Task<IActionResult> ObtenerLugares();
        public Task<IActionResult> ObtenerLugarPorId(int id);
    }
}
