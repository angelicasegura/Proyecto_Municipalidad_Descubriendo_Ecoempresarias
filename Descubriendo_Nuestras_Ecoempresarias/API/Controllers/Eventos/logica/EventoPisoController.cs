using Abstracciones.Interfaces.API.Eventos.logica;
using Abstracciones.Interfaces.Flujo.Eventos;
using Abstracciones.Interfaces.Flujo.Eventos.logica;
using Abstracciones.Modelos.Eventos.Logica;
using Flujo.Eventos.Logica;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Eventos.logica
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoPisoController : ControllerBase, IEventoPisoController
    {
        private readonly IEventoPisoFlujo _eventoPisoFlujo;
        private readonly IEventoZonaFlujo _eventoZonaFlujo;
        private readonly IZonaFlujo _zonaFlujo;

        private readonly IConfiguration _configuration;

        public EventoPisoController(IEventoPisoFlujo eventoPisoFlujo, IConfiguration configuration, IEventoZonaFlujo eventoZonaFlujo, IZonaFlujo zonaFlujo)
        {
            _eventoPisoFlujo = eventoPisoFlujo;
            _configuration = configuration;
            _eventoZonaFlujo = eventoZonaFlujo;
            _zonaFlujo = zonaFlujo;
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPost("AgregarPisoAEvento")]
        public async Task<IActionResult> AgregarPisoAEvento([FromBody]EventoPisoBase piso)
        {

            try
            {
                var resultado = await _eventoPisoFlujo.AgregarPisoAEvento(piso);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al agregar piso al evento es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("InactivarPiso")]
        public async Task<IActionResult> InactivarPisoEvento([FromBody] EventoPisoBase piso)
        {
            try
            {
                // 1. Inactivar el piso en el evento
                var resultado = await _eventoPisoFlujo.CambiarDisponibilidadPiso(0, piso);

                // 2. Obtener todas las zonas que pertenecen a ese piso (desde tabla zonas)
                var zonasDelPiso = await _zonaFlujo.ObtenerZonasPorPiso(piso.Piso_id);
                var zona_ids = zonasDelPiso.Select(z => z.Zona_id).ToHashSet();

                // 3. Obtener todas las zonas asignadas al evento
                var zonasEvento = await _eventoZonaFlujo.ObtenerZonaEvento(piso.Evento_id);

                // 4. Filtrar solo las que pertenecen al piso que se inactivó
                var zonasAInactivar = zonasEvento
                    .Where(z => zona_ids.Contains(z.Zona_id) && z.Estado_id == 1)
                    .ToList();

                // 5. Inactivar cada una
                foreach (var zona in zonasAInactivar)
                {
                    await _eventoZonaFlujo.CambiarDisponibilidadZona(0, new EventoZonaBase
                    {
                        Evento_id = piso.Evento_id,
                        Zona_id = zona.Zona_id,
                        Estado_id = 0
                    });
                }

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al inactivar piso en el evento es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("ActivarPiso")]
        public async Task<IActionResult> ActivarPisoEvento([FromBody] EventoPisoBase piso)
         {
            try
            {
                var resultado = await _eventoPisoFlujo.CambiarDisponibilidadPiso(1, piso);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al activar piso en el evento es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("ObtenerPisosEvento/{evento_id}")]
        public async Task<IActionResult> ObtenerPisoEvento([FromRoute] int evento_id)
        {

            try
            {
                var resultado = await _eventoPisoFlujo.ObtenerPisoEvento(evento_id);

                if (resultado == null)
                    return NoContent();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener pisos del evento es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN, EMPRENDEDOR")]
        [HttpGet("ObtenerPisosEventoPorEstado/{evento_id}")]
        public async Task<IActionResult> ObtenerPisoEventoActivos( [FromRoute] int evento_id)
        {

            try
            {
                var resultado = await _eventoPisoFlujo.ObtenerPisoEventoYEstado(1, evento_id);

                if (resultado == null)
                    return NoContent();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener pisos del evento es: {ex.Message}");
            }
        }
    }
}
