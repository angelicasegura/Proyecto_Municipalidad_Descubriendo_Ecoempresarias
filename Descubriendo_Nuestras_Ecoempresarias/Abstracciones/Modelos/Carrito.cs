using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    public class CarritoAgregarRequest
    {
        public Guid ProductoId { get; set; }
        public decimal Cantidad { get; set; }
    }

    public class CarritoActualizarRequest
    {
        public int CarritoId { get; set; }
        public decimal Cantidad { get; set; }
    }

    public class CarritoItemResponse
    {
        public int Carrito_id { get; set; }
        public decimal Cantidad { get; set; }

        public Guid Producto_id { get; set; }
        public string NombreProducto { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public decimal? Descuento { get; set; }
        public string Ruta_Imagen { get; set; }
        public int Emprendimiento_id { get; set; }
    }
}
