using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    public class ProductoBase
    {
        
        public string NombreProducto { get; set; }
        public string Descripcion { get; set; }
        public Decimal Precio { get; set; }
        public string? Ruta_Imagen { get; set; }

        public int Emprendimiento_id { get; set; }

        public decimal? Descuento { get; set; }
    }

    public class ProductoRequest : ProductoBase
    {
        public Guid Categoria_id { get; set; }
        public int Estado_id { get; set; }
        public IFormFile? Imagen { get; set; }
    }

    public class ProductoResponse : ProductoBase
    {
        public Guid Producto_id { get; set; }
        public string CategoriaNombre { get; set; }
        public string NombreEstado { get; set; }
        public int UsuarioDueño { get; set; }
        public string EmprendimientoNombre { get; set; }
    }
}