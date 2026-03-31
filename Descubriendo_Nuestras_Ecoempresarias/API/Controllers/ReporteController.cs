using Abstracciones.Interfaces;
using Abstracciones.Interfaces.Flujo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReporteController : ControllerBase
    {
        private readonly IReporteFlujo _flujo;

        public ReporteController(IReporteFlujo flujo)
        {
            _flujo = flujo;
        }
        [Authorize(Roles = "ADMIN")]
        [HttpGet("ventasPorSector")]
        public async Task<IActionResult> VentasPorSector()
        {
            var resultado = await _flujo.ObtenerVentasPorSector();
            return Ok(resultado);
        }
        [Authorize(Roles = "ADMIN")]
        [HttpGet("topSectores")]
        public async Task<IActionResult> TopSectores()
        {
            var resultado = await _flujo.ObtenerTopSectores();
            return Ok(resultado);
        }
        [Authorize(Roles = "ADMIN")]
        [HttpGet("crecimiento")]
        public async Task<IActionResult> Crecimiento()
        {
            var resultado = await _flujo.ObtenerCrecimiento();
            return Ok(resultado);
        }
        [Authorize(Roles = "ADMIN")]
        [HttpGet("activos")]
        public async Task<IActionResult> Activos()
        {
            var resultado = await _flujo.ObtenerActivos();
            return Ok(resultado);
        }
    }
}