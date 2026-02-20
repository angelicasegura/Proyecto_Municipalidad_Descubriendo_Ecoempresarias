using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;

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
            var parametros = new { UsuarioId = usuarioId, ProductoId = request.ProductoId, Cantidad = request.Cantidad };
            return await _repositorio.EjecutarSp(sql, parametros);
        }

        public async Task<IEnumerable<CarritoItemResponse>> ObtenerMiCarrito(int usuarioId)
        {
            string sql = "sp_ObtenerCarritoPorUsuario";
            var parametros = new { UsuarioId = usuarioId };
            return await _repositorio.ObtenerInfo<CarritoItemResponse>(sql, parametros);
        }

        public async Task<int> ActualizarCantidad(int usuarioId, CarritoActualizarRequest request)
        {
            string sql = "sp_ActualizarCantidadCarrito";
            var parametros = new { UsuarioId = usuarioId, CarritoId = request.CarritoId, Cantidad = request.Cantidad };
            return await _repositorio.EjecutarSp(sql, parametros);
        }

        public async Task<int> Eliminar(int usuarioId, int carritoId)
        {
            string sql = "sp_EliminarCarrito";
            var parametros = new { UsuarioId = usuarioId, CarritoId = carritoId };
            return await _repositorio.EjecutarSp(sql, parametros);
        }
    }
}