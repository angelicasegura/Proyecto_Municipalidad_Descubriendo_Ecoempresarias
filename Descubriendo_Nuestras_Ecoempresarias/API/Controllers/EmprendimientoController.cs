using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using API.Helpers;
using DA;
using Flujo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using static Abstracciones.Modelos.Emprendimiento;

namespace API.Controllers
{

    [Route("api/emprendimientos")]
    [ApiController]
    public class EmprendimientoController : ControllerBase, IEmprendimientoController
    {

        //TODO: Implementar que cuando se actualiza usuario, ya sea se le quita el rol emmprendedor o se inactive, que el emprendimiento relacionado se inactive tambien


        private readonly IEmprendimientoFlujo _emprendimientoFlujo;
        private readonly GuardarImagenes _guardarImagen;
        private readonly IConfiguration _configuration;
        private readonly IDocumentoFlujo _documentoFlujo;
        private readonly IUsuarioFlujo _usuarioFlujo;

        public EmprendimientoController(IEmprendimientoFlujo emprendimientoFlujo, GuardarImagenes guardarImagen, IConfiguration configuration, IDocumentoFlujo documentoFlujo, IUsuarioFlujo usuarioFlujo)
        {
            _emprendimientoFlujo = emprendimientoFlujo;
            _guardarImagen = guardarImagen;
            _configuration = configuration;
            _documentoFlujo = documentoFlujo;
            _usuarioFlujo = usuarioFlujo;
        }

        [HttpGet("paginados")]
        public async Task<IActionResult> GetEmprendimientosPaginados(
        [FromQuery] int page = 1,
        [FromQuery] int limit = 10,
        [FromQuery] string? search = null,
        [FromQuery] int? tipoActividadId = null,
        [FromQuery] int? estadoId = null)
        {
            try
            {
                string carpeta = _configuration["Carpetas:Emprendimientos"];

                if (page <= 0) page = 1;
                if (limit <= 0 || limit > 100) limit = 10;

                var resultado = await _emprendimientoFlujo.GetEmprendimientosPaginadosAsync(
                    page,
                    limit,
                    search,
                    tipoActividadId,
                    estadoId
                );

                

                var totalRecord = resultado.TotalCount;
                var totalPages = (int)Math.Ceiling((double)totalRecord / limit);
                if (resultado == null || !resultado.Items.Any())
                {
                    return Ok(new
                    {
                        items = new List<EmprendimientoResponse>(),
                        totalCount = 0,
                        totalPages = 0,
                        currentPage = page,
                        pageSize = limit
                    });
                }
               
                return Ok(new
                {
                    items = resultado.Items,
                    totalCount = resultado.TotalCount,
                    totalPages = totalPages,
                    currentPage = page,
                    pageSize = limit
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al obtener emprendimientos: {ex.Message}");
            }
        }


        [Authorize(Roles = "ADMIN")]
        [HttpPost("crearAdmin")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> crearEmprendimientoAdmin([FromForm] EmprendimientoRequest request)
        {
            try
            {
                //implementar que busque antes de crear, pero se pone despues
                string rutaBase = _configuration["LinksDocument:DocumentosLink"];
                string carpeta = _configuration["Carpetas:Emprendimientos"];
                UsuarioResponse usuario = await _usuarioFlujo.ObtenerUsuario(request.UsuarioId);
                if(usuario==null || usuario.IdEstado == 0)
                {
                    return BadRequest("Usuario inexistente o inactivo");
                }
                if (await verificarSiEmprendimientoYaExiste(request.CedulaJuridica))
                {
                    return BadRequest("Emprendimiento ya existente");
                }
                if (request.Imagen != null) { 
                string rutaImagen = await _guardarImagen.GuardarImagen(rutaBase,request.Imagen, carpeta);
                    if (rutaImagen != null)
                    {
                        request.Ruta_Imagen_Logo = rutaImagen;
                    }
                }
                if (usuario.IdRol != 2)
                {
                    usuario.IdRol = 2;
                    var UpdateUser = await _usuarioFlujo.EditarAdmin(usuario.IdUsuario, usuario);
                }
                
                
                var resultado = await _emprendimientoFlujo.CrearEmprendimientoAsync(request);
                return Ok(resultado);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al crear emprendimientos: {ex.Message}");
            }

        }


        [HttpGet("Obtener")]
        public async Task<IActionResult> obtenerEmprendimientoPorId([FromQuery] string cedulaJuridica)
        {
            try
            {
                if(cedulaJuridica == null)
                {
                    return BadRequest("Cedula Juridica no indicada");
                }
                var emprendimiento = await _emprendimientoFlujo.GetEmprendimientoPorId(cedulaJuridica);


                return Ok(emprendimiento);
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }



        [HttpGet("Obtener/Cedula")]
        public async Task<IActionResult> obtenerEmprendimientosPorCedulaUsuario([FromQuery] int cedula)
        {
            try
            {
                if (cedula == null)
                {
                    return BadRequest("Cedula no indicada");
                }
                var emprendimientos = await _emprendimientoFlujo.GetEmprendimientoPorCedulaUsuario(cedula,1);


                return Ok(emprendimientos);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        [HttpGet("ObtenerPorUsuario/{usuarioId}")]
        public async Task<IActionResult> ObtenerEmprendimientoPorUsuario([FromRoute] int usuarioId)
        {
            try
            {
                var resultado = await _emprendimientoFlujo.ObtenerEmprendimientoPorUsuario(usuarioId);
                if (resultado == null)
                    return NoContent();
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("EditarEmprendimiento/{id}")]
        public async Task<IActionResult> EditarEmprendimiento([FromRoute] int id, [FromForm] EmprendimientoRequest emprendimiento)
        {
            //implementar que busque antes de crear, pero se pone despues
            string rutaBase = _configuration["LinksDocument:DocumentosLink"];
            string carpeta = _configuration["Carpetas:emprendimientos"];

            if (emprendimiento.Imagen != null)
            {
                string rutaImagen = await _guardarImagen.GuardarImagen(rutaBase, emprendimiento.Imagen, carpeta);

                if (rutaImagen != null)
                {
                    emprendimiento.Ruta_Imagen_Logo = rutaImagen;
                }
            }
            try
            {
                var resultado = await _emprendimientoFlujo.EditarEmprendimiento(id, emprendimiento);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al editar empredimiento es: {ex.Message}");
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("EliminarEmprendimiento/{id}")]
        public async Task<IActionResult> EliminarEmprendimeinto([FromRoute] int id)
        {
            try
            {
                var resultado = await _emprendimientoFlujo.EliminarEmprendimeinto(id);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, $"Error interno al eliminar emprendimiento es: {ex.Message}");
            }
        }


        private async Task<bool> verificarSiEmprendimientoYaExiste(string CedulaJuridica)
        {

            return await _emprendimientoFlujo.VerificarExistenciaEmprendimiento(CedulaJuridica);
        }
    }
}
