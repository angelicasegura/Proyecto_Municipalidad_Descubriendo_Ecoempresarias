using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abstracciones.Modelos;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Abstracciones.Interfaces.Flujo
{
    public interface ICarritoFlujo
    {
        Task<int> Agregar(int usuarioId, CarritoAgregarRequest request);
        Task<IEnumerable<CarritoItemResponse>> ObtenerMiCarrito(int usuarioId, int emprendimientoId);
        Task<int> ActualizarCantidad(int usuarioId, CarritoActualizarRequest request);
        Task<int> Eliminar(int usuarioId, CarritoEliminarRequest request);
    }
}
