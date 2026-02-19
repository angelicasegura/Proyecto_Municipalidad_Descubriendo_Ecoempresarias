using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    public class Emprendimiento
    {


        public class EmprendimientoBase
        {
            [Required(ErrorMessage = "El Nombre es obligatorio.")]
            public string Nombre { get; set; }
            [Required(ErrorMessage = "La cédula jurídica es obligatoria.")]
            [RegularExpression(@"^\d-\d{3}-\d{6}$",
        ErrorMessage = "La cédula jurídica debe tener el formato X-XXX-XXXXXX.")]
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
