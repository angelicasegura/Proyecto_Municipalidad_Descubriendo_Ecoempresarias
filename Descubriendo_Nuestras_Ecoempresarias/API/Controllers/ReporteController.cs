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

        //emprendedores
        [Authorize(Roles = "ADMIN,EMPRENDEDOR")]
        [HttpGet("kpi/{id}")]
        public async Task<IActionResult> ObtenerKpi(int id)
        {
            var resultado = await _flujo.ObtenerKpi(id);
            return Ok(resultado);
        }

        [Authorize(Roles = "ADMIN,EMPRENDEDOR")]
        [HttpGet("ventas-mensuales/{id}")]
        public async Task<IActionResult> VentasMensuales(int id)
        {
            var resultado = await _flujo.ObtenerVentasMensuales(id);
            return Ok(resultado);
        }

        [Authorize(Roles = "ADMIN,EMPRENDEDOR")]
        [HttpGet("ticket-promedio/{id}")]
        public async Task<IActionResult> TicketPromedio(int id)
        {
            var resultado = await _flujo.ObtenerTicketPromedio(id);
            return Ok(resultado);
        }

        [Authorize(Roles = "ADMIN,EMPRENDEDOR")]
        [HttpGet("top-productos/{id}")]
        public async Task<IActionResult> TopProductos(int id)
        {
            var resultado = await _flujo.ObtenerProductosTop(id);
            return Ok(resultado);
        }


        [Authorize(Roles = "ADMIN,EMPRENDEDOR")]
        [HttpGet("productos-bajo/{id}")]
        public async Task<IActionResult> ProductosBajo(int id)
        {
            var resultado = await _flujo.ObtenerProductosBajo(id);
            return Ok(resultado);
        }

        [Authorize(Roles = "ADMIN,EMPRENDEDOR")]
        [HttpGet("inventario/{id}")]
        public async Task<IActionResult> Inventario(int id)
        {
            var resultado = await _flujo.ObtenerInventario(id);
            return Ok(resultado);
        }
    }
}