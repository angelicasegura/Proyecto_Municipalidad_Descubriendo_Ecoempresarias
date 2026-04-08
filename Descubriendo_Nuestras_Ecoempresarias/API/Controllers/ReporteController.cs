using Abstracciones.Interfaces;
using Abstracciones.Interfaces.Flujo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static Abstracciones.Modelos.Emprendimiento;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReporteController : ControllerBase
    {
        private readonly IReporteFlujo _flujo;
        private readonly IEmprendimientoFlujo _emprendimientoFlujo;
        public ReporteController(IReporteFlujo flujo, IEmprendimientoFlujo emprendimientoFlujo)
        {
            _flujo = flujo;
            _emprendimientoFlujo = emprendimientoFlujo;
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
        //Falta hacer validaciones para asgurarse que los reportes solo lo vean los emprendedores asignados
        [Authorize(Roles = "ADMIN,EMPRENDEDOR")]
        [HttpGet("kpi/{id}")]
        public async Task<IActionResult> ObtenerKpi(int id)
        {
            var idClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
            int usuarioId = int.Parse(idClaim ?? "0");
            if (!await VerficiarEmprendimiento(id, usuarioId))
            {
              return Unauthorized("No tienes permiso para acceder a este recurso");
            }
            var resultado = await _flujo.ObtenerKpi(id);
            return Ok(resultado);
        }

        [Authorize(Roles = "ADMIN,EMPRENDEDOR")]
        [HttpGet("ventas-mensuales/{id}")]
        public async Task<IActionResult> VentasMensuales(int id)
        {

            var idClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
            int usuarioId = int.Parse(idClaim ?? "0");
            if (!await VerficiarEmprendimiento(id, usuarioId))
            {
                return Unauthorized("No tienes permiso para acceder a este recurso");
            }
            var resultado = await _flujo.ObtenerVentasMensuales(id);
            return Ok(resultado);
        }

        [Authorize(Roles = "ADMIN,EMPRENDEDOR")]
        [HttpGet("ticket-promedio/{id}")]
        public async Task<IActionResult> TicketPromedio(int id)
        {
            var idClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
            int usuarioId = int.Parse(idClaim ?? "0");
            if (!await VerficiarEmprendimiento(id, usuarioId))
            {
                return Unauthorized("No tienes permiso para acceder a este recurso");
            }
            var resultado = await _flujo.ObtenerTicketPromedio(id);
            return Ok(resultado);
        }

        [Authorize(Roles = "ADMIN,EMPRENDEDOR")]
        [HttpGet("top-productos/{id}")]
        public async Task<IActionResult> TopProductos(int id)
        {
            var idClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
            int usuarioId = int.Parse(idClaim ?? "0");
            if (!await VerficiarEmprendimiento(id, usuarioId))
            {
                return Unauthorized("No tienes permiso para acceder a este recurso");
            }
            var resultado = await _flujo.ObtenerProductosTop(id);
            return Ok(resultado);
        }


        [Authorize(Roles = "ADMIN,EMPRENDEDOR")]
        [HttpGet("productos-bajo/{id}")]
        public async Task<IActionResult> ProductosBajo(int id)
        {
            var idClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
            int usuarioId = int.Parse(idClaim ?? "0");
            if (!await VerficiarEmprendimiento(id, usuarioId))
            {
                return Unauthorized("No tienes permiso para acceder a este recurso");
            }
            var resultado = await _flujo.ObtenerProductosBajo(id);
            return Ok(resultado);
        }

        [Authorize(Roles = "ADMIN,EMPRENDEDOR")]
        [HttpGet("inventario/{id}")]
        public async Task<IActionResult> Inventario(int id)
        {
            var idClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
            int usuarioId = int.Parse(idClaim ?? "0");
            if (!await VerficiarEmprendimiento(id, usuarioId))
            {
                return Unauthorized("No tienes permiso para acceder a este recurso");
            }
            var resultado = await _flujo.ObtenerInventario(id);
            return Ok(resultado);
        }



        private async Task< bool> VerficiarEmprendimiento(int id, int cedula)
        {
            try
            {
                EmprendimientoResponse emprendimiento = await _emprendimientoFlujo.GetEmprendiemientoPorEmprendimeintoID(id);
                if(emprendimiento == null)
                {
                    return false;
                }
                if(emprendimiento.UsuarioId != cedula)
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}