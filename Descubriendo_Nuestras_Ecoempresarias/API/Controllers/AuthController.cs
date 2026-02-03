using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using API.Seguridad;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase, IAuthController
    {
        private IUsuarioFlujo _usuarioFlujo;
        private ILogger<IUsuarioController> _logger;
        private IRolesFlujo _rolesFlujo;
        private TokenProvider _tokenProvider;
        public AuthController(IUsuarioFlujo usuarioFlujo, ILogger<IUsuarioController> logger, IRolesFlujo rolesFlujo, TokenProvider tokenProvider)
        {
            _usuarioFlujo = usuarioFlujo;
            _logger = logger;
            _rolesFlujo = rolesFlujo;
            _tokenProvider = tokenProvider;
        }

        [HttpPost("/login")]
        public async Task<IActionResult> IniciarSesion(Abstracciones.Modelos.Autenticacion.LoginRequest loginRequest)
        {
            
            loginRequest.Contrasena = HashGenerator.HashHelper.GenerarHashSHA256(loginRequest.Contrasena);
            var resultado = await _usuarioFlujo.InicioSesionUsuario(loginRequest.Email,loginRequest.Contrasena);
            if (resultado == null)
                return Unauthorized("Credenciales inválidas");
            if (resultado.IdEstado != 1)
                return Unauthorized("Usuario inactivo");
            var rol = await _rolesFlujo.ObtenerRolPorId(resultado.IdRol);
            //AQUI VA A IR LA LOGICA DE LOS PERMISOS Y ESO DE MOMENTO ESTA ASI 
            UsuarioAutenticado usuario = new UsuarioAutenticado
            {
                IdUsuario = resultado.IdUsuario,
                Nombre = resultado.Nombre,
                Rol = rol.Nombre
            };
            var token = _tokenProvider.CreateToken(usuario);

            var respuesta = new Abstracciones.Modelos.Autenticacion.LoginResponse
            {
                IdUsuario = resultado.IdUsuario,
                Nombre = resultado.Nombre,
                Rol = rol.Nombre,
                Token = token
            };
            return Ok(respuesta);
        }

        [HttpPost]
        public Task<IActionResult> RegistrarUsuario()
        {
            throw new NotImplementedException();
        }


        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            return Ok(new
            {
                id = int.Parse(User.FindFirst("id")!.Value),
                nombre = User.FindFirst("nombre")!.Value,
                rol = User.FindFirst("rol")!.Value
            });
        }

        
    }
}
