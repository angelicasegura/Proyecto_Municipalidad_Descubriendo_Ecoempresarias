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
    }
}
