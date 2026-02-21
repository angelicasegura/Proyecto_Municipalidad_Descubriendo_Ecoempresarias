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
using System.Linq;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/comentarios")]
    [ApiController]
    //agregar verificaciones y todo tipo si un uusario existe o no

    public class ComentarioController : ControllerBase
    {
        private IComentarioFlujo _comentarioFlujo;


        public ComentarioController(IComentarioFlujo comentarioFlujo)
        {
            _comentarioFlujo = comentarioFlujo;

        }


        [HttpPost("emprendimiento/{Emprendimiento_id}")]
        public async Task<IActionResult> Agregar(
     int Emprendimiento_id,
     [FromBody] ComentarioRequest comentario)
        {
            // Buscar el claim del usuario
            var usuarioIdClaim = User.Claims.FirstOrDefault();
      

            if (usuarioIdClaim == null)
            {
                return Unauthorized("Usuario no encontrado en el token");
            }

            var usuarioId = int.Parse(usuarioIdClaim.Value);

            comentario.Usuario_id = usuarioId;
            comentario.Emprendimiento_id = Emprendimiento_id;

            var resultado = await _comentarioFlujo.Agregar(comentario);

            return Ok(resultado);
        }




        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var usuarioIdClaim = User.FindFirst("id");

            if (usuarioIdClaim == null)
                return Unauthorized("Usuario no encontrado en token");

            var usuarioId = int.Parse(usuarioIdClaim.Value);

            var usuarioIdComentario = await _comentarioFlujo.ObtenerUsuarioIdPorComentario(id);

            if (usuarioIdComentario == null)
                return NotFound();

            var rol = User.FindFirst("rol")?.Value;

            if (usuarioIdComentario != usuarioId && rol != "ADMIN")
                return Forbid();

            await _comentarioFlujo.Eliminar(id);

            return Ok();
        }

        [HttpGet("emprendimiento/{Emprendimiento_id}")]
        public async Task<IActionResult> ObtenerPorEmprendedor(int Emprendimiento_id)
        {
            var resultado = await _comentarioFlujo.ObtenerPorEmprendedor(Emprendimiento_id);
            return Ok(resultado);
        }
        


    }
}
