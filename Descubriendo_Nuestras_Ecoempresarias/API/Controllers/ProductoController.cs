using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using API.Helpers;
using Azure.Core;
using DA;
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
        private readonly IInventarioFlujo _inventarioFlujo;

        public ProductoController(IProductoFlujo productoFlujo, ILogger<IUsuarioController> logger, GuardarImagenes guardarImagen, IConfiguration configuration, IDocumentoFlujo documentoFlujo, IInventarioFlujo inventarioFlujo)
        {
            _productoFlujo = productoFlujo;
            _logger = logger;
            _guardarImagen = guardarImagen;
            _configuration = configuration;
            _documentoFlujo = documentoFlujo;
            _inventarioFlujo = inventarioFlujo;
        }

        [Authorize(Roles = "EMPRENDEDOR")]
        [HttpPost("CrearProducto")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AgregarProducto([FromForm] ProductoRequest producto)
        {
            try
            {
                //implementar que busque antes de crear, pero se pone despues
                string rutaBase = _configuration["LinksDocument:DocumentosLink"];
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

                //    Inventario inventario = new Inventario
                //    {
                //        ProductoId = resultado,
                //        CantidadActual = 0,
                //        CantidadMinima = 10

                //    };
                //    await _inventarioFlujo.AgregarInventario(inventario);
                //    return Ok(resultado);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al crear producto es: {ex.Message}");
            }
        }

        [HttpPut("EditarProducto/{id}")]
        public async Task<IActionResult> EditarProducto([FromRoute] Guid id, [FromForm] ProductoRequest producto)
        {
            try
            {
                //implementar que busque antes de crear, pero se pone despues
                string rutaBase = _configuration["LinksDocument:DocumentosLink"];
                string carpeta = _configuration["Carpetas:Productos"];

                if (producto.Imagen != null)
                {
                    string rutaImagen = await _guardarImagen.GuardarImagen(rutaBase, producto.Imagen, carpeta);

                    if (rutaImagen != null)
                    {
                        producto.Ruta_Imagen = rutaImagen;
                    }
                }

                    var resultado = await _productoFlujo.EditarProducto(id, producto);
                    return Ok(resultado);
                

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al editar producto es: {ex.Message}");
            }

        }

        [HttpPut("InactivarProducto/{id}")]
        public async Task<IActionResult> ElimnarProducto([FromRoute] Guid id)
        {
            try
            {
                var resultado = await _productoFlujo.ElimnarProducto(id);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al eliminar producto es: {ex.Message}");
            }
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
                                                          [FromQuery] string? nombre,
                                                          [FromQuery] int? emprendimiento_id)
        {
            try
            {
                var resultado = await _productoFlujo.ObtenerProductos(categoria_id, nombre, emprendimiento_id, 1);
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

        private async Task<bool> VerificarProductoExiste(Guid Id)
        {
            var resultadoValidacion = false;

            var prodcutoExiste = await _productoFlujo.ObtenerProducto(Id);
            if (prodcutoExiste != null)
                resultadoValidacion = true;

            return resultadoValidacion;

        }
    }
}
