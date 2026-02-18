using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using API.Helpers;
using Azure.Core;
using Flujo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase, IProductoController
    {
        private readonly IProductoFlujo _productoFlujo;
        private ILogger<IUsuarioController> _logger;
        private readonly GuardarImagenes _guardarImagen;
        private readonly IConfiguration _configuration;
        private readonly IDocumentoFlujo _documentoFlujo;

        public ProductoController(IProductoFlujo productoFlujo, ILogger<IUsuarioController> logger, GuardarImagenes guardarImagen, IConfiguration configuration, IDocumentoFlujo documentoFlujo)
        {
            _productoFlujo = productoFlujo;
            _logger = logger;
            _guardarImagen = guardarImagen;
            _configuration = configuration;
            _documentoFlujo = documentoFlujo;
        }

        [Authorize(Roles = "EMPRENDEDOR")]
        [HttpPost("CrearProducto")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AgregarProducto([FromForm] ProductoRequest producto)
        {
            try
            {
                //implementar que busque antes de crear, pero se pone despues
                string rutaBase = _configuration["LinksDocument:DocumentosLinkaAle"];
                string carpeta = _configuration["Carpetas:Productos"];

                if (producto.Imagen != null)
                {
                    string rutaImagen = await _guardarImagen.GuardarImagen(rutaBase, producto.Imagen, carpeta);
                    if (rutaImagen != null)
                    {
                        producto.Ruta_Imagen = rutaImagen;
                    }
                }


                var resultado = await _productoFlujo.AgregarProducto(producto);
                return Ok(resultado);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al crear producto es: {ex.Message}");
            }
        }

        [HttpPut("EditarProducto/{id}")]
        public async Task<IActionResult> EditarProducto(Guid id, ProductoRequest producto)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("EliminarProducto/{id}")]
        public async Task<IActionResult> ElimnarProducto(Guid id)
        {
            throw new NotImplementedException();
        }


        [HttpGet("ObtenerProducto/{id}")]
        public async Task<IActionResult> ObtenerProducto(Guid id)
        {
            var resultado = await _productoFlujo.ObtenerProducto(id);

            if (resultado == null)
            {
                return NoContent();
            }
            return Ok(resultado);
        }

        [HttpGet("ObtenerProductos")]
        public async Task<IActionResult> ObtenerProductos([FromQuery] Guid? categoria_id,
                                                          [FromQuery] string? nombre)
        {
            try
            {
                var resultado = await _productoFlujo.ObtenerProductos(categoria_id, nombre);
                string carpeta = _configuration["Carpetas:Productos"];
                
                if (!resultado.Any())
                    return NoContent();

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener productos es: {ex.Message}");
            }
        }
    }
}
