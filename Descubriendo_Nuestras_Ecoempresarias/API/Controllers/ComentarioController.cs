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

        [HttpPost("emprendimiento/{Empredimiento_id}")]

        public async Task<IActionResult> Agregar(int Empredimiento_id, [FromBody] ComentarioRequest comentario)
        {
            var usuarioId = int.Parse(User.FindFirst("Usuario_id").Value);
            comentario.Usuario_id = usuarioId;
            comentario.Emprendimiento_id = Empredimiento_id;
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
