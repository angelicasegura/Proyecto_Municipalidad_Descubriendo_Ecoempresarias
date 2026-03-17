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
    public class MapaController : ControllerBase, IMapaController
    {
        private readonly IMapaFlujo _mapaFlujo;
        private readonly IConfiguration _configuration;

        public MapaController(IMapaFlujo mapaFlujo, IConfiguration configuration)
        {
            _mapaFlujo = mapaFlujo;
            _configuration = configuration;
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPost("AgregarMapa")]
        public async Task<IActionResult> AgregarMapa([FromBody]MapaRequest mapa)
        {
            try
            {
                var resultado = await _mapaFlujo.AgregarMapa(mapa);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al crear mapa es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("InactivarMapa/{mapa_id}")]
        public async Task<IActionResult> InactivarMapa([FromRoute] int mapa_id)
        {
            try
            {
                var resultado = await _mapaFlujo.CambiarEstadoMapa(mapa_id, 0);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al inactivar mapa es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("ActivarMapa/{mapa_id}")]
        public async Task<IActionResult> ActivarMapa([FromRoute] int mapa_id)
        {
            try
            {
                var resultado = await _mapaFlujo.CambiarEstadoMapa(mapa_id, 1);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al activar mapa es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("EditarMapa/{id}")]
        public async Task<IActionResult> EditarMapa([FromRoute] int id, [FromBody] MapaRequest mapa)
        {
            try
            {
                var resultado = await _mapaFlujo.EditarMapa(id, mapa);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al editar mapa es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("ObtenerMapaPorId/{mapa_id}")]
        public async Task<IActionResult> ObtenerMapaPorId([FromRoute] int mapa_id)
        {
            try
            {
                var resultado = await _mapaFlujo.ObtenerMapaPorId(mapa_id);

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
        [HttpGet("ObtenerMapas")]
        public async Task<IActionResult> ObtenerMapas()
        {
            try
            {
                var resultado = await _mapaFlujo.ObtenerMapas();

                if (!resultado.Any())
                    return NoContent();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener mapas es: {ex.Message}");
            }
        }
    }
}
