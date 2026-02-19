using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/Inventario")]
    [ApiController]
    public class InventarioController : ControllerBase
    {
        private readonly IInventarioFlujo _inventarioFlujo;
        private readonly IEmprendimientoFlujo _emprendimientoFlujo;

        public InventarioController(IInventarioFlujo inventarioFlujo, IEmprendimientoFlujo emprendimientoFlujo)
        {
            _inventarioFlujo = inventarioFlujo;
            _emprendimientoFlujo = emprendimientoFlujo;
        }

        [Authorize(Roles = "EMPRENDEDOR")]
        [HttpGet("Mi-Inventario")]
        public async Task<IActionResult> ObtenerInventarios([FromQuery] int emprendimiento_id, [FromQuery] string CedulaJuridica)
        {
            try
            {
                var emprendimiento = await _emprendimientoFlujo.GetEmprendimientoPorId(CedulaJuridica);
                var idClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
                int usuarioId = int.Parse(idClaim ?? "0");
                if (emprendimiento.EstadoId == 0)
                {
                    return BadRequest("Emprendimiento inactivo");
                }
                if (usuarioId != emprendimiento.UsuarioId)
                {
                    return Unauthorized("No tienes permiso para acceder a este recurso");
                }

                var inventarios = await _inventarioFlujo.ObtenerInventarios(emprendimiento_id);
                return Ok(inventarios);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno al obtener el inventario: {ex.Message}");


            }
        }

        [Authorize(Roles = "EMPRENDEDOR")]
        [HttpGet("Editar")]
        public async Task<IActionResult> EditarInventario([FromQuery] Guid Inventarioid, [FromQuery] int emprendimiento_id, [FromQuery] string CedulaJuridica, [FromBody] Inventario inventario)
        {
            try
            {

                var emprendimiento = await _emprendimientoFlujo.GetEmprendimientoPorId(CedulaJuridica);
                var idClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
                int usuarioId = int.Parse(idClaim ?? "0");
                if (emprendimiento.EstadoId == 0)
                {
                    return BadRequest("Emprendimiento inactivo");
                }
                if (usuarioId != emprendimiento.UsuarioId)
                {
                    return Unauthorized("No tienes permiso para acceder a este recurso");
                }
                var resultado = await _inventarioFlujo.EditarInventario(Inventarioid, inventario);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno al editar el inventario: {ex.Message}");
            }
        }
    }
}
