using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    public class Inventario
    {
        public Guid ProductoId { get; set; }

        public decimal CantidadActual { get; set; }

        public string? NombreProducto { get; set; }

        public string? Descripcion { get; set; }

        public string? Ruta_Imagen { get; set; }

        public decimal Precio { get; set; }

        public decimal Descuento { get; set; }

        public decimal CantidadMinima { get; set; }

        public int EstadoId { get; set; }

       
    }

    public class InventarioRequest
    {
        [Required]
        public Guid ProductoId { get; set; }  

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "La cantidad actual debe ser mayor o igual a 0.")]
        public int CantidadActual { get; set; }

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "La cantidad mínima debe ser mayor o igual a 0.")]
        public int CantidadMinima { get; set; }

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "El estado debe ser mayor o igual a 0.")]
        public int EstadoId { get; set; }
    }
}
