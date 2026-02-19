using Abstracciones.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.Flujo
{
    public interface IInventarioFlujo
    {
        Task<Guid> AgregarInventario(Inventario inventario);
        Task<Guid> EditarInventario(Guid id, InventarioRequest inventario);
        Task<List<Inventario>> ObtenerInventarios(int emprendimiento_id);
    }
}
