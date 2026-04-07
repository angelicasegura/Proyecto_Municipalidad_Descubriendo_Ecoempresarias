using Abstracciones.Interfaces.API.Eventos;
using Abstracciones.Interfaces.Flujo.Eventos;
using Abstracciones.Modelos.Eventos;
using Flujo.Eventos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Eventos
{
    [Route("api/[controller]")]
    [ApiController]
    public class PisoController : ControllerBase, IPisoController
    {
        private readonly IPisoFlujo _pisoFlujo;
        private readonly IConfiguration _configuration;

        public PisoController(IPisoFlujo pisoFlujo, IConfiguration configuration)
        {
            _pisoFlujo = pisoFlujo;
            _configuration = configuration;
        }


        [Authorize(Roles = "ADMIN")]
        [HttpPost("AgregarPiso")]
        public async Task<IActionResult> AgregarPiso([FromBody] PisoRequest piso)
        {
            try
            {
                var resultado = await _pisoFlujo.AgregarPiso(piso);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al crear piso es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("EditarPiso/{id}")]
        public async Task<IActionResult> EditarPiso([FromRoute]int id, [FromBody] PisoRequest piso)
        {
            try
            {
                var resultado = await _pisoFlujo.EditarPiso(id, piso);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al editar piso es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("InactivarPiso/{id}")]
        public async Task<IActionResult> InactivarPiso([FromRoute]int id)
        {
            try
            {
                var resultado = await _pisoFlujo.InactivarPiso(id);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al inactivar piso es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("ObtenerPisoPorId/{id}")]
        public async Task<IActionResult> ObtenerPisoPorId([FromRoute] int id)
        {
            try
            {
                var resultado = await _pisoFlujo.ObtenerPisoPorId(id);

                if (resultado == null)
                    return NoContent();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener piso es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("ObtenerPisoPorLugar/{lugar_id}")]
        public async Task<IActionResult> ObtenerPisosPorLugar([FromRoute] int lugar_id)
        {
            try
            {
                var resultado = await _pisoFlujo.ObtenerPisosPorLugar(lugar_id);

                if (!resultado.Any())
                    return NoContent();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener piso es: {ex.Message}");
            }
        }
    }
}
