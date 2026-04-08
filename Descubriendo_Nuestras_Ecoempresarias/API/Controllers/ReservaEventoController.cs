using Abstracciones.Interfaces.Flujo;
using Abstracciones.Interfaces.Servicios;
using Abstracciones.Modelos.Eventos;
using Flujo.EmaiService;
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
        private readonly INotificacionesService _notificacionService;
        public ReservaEventoController(IReservaEventoFlujo reservaEventoFlujo, INotificacionesService notificacionesService)
        {
            _reservaEventoFlujo = reservaEventoFlujo;
            _notificacionService = notificacionesService;
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

        [HttpPut("Aprobar/{reservaId}")]
        public async Task<IActionResult> Aprobar(int reservaId)
        {
            var resultado = await _reservaEventoFlujo.AprobarReserva(reservaId);

          
            {
                try { await _notificacionService.NotificarSolicitudAprobadaAsync(reservaId); }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error notificación aprobación: {ex.Message}");
                }
            }
           

            return Ok(resultado);



        }
        [Authorize(Roles = "ADMIN")]

        [HttpPut("Rechazar/{reservaId}")]
        public async Task<IActionResult> Rechazar(int reservaId)
        {
            var resultado = await _reservaEventoFlujo.RechazarReserva(reservaId);

           
            {
                try { await _notificacionService.NotificarSolicitudRechazadaAsync(reservaId); }
                catch (Exception ex) { Console.WriteLine($"Error notificación rechazo: {ex.Message}"); }
            };

            return Ok(resultado);
        }

    }
}
