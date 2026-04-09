using Abstracciones.Modelos.Eventos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.API.Eventos
{
    public interface IZonaController
    {
        public Task<IActionResult> AgregarZona(ZonaRequest zona);
        public Task<IActionResult> EditarZona(int id, ZonaRequest zona);
        public Task<IActionResult> InactivarZona(int zona_id);
        public Task<IActionResult> ActivarZona(int zona_id);
        public Task<IActionResult> ObtenerZonasPorPiso(int piso_id);
        public Task<IActionResult> ObtenerZonasPorPisoActivas(int piso_id);
        public Task<IActionResult> ObtenerZonaPorId(int zona_id);
    }
}
