using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    public class CategoriaProducto
    {
        
            public Guid Categoria_Id { get; set; }

            public string Nombre { get; set; }

            public string? Ruta_Imagen { get; set; }

            public int Estado_Id { get; set; }
        
    }
}
