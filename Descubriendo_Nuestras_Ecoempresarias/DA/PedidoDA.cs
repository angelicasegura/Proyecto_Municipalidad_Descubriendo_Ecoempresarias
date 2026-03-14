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
                string sqlPedido = @"
                    INSERT INTO dbo.ECOEMPRESARIAS_PEDIDOS_TB
                    (
                        Usuario_id,
                        Emprendimiento_id,
                        FechaPedido,
                        EstadoPedido,
                        DireccionEntrega,
                        Observaciones,
                        Total
                    )
                    OUTPUT INSERTED.Pedido_id
                    VALUES
                    (
                        @UsuarioId,
                        @EmprendimientoId,
                        GETDATE(),
                        'PENDIENTE',
                        @DireccionEntrega,
                        @Observaciones,
                        @Total
                    );";

                int pedidoId = await connection.ExecuteScalarAsync<int>(
                    sqlPedido,
                    new
                    {
                        UsuarioId = usuarioId,
                        pedido.EmprendimientoId,
                        pedido.DireccionEntrega,
                        pedido.Observaciones,
                        Total = total
                    },
                    transaction
                );

                string sqlDetalle = @"
                    INSERT INTO dbo.ECOEMPRESARIAS_DETALLE_PEDIDOS_TB
                    (
                        Pedido_id,
                        Producto_id,
                        Cantidad,
                        PrecioUnitario,
                        Subtotal
                    )
                    VALUES
                    (
                        @PedidoId,
                        @ProductoId,
                        @Cantidad,
                        @PrecioUnitario,
                        @Subtotal
                    );";

                foreach (var detalle in pedido.Detalles)
                {
                    await connection.ExecuteAsync(
                        sqlDetalle,
                        new
                        {
                            PedidoId = pedidoId,
                            ProductoId = detalle.ProductoId,
                            Cantidad = detalle.Cantidad,
                            PrecioUnitario = detalle.PrecioUnitario,
                            Subtotal = detalle.Cantidad * detalle.PrecioUnitario
                        },
                        transaction
                    );
                }

                //Elimina del carrito los productos comprados

                string sqlEliminarProductoCarrito = @"
                    DELETE ppc
                    FROM dbo.ECOEMPRESARIAS_PRODUCTOS_POR_CARRITO_TB ppc
                    INNER JOIN dbo.ECOEMPRESARIAS_CARRITO_TB c
                        ON c.Carrito_id = ppc.Carrito_id
                    WHERE c.Usuario_id = @UsuarioId
                      AND c.Emprendimiento_id = @EmprendimientoId
                      AND ppc.Producto_id = @ProductoId;";

                foreach (var detalle in pedido.Detalles)
                {
                    await connection.ExecuteAsync(
                        sqlEliminarProductoCarrito,
                        new
                        {
                            UsuarioId = usuarioId,
                            EmprendimientoId = pedido.EmprendimientoId,
                            ProductoId = detalle.ProductoId
                        },
                        transaction
                    );
                }

                //si el carrito quedó sin productos, eliminar encabezado de carrito
                string sqlEliminarCarritoVacio = @"
                    DELETE c
                    FROM dbo.ECOEMPRESARIAS_CARRITO_TB c
                    WHERE c.Usuario_id = @UsuarioId
                      AND c.Emprendimiento_id = @EmprendimientoId
                      AND NOT EXISTS
                      (
                          SELECT 1
                          FROM dbo.ECOEMPRESARIAS_PRODUCTOS_POR_CARRITO_TB ppc
                          WHERE ppc.Carrito_id = c.Carrito_id
                      );";

                await connection.ExecuteAsync(
                    sqlEliminarCarritoVacio,
                    new
                    {
                        UsuarioId = usuarioId,
                        EmprendimientoId = pedido.EmprendimientoId
                    },
                    transaction
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
