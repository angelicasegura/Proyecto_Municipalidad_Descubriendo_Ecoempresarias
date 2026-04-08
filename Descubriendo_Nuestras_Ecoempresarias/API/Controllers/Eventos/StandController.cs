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
    public class StandController : ControllerBase, IStandController
    {
        private readonly IStandFlujo _standFlujo;
        private readonly IConfiguration _configuration;

        public StandController(IStandFlujo standFlujo, IConfiguration configuration)
        {
            _standFlujo = standFlujo;
            _configuration = configuration;
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("EditarStand/{id}")]
        public async Task<IActionResult> ActualizarStand([FromRoute] int id, [FromBody] StandRequest stand)
        {
            try
            {
                var resultado = await _standFlujo.ActualizarStand(id, stand);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al editar stand es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPost("AgregarStand")]
        public async Task<IActionResult> AgregarStand([FromBody] StandRequest stand)
        {
            try
            {
                var resultado = await _standFlujo.AgregarStand(stand);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al crear stand es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("InactivarStand/{stand_id}")]
        public async Task<IActionResult> InactivarStand([FromRoute] int stand_id)
        {
            try
            {
                var resultado = await _standFlujo.CambiarEstadoStand(stand_id, 0);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al inactivar stand es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("ActivarStand/{stand_id}")]
        public async Task<IActionResult> ActivarStand([FromRoute] int stand_id)
        {
            try
            {
                var resultado = await _standFlujo.CambiarEstadoStand(stand_id, 1);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al activar stand es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("ObtenerStandPorId/{stand_id}")]
        public async Task<IActionResult> ObtenerStandPorId([FromRoute] int stand_id)
        {
            try
            {
                var resultado = await _standFlujo.ObtenerStandPorId(stand_id);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener stand es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("ObtenerStandPorMapa/{mapa_id}")]
        public async Task<IActionResult> ObtenerStandPorMapa([FromRoute] int mapa_id)
        {
            try
            {
                var resultado = await _standFlujo.ObtenerStandPorMapa(mapa_id);

                if (!resultado.Any())
                    return NoContent();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener stands es: {ex.Message}");
            }
        }
    }
}
