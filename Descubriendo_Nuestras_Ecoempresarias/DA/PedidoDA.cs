using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace DA
{
    public class PedidoDA : IPedidoDA
    {
        private readonly IConfiguration _configuration;

        public PedidoDA(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<Pedido> AgregarPedido(int usuarioId, Pedido pedido)
        {
            if (pedido == null)
                throw new Exception("El pedido no puede ser nulo.");

            if (pedido.Detalles == null || pedido.Detalles.Count == 0)
                throw new Exception("El pedido debe tener al menos un producto.");

            decimal total = pedido.Detalles.Sum(d => d.Cantidad * d.PrecioUnitario);

            using var connection = new SqlConnection(_configuration.GetConnectionString("BD"));
            await connection.OpenAsync();

            using var transaction = connection.BeginTransaction();

            try
            {
                int pedidoId = await connection.ExecuteScalarAsync<int>(
                    "sp_AgregarPedido",
                    new
                    {
                        Usuario_id = usuarioId,
                        Emprendimiento_id = pedido.EmprendimientoId,
                        DireccionEntrega = pedido.DireccionEntrega,
                        Observaciones = pedido.Observaciones,
                        Total = total
                    },
                    transaction,
                    commandType: CommandType.StoredProcedure
                );

                foreach (var detalle in pedido.Detalles)
                {
                    await connection.ExecuteAsync(
                        "sp_AgregarDetallePedido",
                        new
                        {
                            Pedido_id = pedidoId,
                            Producto_id = detalle.ProductoId,
                            Cantidad = detalle.Cantidad,
                            PrecioUnitario = detalle.PrecioUnitario,
                            Subtotal = detalle.Cantidad * detalle.PrecioUnitario
                        },
                        transaction,
                        commandType: CommandType.StoredProcedure
                    );
                }

                foreach (var detalle in pedido.Detalles)
                {
                    await connection.ExecuteAsync(
                        "sp_EliminarProductoCarritoDespuesPedido",
                        new
                        {
                            Usuario_id = usuarioId,
                            Emprendimiento_id = pedido.EmprendimientoId,
                            Producto_id = detalle.ProductoId
                        },
                        transaction,
                        commandType: CommandType.StoredProcedure
                    );
                }

                await connection.ExecuteAsync(
                    "sp_EliminarCarritoVacioDespuesPedido",
                    new
                    {
                        Usuario_id = usuarioId,
                        Emprendimiento_id = pedido.EmprendimientoId
                    },
                    transaction,
                    commandType: CommandType.StoredProcedure
                );

                transaction.Commit();

                pedido.PedidoId = pedidoId;
                pedido.UsuarioId = usuarioId;
                pedido.FechaPedido = DateTime.Now;
                pedido.EstadoPedido = "PENDIENTE";
                pedido.Total = total;

                return pedido;
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }
    }
}