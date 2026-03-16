CREATE PROCEDURE [dbo].[sp_AgregarDetallePedido]
    @Pedido_id INT,
    @Producto_id UNIQUEIDENTIFIER,
    @Cantidad INT,
    @PrecioUnitario DECIMAL(18,2),
    @Subtotal DECIMAL(18,2)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO [dbo].[ECOEMPRESARIAS_DETALLE_PEDIDOS_TB]
    (
        [Pedido_id],
        [Producto_id],
        [Cantidad],
        [PrecioUnitario],
        [Subtotal]
    )
    VALUES
    (
        @Pedido_id,
        @Producto_id,
        @Cantidad,
        @PrecioUnitario,
        @Subtotal
    );
END;