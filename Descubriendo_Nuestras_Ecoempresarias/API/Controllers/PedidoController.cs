using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PedidoController : ControllerBase
    {
        private readonly IPedidoFlujo _pedidoFlujo;
        private readonly IEmprendimientoFlujo _emprendimientoFlujo;

        public PedidoController(IPedidoFlujo pedidoFlujo, IEmprendimientoFlujo emprendimientoFlujo)
        {
            _pedidoFlujo = pedidoFlujo;
            _emprendimientoFlujo = emprendimientoFlujo;
        }

        private int GetUsuarioId() =>
            int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id")?.Value ?? "0");

        [HttpPost]
        public async Task<IActionResult> ConfirmarPedido([FromBody] PedidoRequest pedido)
        {
            try
            {
                var resultado = await _pedidoFlujo.ConfirmarPedido(GetUsuarioId(), pedido);

                if (resultado == null)
                    return BadRequest("No se pudo confirmar el pedido. Verifique que su carrito no esté vacío.");

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerPedidosPaginadosUsuario(int? estadoId, DateTime? fecha, int pagina)
        {
            try
            {
                var resultado = await _pedidoFlujo.ObtenerPedidosAsync(GetUsuarioId(), estadoId, pagina, fecha, 10);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "EMPRENDEDOR,ADMIN")]
        [HttpPut]
        public async Task<IActionResult> ActualizarEstadoPedido(Guid pedidoId)
        {
            int usuarioId = GetUsuarioId();
            try
            {
                var emprendimiento = await _pedidoFlujo.obtenerEmprendimientoPedido(pedidoId);

                if (usuarioId != emprendimiento.UsuarioId || emprendimiento.EstadoId == 0)
                    return Unauthorized();

                if (emprendimiento == null)
                    return NoContent();

                PedidoResponse pedido = await _pedidoFlujo.obtenerPedido(pedidoId);

                if (pedido == null)
                    return NoContent();

                int estado;
                if (pedido.Estado_id == 5)
                    estado = 6;
                else if (pedido.Estado_id == 6)
                    estado = 7;
                else
                    return StatusCode(500, "El pedido no tiene un estado válido");

                Guid resultado = await _pedidoFlujo.ActualizarEstadoPedido(pedidoId, estado);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize(Roles = "EMPRENDEDOR,ADMIN")]
        [HttpGet("Emprendimiento")]
        public async Task<IActionResult> ObtenerPorEmprendimiento([FromQuery] string cedulaJuridica, [FromQuery] int page)
        {
            try
            {
                int usuarioId = GetUsuarioId();
                var emprendimiento = await _emprendimientoFlujo.GetEmprendimientoPorId(cedulaJuridica);

                if (emprendimiento.UsuarioId != usuarioId || emprendimiento.EstadoId == 0)
                    return Unauthorized();

                if (emprendimiento == null)
                    return NoContent();

                var resultado = await _pedidoFlujo.ObtenerPedidosPorEmprendimiento(
                    emprendimiento.EmprendimientoId, null, page, null, 10);

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}