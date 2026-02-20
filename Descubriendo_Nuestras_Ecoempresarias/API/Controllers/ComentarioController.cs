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

        [HttpPost]

        public async Task<IActionResult> Agregar([FromBody]ComentarioRequest comentario)
        {
            var resultado = await _comentarioFlujo.Agregar(comentario);
            return Ok(resultado);
        }


    }
}
