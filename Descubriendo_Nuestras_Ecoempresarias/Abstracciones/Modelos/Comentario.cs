using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    public class ComentarioBase
    {
        
        public string Texto { get; set; }
        public int Calificacion { get; set; }
        
        public DateTime Fecha { get; set; }




    }
    public class ComentarioRequest : ComentarioBase
    {
        public int Estado_id { get; set; }
        public int Usuario_id { get; set; }
        public int Emprendimiento_id { get; set; }
    }

    public class ComentarioResponse : ComentarioBase
    {
        public int Comentario_id { get; set; }
        public string UsuarioNombre { get; set; }
        public string NombreEstado { get; set; }
    }

}
