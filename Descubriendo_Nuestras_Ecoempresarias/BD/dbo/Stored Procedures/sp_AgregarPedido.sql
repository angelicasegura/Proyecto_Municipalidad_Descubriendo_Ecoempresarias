CREATE PROCEDURE [dbo].[sp_AgregarPedido]
    @Usuario_id INT,
    @Emprendimiento_id INT,
    @DireccionEntrega VARCHAR(250),
    @Observaciones VARCHAR(500),
    @Total DECIMAL(18,2)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO [dbo].[ECOEMPRESARIAS_PEDIDOS_TB]
    (
        [Usuario_id],
        [Emprendimiento_id],
        [FechaPedido],
        [EstadoPedido],
        [DireccionEntrega],
        [Observaciones],
        [Total]
    )
    VALUES
    (
        @Usuario_id,
        @Emprendimiento_id,
        GETDATE(),
        'PENDIENTE',
        @DireccionEntrega,
        @Observaciones,
        @Total
    );

    SELECT CAST(SCOPE_IDENTITY() AS INT) AS Pedido_id;
END;