using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Abstracciones.Modelos.Pagination;
using API.Seguridad;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace API.Controllers
{
    [Route("api/Usuarios")]
    [ApiController]
    //agregar verificaciones y todo tipo si un uusario existe o no que si se inactiva un usuario
    // se inactive todo lo relacionado a el tipo emprendimeintos, productos, inventario etc

    public class UsuarioController : ControllerBase, IUsuarioController
    {
        private IUsuarioFlujo _usuarioFlujo;
        private ILogger<IUsuarioController> _logger;
        private IEmprendimientoFlujo _emprendimientoFlujo;

        public UsuarioController(IUsuarioFlujo usuarioFlujo, ILogger<IUsuarioController> logger, IEmprendimientoFlujo emprendimientoFlujo)
        {
            _usuarioFlujo = usuarioFlujo;
            _logger = logger;
            _emprendimientoFlujo = emprendimientoFlujo;
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


        [Authorize(Roles = "ADMIN,USUARIO")]
        [HttpPut("EditEstado/{id}")]
        public async Task<IActionResult> EditarEstadoUsuarioAdmin(int id)
        {
            try
            {
                var idClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
                int usuarioId = int.Parse(idClaim ?? "0");
                string rolDelToken = User.Claims.FirstOrDefault(c => c.Type == "rol")?.Value;

                int estadoCambio = 0;



                var busqueda = await _usuarioFlujo.ObtenerUsuario(id);

                if (usuarioId != busqueda.IdUsuario && rolDelToken != "ADMIN")
                {

                    return Forbid("No tienes permiso para editar un perfil que no es el tuyo.");
                }

                if (busqueda == null)
                {
                    return NotFound($"No se encontró el usuario con ID {id}.");
                }

                if (busqueda.IdEstado == 0)
                {
                    estadoCambio = 1;
                }
                

                // 2. Llamada al flujo/DA
                var filasAfectadas = await _usuarioFlujo.ActualizarEstadoDeUsuario(id,estadoCambio);
                var emprendimientosInactivos = await _emprendimientoFlujo.InactivarOActivarEmprendimientosDeUsuario(id,estadoCambio);

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

        [Authorize(Roles = "ADMIN")]
        [HttpPost("AgregarAdmin")]
        public async Task<IActionResult> AgregarUsuarioAdmin([FromBody] UsuarioRequest usuario)
        {
            try
            {
                // Verificar si el usuario ya existe
                var busqueda = await _usuarioFlujo.ObtenerUsuario(usuario.IdUsuario);
                if (busqueda != null)
                {
                    return NotFound($"Usuario ya existente");
                }

                
                usuario.Contrasena = HashGenerator.HashHelper.GenerarHashSHA256("ContrasenaDefault1234_");
                //Cambiar a que genere una contrasena aleatoria y enviarla por correo

                var filasAfectadas = await _usuarioFlujo.Agregar(usuario);

                if (filasAfectadas > 0)
                {
                    return Ok(new { message = "Usuario agregado exitosamente." });
                }
                else
                {
                    return StatusCode(500, "No se pudo agregar el usuario.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno al intentar agregar el usuario: {ex.Message}");
            }
        }

        [HttpGet("10Empresarias")]
        public async Task<IActionResult> Obtener10Empresarias()
        {
            try
            {
                var empresarias =await _usuarioFlujo.Obtener10EmprendedorasAsync();
                return Ok(empresarias);

            }catch(Exception ex)
            {
                return StatusCode(500, $"Error interno al solicitar empresarias: {ex.Message}");
            }
        }
    }
}
