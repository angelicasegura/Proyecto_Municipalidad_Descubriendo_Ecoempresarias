using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
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
    }
}
