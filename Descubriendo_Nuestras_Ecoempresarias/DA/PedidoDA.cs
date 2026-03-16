using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Abstracciones.Modelos.Pagination;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

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

        public async Task<PagedResult<PedidoResponse>> ObtenerPedidosAsync(int usuarioId, int? estadoId, int pagina, int registrosPorPagina)
        {

            var parametros = new
            {
                Usuario_id=usuarioId,
                Estado_id = estadoId,
                Pagina = pagina,
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
    }
}