using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos.Eventos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservaEventoController : ControllerBase
    {
        private readonly IReservaEventoFlujo _reservaEventoFlujo;
        public ReservaEventoController(IReservaEventoFlujo reservaEventoFlujo)
        {
            _reservaEventoFlujo = reservaEventoFlujo;
        }
        [Authorize(Roles = "EMPRENDEDOR")]
        [HttpPost("CrearReserva")]
        public async Task<IActionResult> CrearReserva(ReservaEventoRequest reserva)
        {
            var resultado = await _reservaEventoFlujo.CrearReservaEvento(reserva);

            return Ok(resultado);
        }
        [Authorize(Roles = "EMPRENDEDOR")]

        [HttpGet("MisReservas/{emprendimientoId}")]
        public async Task<IActionResult> MisReservas(int emprendimientoId)
        {
            var resultado = await _reservaEventoFlujo.ObtenerReservasEmprendimiento(emprendimientoId);

            return Ok(resultado);
        }
        [Authorize(Roles = "ADMIN")]

        [HttpGet("Solicitudes")]
        public async Task<IActionResult> Solicitudes()
        {
            var resultado = await _reservaEventoFlujo.ObtenerSolicitudesReservaEvento();

            return Ok(resultado);
        }
        [Authorize(Roles = "ADMIN")]

        [HttpPut("Aprobar")]
        public async Task<IActionResult> Aprobar(int eventoId, int emprendimientoId)
        {
            var resultado = await _reservaEventoFlujo.AprobarReserva(eventoId, emprendimientoId);

            return Ok(resultado);
        }
        [Authorize(Roles = "ADMIN")]

        [HttpPut("Rechazar")]
        public async Task<IActionResult> Rechazar(int eventoId, int emprendimientoId)
        {
            var resultado = await _reservaEventoFlujo.RechazarReserva(eventoId, emprendimientoId);

            return Ok(resultado);
        }

    }
}
