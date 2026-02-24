using Abstracciones.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.Flujo
{
    public interface IProductoFlujo
    {
        public Task<Guid> AgregarProducto(ProductoRequest producto);
        public Task<Guid> EditarProducto(Guid id, ProductoRequest producto);
        public Task<Guid> ElimnarProducto(Guid id);
        public Task<IEnumerable<ProductoResponse>> ObtenerProductos(Guid? categoria_id, String? nombre, int? emprendimiento_id, int? estado_id);
        public Task<IEnumerable<ProductoResponse>> ObtenerProductosPendientesDeAprobacion(int estado_id);
        public Task<IEnumerable<ProductoResponse>> ObtenerProductosEmprendedor(Guid? categoria_id, string? nombre, int? emprendimiento_id);
        public Task<Guid> CambiarEstadoProducto(Guid id, int estado_id);
        public Task<ProductoResponse> ObtenerProducto(Guid id);
    }
}
