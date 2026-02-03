using Abstracciones.Modelos;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace API.Seguridad
{
    internal sealed class TokenProvider
    {
        private readonly IConfiguration _configuration;

        public TokenProvider(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string CreateToken(UsuarioAutenticado usuario)
        {
            // Clave secreta
            var secret = _configuration["Jwt:Secret"]
                ?? throw new InvalidOperationException("JWT Secret no configurado.");

            var keyBytes = Encoding.UTF8.GetBytes(secret);
            if (keyBytes.Length < 16)
            {
                using var sha = SHA256.Create();
                keyBytes = sha.ComputeHash(keyBytes);
            }

            var key = new SymmetricSecurityKey(keyBytes);
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //  Claims 
            var claims = new[]
            {
                new Claim("id", usuario.IdUsuario.ToString()),
                new Claim("nombre", usuario.Nombre),
                new Claim("rol", usuario.Rol)
            };


            //  Token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = credentials
            };

            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateToken(tokenDescriptor);

            return handler.WriteToken(token);
        }
    }
}
