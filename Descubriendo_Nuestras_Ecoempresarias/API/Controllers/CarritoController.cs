using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,Cliente")]
    public class CarritoController : ControllerBase
    {
        private readonly ICarritoFlujo _carritoFlujo;

        public CarritoController(ICarritoFlujo carritoFlujo)
        {
            _carritoFlujo = carritoFlujo;
        }

        private int GetUsuarioId() => int.Parse(User.FindFirst("id")!.Value);

        [HttpPost("Agregar")]
        public async Task<IActionResult> Agregar([FromBody] CarritoAgregarRequest request)
        {
            var result = await _carritoFlujo.Agregar(GetUsuarioId(), request);
            return Ok(result);
        }

        [HttpGet("MiCarrito")]
        public async Task<IActionResult> MiCarrito()
        {
            var result = await _carritoFlujo.ObtenerMiCarrito(GetUsuarioId());
            return Ok(result);
        }

        [HttpPut("ActualizarCantidad")]
        public async Task<IActionResult> ActualizarCantidad([FromBody] CarritoActualizarRequest request)
        {
            var result = await _carritoFlujo.ActualizarCantidad(GetUsuarioId(), request);
            return Ok(result);
        }

        [HttpDelete("Eliminar/{carritoId}")]
        public async Task<IActionResult> Eliminar(int carritoId)
        {
            var result = await _carritoFlujo.Eliminar(GetUsuarioId(), carritoId);
            return Ok(result);
        }
    }
}