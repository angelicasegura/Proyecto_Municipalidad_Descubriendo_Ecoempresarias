using Abstracciones.Interfaces.Flujo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasProductosController : ControllerBase
    {
        private readonly ICategoriaProductosFlujo _categoriaProductoFlujo;

        public CategoriasProductosController(ICategoriaProductosFlujo categoriaProductoFlujo)
        {
            _categoriaProductoFlujo = categoriaProductoFlujo;
        }


        [HttpGet("Obtener")]
        public async Task<IActionResult> ObtenerCategoriasProductos()
        {
            try
            {
                var resultado = await _categoriaProductoFlujo.ObtenerCategoriasProductos();
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener categorias de productos: {ex.Message}");
            }
        }
    }
}
