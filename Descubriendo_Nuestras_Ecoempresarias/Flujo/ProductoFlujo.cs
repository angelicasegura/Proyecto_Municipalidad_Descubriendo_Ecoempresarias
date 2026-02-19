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
    public class ProductoFlujo : IProductoFlujo
    {
        private readonly IProductoDA _productoDA;

        public ProductoFlujo(IProductoDA productoDA)
        {
            this._productoDA = productoDA;
        }

        public async Task<Guid> AgregarProducto(ProductoRequest producto)
        {
            return await _productoDA.AgregarProducto(producto);
        }

        public async Task<Guid> EditarProducto(Guid id, ProductoRequest producto)
        {
            return await _productoDA.EditarProducto(id, producto);
        }

        public async Task<Guid> ElimnarProducto(Guid id)
        {
            return await _productoDA.ElimnarProducto(id);
        }

        public async Task<ProductoRequest> ObtenerProducto(Guid id)
        {
            return await _productoDA.ObtenerProducto(id);
        }

        public async Task<IEnumerable<ProductoResponse>> ObtenerProductos(Guid? categoria_id, String? nombre, int? emprendimiento_id, int? estado_id)
        {
            return await _productoDA.ObtenerProductos(categoria_id,nombre,emprendimiento_id,estado_id);
        }
    }
}
