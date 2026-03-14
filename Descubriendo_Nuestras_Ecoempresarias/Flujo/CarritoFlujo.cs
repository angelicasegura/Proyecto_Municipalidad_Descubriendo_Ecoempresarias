using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Flujo
{
    public class CarritoFlujo : ICarritoFlujo
    {
        private readonly ICarritoDA _carritoDA;

        public CarritoFlujo(ICarritoDA carritoDA)
        {
            _carritoDA = carritoDA;
        }

        public Task<int> Agregar(int usuarioId, CarritoAgregarRequest request)
            => _carritoDA.Agregar(usuarioId, request);

        public Task<IEnumerable<CarritoItemResponse>> ObtenerMiCarrito(int usuarioId, int emprendimientoId)
            => _carritoDA.ObtenerMiCarrito(usuarioId, emprendimientoId);

        public Task<int> ActualizarCantidad(int usuarioId, CarritoActualizarRequest request)
            => _carritoDA.ActualizarCantidad(usuarioId, request);

        public Task<int> Eliminar(int usuarioId, CarritoEliminarRequest request)
            => _carritoDA.Eliminar(usuarioId, request);
    }
}