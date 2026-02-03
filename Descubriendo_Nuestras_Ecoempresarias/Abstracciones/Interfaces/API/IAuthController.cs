using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.API
{
    public interface IAuthController
    {
        Task<IActionResult> RegistrarUsuario();
        Task<IActionResult> IniciarSesion(string email, string contrasena);


    }
}
