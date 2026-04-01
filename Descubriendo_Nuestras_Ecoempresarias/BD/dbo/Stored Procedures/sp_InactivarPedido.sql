CREATE PROCEDURE sp_InactivarPedido
    @PedidoId UNIQUEIDENTIFIER,
    @Descripcion NVARCHAR(1000)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1. Validar que el pedido exista
        IF NOT EXISTS (SELECT 1 FROM [dbo].[ECOEMPRESARIAS_PEDIDOS_TB] WHERE Pedido_id = @PedidoId)
        BEGIN
            RAISERROR('El pedido especificado no existe.', 16, 1);
            RETURN;
        END

        -- 2. Inactivar el pedido
        UPDATE [dbo].[ECOEMPRESARIAS_PEDIDOS_TB]
        SET Estado_id = 0
        WHERE Pedido_id = @PedidoId;

        -- 3. Inactivar la factura asociada
        UPDATE F
        SET F.Estado_id = 0
        FROM [dbo].[ECOEMPRESARIAS_FACTURAS_TB] F
        INNER JOIN [dbo].[ECOEMPRESARIAS_PEDIDOS_TB] P
            ON F.Factura_id = P.Factura_id
        WHERE P.Pedido_id = @PedidoId;

        -- 4. Inactivar los detalles de la factura
        UPDATE DF
        SET DF.Estado_id = 0
        FROM [dbo].[ECOEMPRESARIAS_DETALLE_FACTURAS_TB] DF
        INNER JOIN [dbo].[ECOEMPRESARIAS_FACTURAS_TB] F
            ON DF.Factura_id = F.Factura_id
        INNER JOIN [dbo].[ECOEMPRESARIAS_PEDIDOS_TB] P
            ON F.Factura_id = P.Factura_id
        WHERE P.Pedido_id = @PedidoId;

        -- 5. Reintegrar inventario según los detalles de la factura
        UPDATE I
        SET I.Cantidad_actual = I.Cantidad_actual + DF.Cantidad
        FROM [dbo].[ECOEMPRESARIAS_INVENTARIO_TB] I
        INNER JOIN [dbo].[ECOEMPRESARIAS_DETALLE_FACTURAS_TB] DF
            ON I.Producto_id = DF.Producto_id
        INNER JOIN [dbo].[ECOEMPRESARIAS_FACTURAS_TB] F
            ON DF.Factura_id = F.Factura_id
        INNER JOIN [dbo].[ECOEMPRESARIAS_PEDIDOS_TB] P
            ON F.Factura_id = P.Factura_id
        WHERE P.Pedido_id = @PedidoId;

        -- 6. Insertar motivo de inactivación
        INSERT INTO [dbo].[ECOEMPRESARIAS_MOTIVOPEDIDOINACTIVO_TB] (PedidoId, Descripcion)
        VALUES (@PedidoId, @Descripcion);

        Select @PedidoId as Id;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;

        DECLARE @ErrorMsg NVARCHAR(4000), @ErrorSeverity INT, @ErrorState INT;
        SELECT 
            @ErrorMsg = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        RAISERROR(@ErrorMsg, @ErrorSeverity, @ErrorState);
    END CATCH
END