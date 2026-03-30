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
        public async Task<IActionResult> ObtenerPedidosPaginadosUsuario(int? estadoId, int pagina)
        {
            try
            {
                var idClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
                int usuarioId = int.Parse(idClaim ?? "0");

                var resultado = await _pedidoFlujo.ObtenerPedidosAsync(usuarioId, estadoId, pagina, 10);
                return Ok(resultado);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
