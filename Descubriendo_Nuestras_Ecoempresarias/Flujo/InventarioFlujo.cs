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
    public class InventarioFlujo : IInventarioFlujo
    {
        private readonly IInventarioDA _inventarioDA;

        public InventarioFlujo(IInventarioDA inventarioDA)
        {
            _inventarioDA = inventarioDA;
        }
        public async Task<Guid> AgregarInventario(Inventario inventario)
        {
            return await _inventarioDA.AgregarInventario(inventario);
        }

        public async Task<Guid> EditarInventario(Guid id, InventarioRequest inventario)
        {
           return await _inventarioDA.EditarInventario(id, inventario);
        }

        public async Task<List<Inventario>> ObtenerInventarios(int emprendimiento_id)
        {
            return await _inventarioDA.ObtenerInventarios(emprendimiento_id);
        }
    }
}
