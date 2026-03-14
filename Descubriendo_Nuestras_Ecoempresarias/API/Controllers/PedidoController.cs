using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
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
        public async Task<IActionResult> AgregarPedido([FromBody] Pedido pedido)
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
    }
}
