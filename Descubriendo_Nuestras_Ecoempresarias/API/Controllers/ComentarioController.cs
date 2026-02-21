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



        [HttpDelete("{Comentario_id}")]
        public async Task<int>Eliminar (int Comentario_id)
        {
           var resultado = await _comentarioFlujo.Eliminar(Comentario_id);
            return resultado;
        }

        [HttpGet("emprendimiento/{Emprendimiento_id}")]
        public async Task<IActionResult> ObtenerPorEmprendedor(int Emprendimiento_id)
        {
            var resultado = await _comentarioFlujo.ObtenerPorEmprendedor(Emprendimiento_id);
            return Ok(resultado);
        }
        


    }
}
