using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.DA
{
    public interface ICarritoDA
    {
        Task<int> Agregar(int usuarioId, CarritoAgregarRequest request);
        Task<IEnumerable<CarritoItemResponse>> ObtenerMiCarrito(int usuarioId);
        Task<int> ActualizarCantidad(int usuarioId, CarritoActualizarRequest request);
        Task<int> Eliminar(int usuarioId, int carritoId);
    }
}