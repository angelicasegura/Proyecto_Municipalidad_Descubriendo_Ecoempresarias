using Abstracciones.Interfaces.API.Eventos.logica;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Interfaces.Flujo.Eventos.logica;
using Abstracciones.Modelos.Eventos.Logica;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Eventos.logica
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoZonaStandController : ControllerBase, IEventoZonaStandController
    {
        private readonly IEventoZonaStandFlujo _eventoZonaStandFlujo;
        private readonly IReservaEventoFlujo _reservaEventoFlujo;

        public EventoZonaStandController(IEventoZonaStandFlujo eventoZonaStandFlujo, IReservaEventoFlujo reservaEventoFlujo)
        {
            _eventoZonaStandFlujo = eventoZonaStandFlujo;
            _reservaEventoFlujo = reservaEventoFlujo;

        }


        [Authorize(Roles = "ADMIN")]
        [HttpPost("AgregarStandAEvento")]
        public async Task<IActionResult> AgregarStandAEvento(EventoZonaStandBase stand)
        {
            try
            {
                var resultado = await _eventoZonaStandFlujo.AgregarStandAEvento(stand);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al agregar stand al evento es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("BloquearStandEvento")]
        public async Task<IActionResult> BloquearStandEvento([FromBody]EventoZonaStandBase stand)
        {
            try
            {
                stand.Emprendimiento_id = null;

                var resultado = await _eventoZonaStandFlujo.CambiarDisponibilidadStand(13, stand);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al bloquear stand en el evento es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN, EMPRENDEDOR")]
        [HttpPut("DesocuparStandEvento")]
        public async Task<IActionResult> DesocuparStandEvento([FromBody] EventoZonaStandBase stand)
        {
            try
            {
                stand.Emprendimiento_id = null; 

                var resultado = await _eventoZonaStandFlujo.CambiarDisponibilidadStand(11, stand);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al desocupar stand en el evento es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN, EMPRENDEDOR")]
        [HttpGet("ObtenerStandEvento/evento{evento_id}/zona{zona_id}")]
        public async Task<IActionResult> ObtenerStandEvento([FromRoute] int zona_id, [FromRoute] int evento_id)
        {
            try
            {
                var resultado = await _eventoZonaStandFlujo.ObtenerStandsEvento(zona_id, evento_id);

                if (resultado == null)
                    return NoContent();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener stands del evento es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN, EMPRENDEDOR")]
        [HttpPut("OcuparStandEvento")]
        public async Task<IActionResult> OcuparStandEvento([FromBody] EventoZonaStandBase stand)
        {
            try
            {
                // Validar que el emprendimiento tiene reserva aceptada
                var tieneReserva = await _reservaEventoFlujo
                    .TieneReservaAceptada(stand.Emprendimiento_id ?? 0, stand.Evento_id);

                if (!tieneReserva)
                    return BadRequest(new
                    {
                        codigo = "SIN_RESERVA_ACEPTADA",
                        mensaje = "El emprendimiento no tiene una solicitud aprobada para este evento."
                    });

                var resultado = await _eventoZonaStandFlujo.CambiarDisponibilidadStand(12, stand);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al reservar stand: {ex.Message}");
            }
        }
    }
}

