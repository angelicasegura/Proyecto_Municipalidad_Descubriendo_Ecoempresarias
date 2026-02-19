using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flujo
{
    public class CategoriaProductosFlujo : ICategoriaProductosFlujo
    {
        private readonly ICategoriaProductosDA _categoriaProductosDA;

        public CategoriaProductosFlujo(ICategoriaProductosDA categoriaProductosDA)
        {
            _categoriaProductosDA = categoriaProductosDA;
        }

        public async  Task<List<CategoriaProducto>> ObtenerCategoriasProductos(int? emprendimiento_id)
        {
            return await _categoriaProductosDA.ObtenerCategoriasProductos( emprendimiento_id);
        }
    }
}
