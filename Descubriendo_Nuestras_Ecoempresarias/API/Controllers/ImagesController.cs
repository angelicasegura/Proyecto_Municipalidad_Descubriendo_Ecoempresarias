using Abstracciones.Interfaces.Flujo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/Images")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IDocumentoFlujo _documentoFlujo;
        private readonly IConfiguration _configuration;

        public ImagesController(IDocumentoFlujo documentoFlujo, IConfiguration configuration)
        {
            _documentoFlujo = documentoFlujo;
            _configuration = configuration;
        }

        [HttpGet("Buscar/{id}/{nombreArchivo}")]
        [AllowAnonymous]
        public async Task<IActionResult> ObtenerImagen(string nombreArchivo, int id)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(nombreArchivo))
                    return BadRequest("Nombre inválido.");
                string carpeta = "";
                nombreArchivo = Path.GetFileName(nombreArchivo);
                if (id == 1)
                {
                     carpeta = _configuration["Carpetas:Emprendimientos"];
                }
                if (id == 2)
                {
                     carpeta = _configuration["Carpetas:Usuarios"];
                }
                if (id == 3)
                {
                     carpeta = _configuration["Carpetas:Productos"];
                }
                else
                {
                    return NotFound("Imagen no encontrada.");
                }
                    var imagenBytes = await _documentoFlujo.EncontrarImagen(nombreArchivo, carpeta);
                if (imagenBytes == null)
                    return NotFound("Imagen no encontrada.");

                string contentType = _documentoFlujo.ObtenerContentType(nombreArchivo);
                return File(imagenBytes, contentType);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener imagen: {ex.Message}");
            }
        }



    }
}
