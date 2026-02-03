using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Abstracciones.Modelos.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace API.Controllers
{
    [Route("api/Usuarios")]
    [ApiController]
    public class UsuarioController : ControllerBase, IUsuarioController
    {
        private IUsuarioFlujo _usuarioFlujo;
        private ILogger<IUsuarioController> _logger;

        public UsuarioController(IUsuarioFlujo usuarioFlujo, ILogger<IUsuarioController> logger)
        {
            _usuarioFlujo = usuarioFlujo;
            _logger = logger;
        }

        [HttpPost]

        public Task<IActionResult> Agregar(UsuarioRequest usuario)
        {
            throw new NotImplementedException();
        }


        [HttpPut("{Id}")]
        public Task<IActionResult> Editar(int Id, UsuarioRequest usuario)
        {
            throw new NotImplementedException();
        }


        [HttpDelete("{Id}")]
        public Task<IActionResult> Eliminar(int Id)
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        public Task<IActionResult> Obtener()
        {
            throw new NotImplementedException();
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> ObtenerUsuario(int Id)
        {
            var resultado = await _usuarioFlujo.ObtenerUsuario(Id);

            return Ok(resultado);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("pagination")]
        public async Task<IActionResult> GetUsuariosPaginadosAsync([FromQuery] int page = 1,
                                                                                    [FromQuery] int limit = 10,
                                                                                    [FromQuery] string? search = null,
                                                                                    [FromQuery] int? roleId = null)
        {
            try
            {
                var resultado = await _usuarioFlujo.GetUsuariosPaginadosAsync(page, limit, search, roleId);

                var totalRecord = resultado.TotalCount;
                var totalPages = (int)Math.Ceiling((double)totalRecord / limit);

                return Ok(new
                {
                    items = resultado.Items,
                    totalCount = totalRecord,
                    totalPages = totalPages,
                    currentPage = page,
                    pageSize = limit
                });

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno al obtener los usuarios paginados.");
            }
        }
        [Authorize(Roles = "ADMIN")]
        [HttpPut("EditAdmin/{id}")]
        public async Task<IActionResult> EditarUsuarioAdmin(int id, [FromBody] UsuarioResponse usuario)
        {
            try
    {
                var busqueda = await _usuarioFlujo.ObtenerUsuario(id);
                if(busqueda == null)
                {
                    return NotFound($"No se encontró el usuario con ID {id}.");
                }   
                if (id != usuario.IdUsuario)
                {
                    return BadRequest("El ID del usuario no coincide con los datos proporcionados.");
                }

                // 2. Llamada al flujo/DA
                // Nota: Asumimos que tu DA devuelve el número de filas afectadas
                var filasAfectadas = await _usuarioFlujo.EditarAdmin(id, usuario);

                if (filasAfectadas > 0)
                {
                    return Ok(new { message = "Usuario actualizado exitosamente." });
                }
                else
                {
                    return NotFound($"Sucedio un error inesperado");
                }
            }
                    catch (Exception ex)
                    {
                                
                                return StatusCode(500, $"Error interno al intentar actualizar el usuario: {ex.Message}");
                            }
        }
    }
}
