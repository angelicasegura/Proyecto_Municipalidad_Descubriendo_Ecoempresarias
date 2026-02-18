using Abstracciones.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.DA
{
    public interface IProductoDA
    {
        public Task<Guid> AgregarProducto(ProductoRequest producto);
        public Task<Guid> EditarProducto(Guid id, ProductoRequest producto);
        public Task<Guid> ElimnarProducto(Guid id);
        public Task<IEnumerable<ProductoResponse>> ObtenerProductos();
        public Task<ProductoRequest> ObtenerProducto(Guid id);


    }
}
