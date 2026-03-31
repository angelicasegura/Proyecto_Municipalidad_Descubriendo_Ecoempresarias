using Abstracciones.Interfaces.API.Eventos;
using Abstracciones.Interfaces.Flujo.Eventos;
using Abstracciones.Modelos.Eventos;
using DA.Eventos;
using Flujo.Eventos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Eventos
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase, IEventoController
    {
        private readonly IEventoFlujo _eventoFlujo;
        private readonly IConfiguration _configuration;

        public EventoController(IEventoFlujo eventoFlujo, IConfiguration configuration)
        {
            _eventoFlujo = eventoFlujo;
            _configuration = configuration;
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPost("CrearEvento")]
        public async Task<IActionResult> AgregarEvento([FromBody] EventoRequest evento)
        {
            try
            {
                var resultado = await _eventoFlujo.AgregarEvento(evento);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al crear evento es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("EditarEvento/{id}")]
        public async Task<IActionResult> EditarEvento([FromRoute]int id, [FromBody] EventoRequest evento)
        {

            try
            {
                var resultado = await _eventoFlujo.EditarEvento(id, evento);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al editar evento es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("InactivarEvento/{id}")]
        public async Task<IActionResult> InactivarEvento([FromRoute]  int id)
        {
            try
            {
                var resultado = await _eventoFlujo.InactivarEvento(id);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al inactivar evento es: {ex.Message}");
            }
        }


        [HttpGet("ObtenerEvento/{id}")]
        public async Task<IActionResult> ObtenerEventoPorId([FromRoute] int id)
        {
            try
            {
                var resultado = await _eventoFlujo.ObtenerEventoPorId(id);

                if (resultado == null)
                    return NoContent();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener evento es: {ex.Message}");
            }
        }

        [HttpPost("ObtenerEventoNombre")]
        public async Task<IActionResult> ObtenerEventoPorNombre([FromBody] string nombre)
        {
            try
            {
                var resultado = await _eventoFlujo.ObtenerEventoPorNombre(nombre);

                if (resultado == null)
                    return NoContent();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener evento es: {ex.Message}");
            }
        }

        [HttpGet("ObtenerEventos")]
        public async Task<IActionResult> ObtenerEventos()
        {
            try
            {
                var resultado = await _eventoFlujo.ObtenerEventos();

                if (!resultado.Any())
                    return NoContent();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener eventos es: {ex.Message}");
            }
        }
    }
}
