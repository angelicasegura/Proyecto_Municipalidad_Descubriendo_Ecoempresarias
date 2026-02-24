using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DA
{
    public class CarritoDA : ICarritoDA
    {
        private readonly IRepositorioDapper _repositorio;

        public CarritoDA(IRepositorioDapper repositorio)
        {
            _repositorio = repositorio;
        }

        public async Task<int> Agregar(int usuarioId, CarritoAgregarRequest request)
        {
            string sql = "sp_AgregarCarrito";
            var parametros = new
            {
                Usuario_id = usuarioId,
                Emprendimiento_id = request.EmprendimientoId,
                Producto_id = request.ProductoId,
                Cantidad = request.Cantidad
            };

            return await _repositorio.EjecutarSp(sql, parametros);
        }

        public async Task<IEnumerable<CarritoItemResponse>> ObtenerMiCarrito(int usuarioId, int emprendimientoId)
        {
            string sql = "sp_ObtenerCarritoPorUsuario";
            var parametros = new 
            { 
                Usuario_id = usuarioId, 
                Emprendimiento_id = emprendimientoId 
            };
            return await _repositorio.ObtenerInfo<CarritoItemResponse>(sql, parametros);
        }

        public async Task<int> ActualizarCantidad(int usuarioId, CarritoActualizarRequest request)
        {
            string sql = "sp_ActualizarCantidadCarrito";
            var parametros = new
            {
                Usuario_id = usuarioId,
                Emprendimiento_id = request.EmprendimientoId,
                Producto_id = request.ProductoId,
                Cantidad = request.Cantidad
            };
            return await _repositorio.EjecutarSp(sql, parametros);
        }

        public async Task<int> Eliminar(int usuarioId, CarritoEliminarRequest request)
        {
            string sql = "sp_EliminarCarrito";
            var parametros = new
            {
                Usuario_id = usuarioId,
                Emprendimiento_id = request.EmprendimientoId,
                Producto_id = request.ProductoId
            };
            return await _repositorio.EjecutarSp(sql, parametros);
        }
    }
}