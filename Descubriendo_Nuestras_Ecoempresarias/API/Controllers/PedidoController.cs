using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Flujo;
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

        public PedidoController(IPedidoFlujo pedidoFlujo)
        {
            _pedidoFlujo = pedidoFlujo;
        }
        
        [HttpPost]
        public async Task<IActionResult> AgregarPedido([FromBody] PedidoRequest pedido)
        {
            try
            {
                int usuarioId = pedido.UsuarioId;

                var resultado = await _pedidoFlujo.AgregarPedido(usuarioId, pedido);

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerPedidosPaginadosUsuario(int? estadoId,DateTime? fecha, int pagina)
        {
            try
            {
                var idClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
                int usuarioId = int.Parse(idClaim ?? "0");

                var resultado = await _pedidoFlujo.ObtenerPedidosAsync(usuarioId, estadoId, pagina,fecha, 10);
                //agregar validacion de usuario
                return Ok(resultado);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Authorize(Roles ="EMPRENDEDOR,ADMIN")]
        [HttpPut]
        public async Task<IActionResult> ActualizarEstadoPedido(Guid pedidoId)
        {
            var idClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
            int usuarioId = int.Parse(idClaim ?? "0");

            try
            {
                Abstracciones.Modelos.Emprendimiento.EmprendimientoResponse emprendmiento = await _pedidoFlujo.obtenerEmprendimientoPedido(pedidoId);


                if (usuarioId != emprendmiento.UsuarioId || emprendmiento.EstadoId==0)
                {
                    return Unauthorized();
                }
                if (emprendmiento == null)
                {
                    return NoContent();
                }
                int estado = 6;
                PedidoResponse pedido = await _pedidoFlujo.obtenerPedido(pedidoId);
                if (pedido == null)
                {
                    return NoContent();
                }
                if(pedido.Estado_id == 5)
                {
                    Guid resultado = await _pedidoFlujo.ActualizarEstadoPedido(pedidoId,estado);
                    return Ok(resultado);
                }else if (pedido.Estado_id == 6)
                {
                    estado = 7;
                    Guid resultado = await _pedidoFlujo.ActualizarEstadoPedido(pedidoId, estado);
                    return Ok(resultado);
                }
                else
                {
                    return StatusCode(500, "El pedido no tiene un estado valido");

                }
           
            }
            catch (Exception ex)
            {
                return StatusCode(500,ex.Message);
            }

        }
    }
}
