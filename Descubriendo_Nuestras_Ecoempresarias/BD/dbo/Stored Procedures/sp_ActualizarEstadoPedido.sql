CREATE PROCEDURE dbo.sp_ActualizarEstadoPedido
(
    @Pedido_id UNIQUEIDENTIFIER,
    @Estado_id INT
)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;

        -----------------------------------------
        -- 1. Obtener la factura asociada
        -----------------------------------------
        DECLARE @Factura_id INT;

        SELECT @Factura_id = Factura_id
        FROM dbo.ECOEMPRESARIAS_PEDIDOS_TB
        WHERE Pedido_id = @Pedido_id;

        -----------------------------------------
        -- 2. Actualizar el estado del pedido
        -----------------------------------------
        UPDATE dbo.ECOEMPRESARIAS_PEDIDOS_TB
        SET Estado_id = @Estado_id
        WHERE Pedido_id = @Pedido_id;

        -----------------------------------------
        -- 3. Actualizar el estado de la factura
        -----------------------------------------
        IF @Factura_id IS NOT NULL
        BEGIN
            UPDATE dbo.ECOEMPRESARIAS_FACTURAS_TB
            SET Estado_id = @Estado_id
            WHERE Factura_id = @Factura_id;

            
            UPDATE DF
            SET DF.Estado_id = @Estado_id  
            FROM dbo.ECOEMPRESARIAS_DETALLE_FACTURAS_TB DF
            WHERE DF.Factura_id = @Factura_id;
        END
        select @Pedido_Id as Id;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        DECLARE @ErrorMessage NVARCHAR(4000), @ErrorSeverity INT, @ErrorState INT;
        SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END