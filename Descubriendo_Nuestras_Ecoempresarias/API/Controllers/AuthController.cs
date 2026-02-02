using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase, IAuthController
    {
        private IUsuarioFlujo _usuarioFlujo;
        private ILogger<IUsuarioController> _logger;

        public AuthController(IUsuarioFlujo usuarioFlujo, ILogger<IUsuarioController> logger)
        {
            _usuarioFlujo = usuarioFlujo;
            _logger = logger;
        }

        [HttpGet("inicio_sesion")]
        public async Task<IActionResult> IniciarSesion(string email, string contrasena)
        {
            var resultado = await _usuarioFlujo.InicioSesionUsuario(email, contrasena);

            //AQUI VA A IR LA LOGICA DE LOS PERMISOS Y ESO DE MOMENTO ESTA ASI 

            return Ok(resultado);
        }

        [HttpPost]
        public Task<IActionResult> RegistrarUsuario()
        {
            throw new NotImplementedException();
        }
    }
}
