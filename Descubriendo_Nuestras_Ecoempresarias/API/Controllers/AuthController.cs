using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Interfaces.Servicios;
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
        private IEmailService _emailService;
        private TokenProvider _tokenProvider;
        public AuthController(IUsuarioFlujo usuarioFlujo, ILogger<IUsuarioController> logger, IRolesFlujo rolesFlujo, TokenProvider tokenProvider, IEmailService emailService)
        {
            _usuarioFlujo = usuarioFlujo;
            _logger = logger;
            _rolesFlujo = rolesFlujo;
            _tokenProvider = tokenProvider;
            _emailService = emailService;
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

        [HttpPost("olvido-contrasena")]
        public async Task<IActionResult> OlvidoContrasena([FromBody] ForgotPassword forgotPassword)
        {
            var user = await _usuarioFlujo.BuscarUsuarioPorEmail(forgotPassword.Email);

            if (user == null)
            {
                
                return Ok(new { message = "Si el correo es correcto, recibirás un email" });
            }

            // Generar contraseña temporal
            string tempPassword = GenerateTemporaryPassword();

            user.Contrasena = tempPassword;
            await _usuarioFlujo.Editar(user.IdUsuario, user);

            // Enviar email
            string emailBody = $@"
            <h2>Recuperación de Contraseña</h2>
            <p>Tu contraseña temporal es: <strong>{tempPassword}</strong></p>
            <p>Por favor, cámbiala después de iniciar sesión.</p>
        ";

            await _emailService.SendEmailAsync(user.Email, "Recuperación de Contraseña", emailBody);

            return Ok(new { message = "Si el correo existe, recibirás un email" });
        }


        private string GenerateTemporaryPassword()
        {
            const string chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, 8)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
