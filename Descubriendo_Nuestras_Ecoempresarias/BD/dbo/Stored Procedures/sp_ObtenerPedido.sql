CREATE PROCEDURE sp_ObtenerPedido
    @PedidoId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    
    SELECT 
        Pedido_id,
        Factura_id,
        Usuario_id,
        Emprendimiento_id,
        FechaPedido,
        Estado_id,
        DireccionEntrega,
        Observaciones
    FROM [dbo].[ECOEMPRESARIAS_PEDIDOS_TB]
    WHERE Pedido_id = @PedidoId;
END