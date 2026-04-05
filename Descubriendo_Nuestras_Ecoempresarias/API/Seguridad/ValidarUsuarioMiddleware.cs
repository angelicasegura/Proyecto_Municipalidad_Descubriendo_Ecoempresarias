using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Abstracciones.Interfaces.Flujo;
using System.Threading.Tasks;

namespace API.Seguridad
{
    public class ValidarUsuarioMiddleware
    {
        private readonly RequestDelegate _next;

        public ValidarUsuarioMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var user = context.User;

            if (user?.Identity != null && user.Identity.IsAuthenticated)
            {
                try
                {
                    System.Diagnostics.Debug.WriteLine("🔥 Middleware ejecutándose");
                    var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier) ?? user.FindFirst("id");
                    var rolClaim = user.FindFirst(ClaimTypes.Role);

                    if (userIdClaim == null)
                    {
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        await context.Response.WriteAsync("Token inválido: no contiene ID");
                        return;
                    }

                    int userId = int.Parse(userIdClaim.Value);

                   
                    var usuarioFlujo = context.RequestServices.GetRequiredService<IUsuarioFlujo>();

                    var usuarioDb = await usuarioFlujo.ObtenerUsuario(userId);

                    if (usuarioDb == null || !(usuarioDb.IdEstado == 1))
                    {
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        await context.Response.WriteAsync("Usuario no existe o está inactivo");
                        return;
                    }

                    if (rolClaim != null && usuarioDb.Rol != rolClaim.Value)
                    {
                        context.Response.StatusCode = StatusCodes.Status403Forbidden;
                        await context.Response.WriteAsync("El rol ha cambiado o no es válido");
                        return;
                    }
                }
                catch
                {
                    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                    await context.Response.WriteAsync("Error validando usuario");
                    return;
                }
            }

                await _next(context);
        }
    }
}
