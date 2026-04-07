using Abstracciones.Interfaces.API.Eventos.logica;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Interfaces.Flujo.Eventos.logica;
using Abstracciones.Interfaces.Servicios;
using Abstracciones.Modelos.Eventos.Logica;
using Flujo.EmaiService;
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
        private readonly INotificacionesService _notificacionService;

        public EventoZonaStandController(IEventoZonaStandFlujo eventoZonaStandFlujo, IReservaEventoFlujo reservaEventoFlujo, INotificacionesService notificacionesService)
        {
            _eventoZonaStandFlujo = eventoZonaStandFlujo;
            _reservaEventoFlujo = reservaEventoFlujo;
            _notificacionService = notificacionesService;
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
                // Guardar datos del stand antes de desocuparlo
                var standInfo = await _eventoZonaStandFlujo.ObtenerStandsEvento(stand.Zona_id, stand.Evento_id);
                var standDetalle = standInfo?.FirstOrDefault(s => s.Stand_id == stand.Stand_id);
                var emprendimientoId = standDetalle?.Emprendimiento_id ?? stand.Emprendimiento_id;

                stand.Emprendimiento_id = null;
                var resultado = await _eventoZonaStandFlujo.CambiarDisponibilidadStand(11, stand);

                // Notificar en background

                {
                    try
                    {
                        if (emprendimientoId == null || standDetalle == null) return NoContent();

                        var reservas = await _reservaEventoFlujo
                            .ObtenerReservasEmprendimiento(emprendimientoId.Value);
                        var reserva = reservas.FirstOrDefault(r => r.Evento_id == stand.Evento_id);

                        if (reserva != null)
                        {
                            await _notificacionService.NotificarStandDesocupadoAsync(
                                correo: reserva.Correo,
                                nombreEmprendedor: reserva.Nombre,
                                nombreEmprendimiento: reserva.NombreEmprendimiento,
                                nombreEvento: standDetalle.NombreEvento,
                                codigoStand: standDetalle.Codigo
                            );
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error notificación desocupar stand: {ex.Message}");
                    }
                }
              

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al desocupar stand: {ex.Message}");
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
                // Validar reserva aceptada 
                var tieneReserva = await _reservaEventoFlujo
                    .TieneReservaAceptada(stand.Emprendimiento_id ?? 0, stand.Evento_id);

                if (!tieneReserva)
                    return BadRequest(new
                    {
                        codigo = "SIN_RESERVA_ACEPTADA",
                        mensaje = "El emprendimiento no tiene una solicitud aprobada para este evento."
                    });

                var resultado = await _eventoZonaStandFlujo.CambiarDisponibilidadStand(12, stand);

                // Notificar en background
               
                    try
                    {
                        // Obtener datos del emprendedor desde la reserva
                        var reservas = await _reservaEventoFlujo.ObtenerReservasEmprendimiento(stand.Emprendimiento_id ?? 0);
                        var reserva = reservas.FirstOrDefault(r => r.Evento_id == stand.Evento_id);

                        // Obtener datos del stand
                        var standInfo = await _eventoZonaStandFlujo.ObtenerStandsEvento(stand.Zona_id, stand.Evento_id);
                        var standDetalle = standInfo?.FirstOrDefault(s => s.Stand_id == stand.Stand_id);

                        if (reserva != null && standDetalle != null)
                        {
                            await _notificacionService.NotificarStandReservadoAsync(
                                correo: reserva.Correo,
                                nombreEmprendedor: reserva.Nombre,
                                nombreEmprendimiento: reserva.NombreEmprendimiento,
                                nombreEvento: standDetalle.NombreEvento,
                                nombreZona: standDetalle.NombreZona,
                                codigoStand: standDetalle.Codigo
                            );
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error notificación reserva stand: {ex.Message}");
                    }

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

