using Abstracciones.Interfaces.API.Eventos;
using Abstracciones.Interfaces.Flujo.Eventos;
using Abstracciones.Modelos.Eventos;
using Flujo.Eventos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Eventos
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZonaController : ControllerBase, IZonaController
    {
        private readonly IZonaFlujo _zonaFlujo;
        private readonly IConfiguration _configuration;

        public ZonaController(IZonaFlujo zonaFlujo, IConfiguration configuration)
        {
            _zonaFlujo = zonaFlujo;
            _configuration = configuration;
        }

        [HttpPost("AgregarZona")]
        public async Task<IActionResult> AgregarZona([FromBody] ZonaRequest zona)
        {
            try
            {
                var resultado = await _zonaFlujo.AgregarZona(zona);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al crear zona es: {ex.Message}");
            }
        }

        [HttpPut("InactivarZona/{zona_id}")]
        public async Task<IActionResult> InactivarZona([FromRoute] int zona_id)
        {
            try
            {
                var resultado = await _zonaFlujo.CambiarEstadoZona(zona_id, 0);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al inactivar zona es: {ex.Message}");
            }
        }

        [HttpPut("ActivarZona/{zona_id}")]
        public async Task<IActionResult> ActivarZona([FromRoute] int zona_id)
        {
            try
            {
                var resultado = await _zonaFlujo.CambiarEstadoZona(zona_id, 1);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al activar zona es: {ex.Message}");
            }
        }

        [HttpPut("EditarZona/{id}")]
        public async Task<IActionResult> EditarZona([FromRoute] int id, [FromBody] ZonaRequest zona)
        {
            try
            {
                var resultado = await _zonaFlujo.EditarZona(id, zona);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al editar zona es: {ex.Message}");
            }
        }

        [HttpGet("ObtenerZonaPorId/{zona_id}")]
        public async Task<IActionResult> ObtenerZonaPorId([FromRoute] int zona_id)
        {
            try
            {
                var resultado = await _zonaFlujo.ObtenerZonaPorId(zona_id);

                if (resultado == null)
                    return NoContent();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener zona es: {ex.Message}");
            }
        }

        [HttpGet("ObtenerZonasPorPiso/{piso_id}")]
        public async Task<IActionResult> ObtenerZonasPorPiso([FromRoute] int piso_id)
        {
            try
            {
                var resultado = await _zonaFlujo.ObtenerZonasPorPiso(piso_id);

                if (!resultado.Any())
                    return NoContent();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener zonas es: {ex.Message}");
            }
        }

        [HttpGet("ObtenerZonasPorPisoActivas/{piso_id}")]
        public async Task<IActionResult> ObtenerZonasPorPisoActivas([FromRoute] int piso_id)
        {
            try
            {
                var resultado = await _zonaFlujo.ObtenerZonasPorPisoActivas(piso_id);

                if (!resultado.Any())
                    return NoContent();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener zonas es: {ex.Message}");
            }
        }
    }
}
