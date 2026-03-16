using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Abstracciones.Modelos.Pagination;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
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

        public async Task<Guid> AgregarPedido(int usuarioId, PedidoRequest pedido)
        {
            if (pedido == null)
                throw new Exception("El pedido no puede ser nulo.");
            string query = @"sp_AgregarPedido";
            Guid pedidoId = await _sqlConnection.ExecuteScalarAsync<Guid>(
                query,
                new
                {
                    Usuario_id = usuarioId,
                    Emprendimiento_id = pedido.EmprendimientoId,
                    DireccionEntrega = pedido.DireccionEntrega,
                    Observaciones = pedido.Observaciones
                },
                commandType: CommandType.StoredProcedure
            );

            return pedidoId;
        }

        public async Task<PagedResult<PedidoResponse>> ObtenerPedidosAsync(int usuarioId, int? estadoId, int pagina, DateTime? fecha, int registrosPorPagina)
        {

            var parametros = new
            {
                Usuario_id=usuarioId,
                Estado_id = estadoId,
                Pagina = pagina,
                Fecha = fecha,
                RegistrosPorPagina=registrosPorPagina
            };
            string query = @"sp_ObtenerPedidosPorUsuario";


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

            int totalCount = pedidos.Count; 

            return new PagedResult<PedidoResponse>
            {
                Items = pedidos,
                TotalCount = totalCount
            };
        }


        public async Task<Guid> ActualizarEstadoPedido(Guid pedidoId, int EstadoID)
        {
            if(pedidoId == null || EstadoID==null)
            {
                throw new Exception("El id del pedido es nulo o estado nulo");
            }
            var parametros = new
            {
                Pedido_id = pedidoId,
                Estado_id = EstadoID
            };
            string query = @"sp_ActualizarEstadoProducto";

            Guid pedido = await _sqlConnection.QuerySingleAsync<Guid>(query,parametros, commandType: CommandType.StoredProcedure);
            return pedido;
        }

        public async Task<Guid> InactivarPedido(Guid pedidoId, String descripcion)
        {
            if (pedidoId == null || descripcion == null)
            {
                throw new Exception("El id del pedido es nulo o motivo nulo");
            }
            var parametros = new
            {
                PedidoId = pedidoId,
                Descripcion = descripcion
            };
            string query = @"sp_InactivarPedido";
            Guid pedido = await _sqlConnection.QuerySingleAsync<Guid>(query, parametros, commandType: CommandType.StoredProcedure);
            return pedido;

        }

        public async Task<EmprendimientoResponse> obtenerEmprendimientoPedido(Guid pedidoId)
        {
            if (pedidoId == null)
            {
                throw new Exception("El pedido id esta nulo");
            }
            var parametros = new
            {
                PedidoId = pedidoId,
            };
            string query = @"sp_ObtenerEmprendimientoPorPedido";

            EmprendimientoResponse emprendimiento = await _sqlConnection.QuerySingleAsync<EmprendimientoResponse>(query, parametros, commandType: CommandType.StoredProcedure);

            return emprendimiento;

        }



        public async Task<PedidoResponse> obtenerPedido(Guid pedidoId)
        {
            if (pedidoId == null)
            {
                throw new Exception("El pedido id esta nulo");
            }
            var parametros = new
            {
                PedidoId = pedidoId,
            };
            string query = @"sp_ObtenerPedido";

            PedidoResponse pedido = await _sqlConnection.QuerySingleAsync<PedidoResponse>(query, parametros, commandType: CommandType.StoredProcedure);

            return pedido;

        }
    }
}