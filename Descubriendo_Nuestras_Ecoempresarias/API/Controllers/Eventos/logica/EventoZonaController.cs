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
    public class EventoZonaController : ControllerBase, IEventoZonaController
    {
        private readonly IEventoZonaFlujo _eventoZonaFlujo;
        private readonly IEventoZonaStandFlujo _eventoZonaStandFlujo;
        private readonly IZonaFlujo _zonaFlujo;
        private readonly IEventoPisoFlujo _eventoPisoFlujo;
        private readonly IStandFlujo _standFlujo;

        public EventoZonaController(IEventoZonaFlujo eventoZonaFlujo, IEventoZonaStandFlujo eventoZonaStandFlujo, IZonaFlujo zonaFlujo, IEventoPisoFlujo eventoPisoFlujo, IStandFlujo standFlujo)
        {
            _eventoZonaFlujo = eventoZonaFlujo;
            _eventoZonaStandFlujo = eventoZonaStandFlujo;
            _zonaFlujo = zonaFlujo;
            _eventoPisoFlujo = eventoPisoFlujo;
            _standFlujo = standFlujo;
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("ActivarZonaAEvento")]
        public async Task<IActionResult> ActivarZonaEvento([FromBody] EventoZonaBase zona)
        {
            try
            {
                var resultado = await _eventoZonaFlujo.CambiarDisponibilidadZona(1, zona);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al activar zona en el evento es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPost("AgregarZonaAEvento")]
        public async Task<IActionResult> AgregarZonaAEvento([FromBody] EventoZonaBase zona)
        {
            try
            {
                // Validación 1: Verificar que la zona tiene mapa asignado
                var zonaInfo = await _zonaFlujo.ObtenerZonaPorId(zona.Zona_id);
                if (zonaInfo == null)
                    return NotFound("La zona no existe");

                if (zonaInfo.Mapa_id == null || zonaInfo.Mapa_id == 0)
                    return BadRequest(new
                    {
                        codigo = "SIN_MAPA",
                        mensaje = $"La zona '{zonaInfo.Nombre}' no tiene un mapa asignado. Asigná un mapa antes de agregarla al evento."
                    });

                // Validación 2: Verificar que el piso de la zona está habilitado en el evento
                var pisosEvento = await _eventoPisoFlujo.ObtenerPisoEvento(zona.Evento_id);
                var pisoHabilitado = pisosEvento?.Any(p => p.Piso_id == zonaInfo.Piso_id && p.Estado_id == 1);

                if (pisoHabilitado != true)
                    return BadRequest(new
                    {
                        codigo = "PISO_NO_HABILITADO",
                        mensaje = "El piso al que pertenece esta zona no está habilitado en el evento."
                    });

                // Agregar la zona al evento
                var resultado = await _eventoZonaFlujo.AgregarZonaAEvento(zona);

                // Agregar todos los stands del mapa de la zona con estado 11 (disponible)
                var stands = await _standFlujo.ObtenerStandPorMapa(zonaInfo.Mapa_id.Value);
                foreach (var stand in stands)
                {
                    await _eventoZonaStandFlujo.AgregarStandAEvento(new EventoZonaStandBase
                    {
                        Stand_id = stand.Stand_id,
                        Evento_id = zona.Evento_id,
                        Zona_id = zona.Zona_id,
                        Estado_id = 11,
                        Emprendimiento_id = null //se deja null ya que al agregar un evento nadie tiene asignado el stand, se asignará cuando un emprendimiento reserve el stand
                    });
                }

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al agregar zona al evento: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("InactivarZonaAEvento")]
        public async Task<IActionResult> InactivarZonaEvento([FromBody] EventoZonaBase zona)
        {
            try
            {
                var resultado = await _eventoZonaFlujo.CambiarDisponibilidadZona(0, zona);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al inactivar zona en el evento es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN, EMPRENDEDOR")]
        [HttpGet("ObtenerZonaEventoActivos/{evento_id}")]
        public async Task<IActionResult> ObtenerZonaEventoActivos([FromRoute] int evento_id)
        {
            try
            {
                var resultado = await _eventoZonaFlujo.ObtenerZonaAEventoYEstado(1, evento_id);

                if (resultado == null)
                    return NoContent();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener zonas del evento es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("ObtenerZonaEvento/{evento_id}")]
        public async Task<IActionResult> ObtenerZonaAEvento([FromRoute] int evento_id)
        {
            try
            {
                var resultado = await _eventoZonaFlujo.ObtenerZonaEvento(evento_id);

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
