using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System;
using System.Text.Json.Serialization;


namespace Abstracciones.Modelos
{
    public class CarritoAgregarRequest
    {
        public int EmprendimientoId { get; set; }
        public Guid ProductoId { get; set; }
        public int Cantidad { get; set; }
    }

    public class CarritoActualizarRequest
    {
        public int EmprendimientoId { get; set; }
        public Guid ProductoId { get; set; }
        public int Cantidad { get; set; }
    }

    public class CarritoEliminarRequest
    {
        public int EmprendimientoId { get; set; }
        public Guid ProductoId { get; set; }
    }

    public class CarritoItemResponse
    {
        public Guid Carrito_id { get; set; }
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
