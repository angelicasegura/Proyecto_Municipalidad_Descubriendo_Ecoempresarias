using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Abstracciones.Modelos.Pagination;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;
using static Abstracciones.Modelos.Emprendimiento;

namespace DA
{
    public class PedidoDA : IPedidoDA
    {
        private IRepositorioDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public PedidoDA(IRepositorioDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<ConfirmarPedidoResponse> ConfirmarPedido(int usuarioId, PedidoRequest pedido)
        {
            if (pedido == null)
                throw new Exception("El pedido no puede ser nulo.");

            string query = "sp_ConfirmarPedido";

            var resultado = await _sqlConnection.QuerySingleOrDefaultAsync<ConfirmarPedidoResponse>(
                query,
                new
                {
                    Usuario_id = usuarioId,
                    Emprendimiento_id = pedido.EmprendimientoId
                },
                commandType: CommandType.StoredProcedure
            );

            return resultado;
        }

        public async Task<PagedResult<PedidoResponse>> ObtenerPedidosAsync(int usuarioId, int? estadoId, int pagina, DateTime? fecha, int registrosPorPagina)
        {
            var parametros = new
            {
                Usuario_id = usuarioId,
                Estado_id = estadoId,
                Pagina = pagina,
                Fecha = fecha,
                RegistrosPorPagina = registrosPorPagina
            };

            string query = "sp_ObtenerPedidosPorUsuario";

            using var multi = await _sqlConnection.QueryMultipleAsync(query, parametros, commandType: CommandType.StoredProcedure);

            var pedidos = multi.Read<PedidoResponse>().ToList();
            var facturas = multi.Read<Factura>().ToList();
            var detalles = multi.Read<FacturaDetalleResponse>().ToList();

            foreach (var pedido in pedidos)
            {
                var factura = facturas.FirstOrDefault(f => f.Factura_id == pedido.Factura_id);
                if (factura != null)
                {
                    factura.Detalles = detalles
                        .Where(d => d.Factura_id == factura.Factura_id)
                        .ToList();
                    pedido.Factura = factura;
                }
            }

            return new PagedResult<PedidoResponse>
            {
                Items = pedidos,
                TotalCount = pedidos.Count
            };
        }

        public async Task<Guid> ActualizarEstadoPedido(Guid pedidoId, int EstadoID)
        {
            var parametros = new
            {
                Pedido_id = pedidoId,
                Estado_id = EstadoID
            };

            string query = "sp_ActualizarEstadoPedido";
            return await _sqlConnection.QuerySingleAsync<Guid>(query, parametros, commandType: CommandType.StoredProcedure);
        }

        public async Task<Guid> InactivarPedido(Guid pedidoId, string descripcion)
        {
            if (descripcion == null)
                throw new Exception("El id del pedido es nulo o motivo nulo");

            var parametros = new
            {
                PedidoId = pedidoId,
                Descripcion = descripcion
            };

            string query = "sp_InactivarPedido";
            return await _sqlConnection.QuerySingleAsync<Guid>(query, parametros, commandType: CommandType.StoredProcedure);
        }

        public async Task<EmprendimientoResponse> obtenerEmprendimientoPedido(Guid pedidoId)
        {
            var parametros = new { PedidoId = pedidoId };
            string query = "sp_ObtenerEmprendimientoPorPedido";
            return await _sqlConnection.QuerySingleAsync<EmprendimientoResponse>(query, parametros, commandType: CommandType.StoredProcedure);
        }

        public async Task<PedidoResponse> obtenerPedido(Guid pedidoId)
        {
            var parametros = new { PedidoId = pedidoId };
            string query = "sp_ObtenerPedido";
            return await _sqlConnection.QuerySingleAsync<PedidoResponse>(query, parametros, commandType: CommandType.StoredProcedure);
        }

        public async Task<PagedResult<PedidoResponse>> ObtenerPedidosPorEmprendimiento(int emprendimientoId, int? estadoId, int pagina, DateTime? fecha, int registrosPorPagina)
        {
            var parametros = new
            {
                Emprendimiento_id = emprendimientoId,
                Estado_id = estadoId,
                Pagina = pagina,
                Fecha = fecha,
                RegistrosPorPagina = registrosPorPagina
            };

            string query = "sp_ObtenerPedidosPorEmprendimiento";

            using var multi = await _sqlConnection.QueryMultipleAsync(query, parametros, commandType: CommandType.StoredProcedure);

            var pedidos = multi.Read<PedidoResponse>().ToList();
            var facturas = multi.Read<Factura>().ToList();
            var detalles = multi.Read<FacturaDetalleResponse>().ToList();

            foreach (var pedido in pedidos)
            {
                var factura = facturas.FirstOrDefault(f => f.Factura_id == pedido.Factura_id);
                if (factura != null)
                {
                    factura.Detalles = detalles
                        .Where(d => d.Factura_id == factura.Factura_id)
                        .ToList();
                    pedido.Factura = factura;
                }
            }

            return new PagedResult<PedidoResponse>
            {
                Items = pedidos,
                TotalCount = pedidos.Count
            };
        }
    }
}