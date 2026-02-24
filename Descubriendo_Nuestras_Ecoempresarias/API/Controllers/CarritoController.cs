using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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
            try
            {
                var result = await _carritoFlujo.Agregar(GetUsuarioId(), request);
                if(result == 0)
                    return BadRequest("No se pudo agregar al carrito. Verifique los datos e intente nuevamente.");
                return Ok(result);
            }catch (System.Exception ex)
            {
                return StatusCode(500, $"Error al agregar al carrito: {ex.Message}");
            }

        [HttpGet("MiCarrito")]
        public async Task<IActionResult> MiCarrito([FromQuery] int emprendimientoId)
        {
            var result = await _carritoFlujo.ObtenerMiCarrito(GetUsuarioId(), emprendimientoId);
            return Ok(result);
        }

        [HttpPut("ActualizarCantidad")]
        public async Task<IActionResult> ActualizarCantidad([FromBody] CarritoActualizarRequest request)
        {
            var result = await _carritoFlujo.ActualizarCantidad(GetUsuarioId(), request);
            return Ok(result);
        }

        [HttpDelete("Eliminar")]
        public async Task<IActionResult> Eliminar([FromBody] CarritoEliminarRequest request)
        {
            var result = await _carritoFlujo.Eliminar(GetUsuarioId(), request);
            return Ok(result);
        }
    }
}