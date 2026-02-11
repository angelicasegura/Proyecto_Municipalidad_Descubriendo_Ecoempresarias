using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    public class Emprendimiento
    {


        public class EmprendimientoBase
        {
            public string Nombre { get; set; }
            public string CedulaJuridica { get; set; }
            public string Telefono { get; set; }
            public string Email { get; set; }
            public string Direccion { get; set; }
            public int TipoActividadId { get; set; }

            public string? Ruta_Imagen_Logo { get; set; }
            public string? Descripcion { get; set; }
        }

        
        public class EmprendimientoRequest : EmprendimientoBase
        {
            public int? EmprendimientoId { get; set; } 
            public int UsuarioId { get; set; }       
            public int EstadoId { get; set; }
            public IFormFile? Imagen { get; set; }
        }

        
        public class EmprendimientoResponse : EmprendimientoBase
        {
            public int EmprendimientoId { get; set; }
            public int UsuarioId { get; set; }
            public int EstadoId { get; set; }

            
            public string NombreTipoActividad { get; set; }
            public string NombreEstado { get; set; }
            public string NombreDuenio { get; set; } 
        }

    }
}
