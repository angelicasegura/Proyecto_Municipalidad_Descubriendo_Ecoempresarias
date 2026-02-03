using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    public class Autenticacion
    {

        public class LoginRequest
        {
            public string Email { get; set; }
            public string Contrasena { get; set; }
        }


        public class LoginResponse
        {
            public int IdUsuario { get; set; }
            public string Nombre { get; set; }
            public string Rol { get; set; }
            public string Token { get; set; }
        }

    }
}
