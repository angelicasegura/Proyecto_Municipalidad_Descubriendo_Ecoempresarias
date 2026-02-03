using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    public class UsuariosBase
    {
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Telefono { get; set; }
        
        public string Ruta_Imagen_Perfil { get; set; }
        public string Email { get; set; }
        public string Edad { get; set;}
    }

    public class UsuarioRequest: UsuariosBase
    {
        public int IdUsuario { get; set; }
        public string Contrasena { get; set; }
    }

    public class UsuarioResponse: UsuariosBase
    {
        public int IdUsuario { get; set; }
        public int IdEstado { get; set; }
        public int IdRol { get; set; }

    }


    public class UsuarioAutenticado
    {
        public int IdUsuario { get; set; }
        public string Nombre { get; set; }
        public string Rol { get; set; }
    }

}
