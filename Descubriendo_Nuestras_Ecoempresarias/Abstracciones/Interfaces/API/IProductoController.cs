using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.API
{
    public interface IProductoController
    {
        public Task<IActionResult> AgregarProducto(ProductoRequest producto);
        public Task<IActionResult> EditarProducto(Guid id, ProductoRequest producto);
        public Task<IActionResult> ElimnarProducto(Guid id);
        Task<IActionResult> ObtenerProductos(Guid? categoria_id, String? nombre);
        public Task<IActionResult> ObtenerProducto(Guid id);


    }
}
