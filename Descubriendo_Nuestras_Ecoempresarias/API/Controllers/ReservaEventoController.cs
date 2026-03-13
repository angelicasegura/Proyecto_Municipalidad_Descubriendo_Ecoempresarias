using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos.Eventos;
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
        [HttpPost("CrearReserva")]
        public async Task<IActionResult> CrearReserva(ReservaEventoRequest reserva)
        {
            var resultado = await _reservaEventoFlujo.CrearReservaEvento(reserva);

            return Ok(resultado);
        }

        [HttpGet("MisReservas/{emprendimientoId}")]
        public async Task<IActionResult> MisReservas(int emprendimientoId)
        {
            var resultado = await _reservaEventoFlujo.ObtenerReservasEmprendimiento(emprendimientoId);

            return Ok(resultado);
        }

        [HttpGet("Solicitudes")]
        public async Task<IActionResult> Solicitudes()
        {
            var resultado = await _reservaEventoFlujo.ObtenerSolicitudesReservaEvento();

            return Ok(resultado);
        }

        [HttpPut("Aprobar")]
        public async Task<IActionResult> Aprobar(int eventoId, int emprendimientoId)
        {
            var resultado = await _reservaEventoFlujo.AprobarReserva(eventoId, emprendimientoId);

            return Ok(resultado);
        }

        [HttpPut("Rechazar")]
        public async Task<IActionResult> Rechazar(int eventoId, int emprendimientoId)
        {
            var resultado = await _reservaEventoFlujo.RechazarReserva(eventoId, emprendimientoId);

            return Ok(resultado);
        }

    }
}
