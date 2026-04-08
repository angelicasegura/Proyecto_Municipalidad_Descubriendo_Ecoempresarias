CREATE   PROCEDURE sp_ConfirmarPedido
    @Usuario_id        INT,
    @Emprendimiento_id INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY

        DECLARE @Carrito_id UNIQUEIDENTIFIER;

        SELECT @Carrito_id = Carrito_id
        FROM ECOEMPRESARIAS_CARRITO_TB
        WHERE Usuario_id = @Usuario_id
          AND Emprendimiento_id = @Emprendimiento_id;

        IF @Carrito_id IS NULL
        BEGIN
            ROLLBACK;
            RETURN;
        END

        DECLARE @Subtotal DECIMAL(18,2), @IVA DECIMAL(18,2), @Total DECIMAL(18,2);

        SELECT
            @Subtotal = SUM(cp.Cantidad * p.Precio),
            @IVA      = SUM(cp.Cantidad * p.Precio) * 0.13,
            @Total    = SUM(cp.Cantidad * p.Precio) * 1.13
        FROM ECOEMPRESARIAS_PRODUCTOS_POR_CARRITO_TB cp
        INNER JOIN ECOEMPRESARIAS_PRODUCTO_TB p ON cp.Producto_id = p.Producto_id
        WHERE cp.Carrito_id = @Carrito_id;

        IF @Total IS NULL OR @Total = 0
        BEGIN
            ROLLBACK;
            RETURN;
        END

        DECLARE @Factura_id INT;

        INSERT INTO ECOEMPRESARIAS_FACTURAS_TB
            (Fecha, Subtotal, IVA, Total, Estado_id, Usuario_id, Emprendimiento_id)
        VALUES
            (GETDATE(), @Subtotal, @IVA, @Total, 1, @Usuario_id, @Emprendimiento_id);

        SET @Factura_id = SCOPE_IDENTITY();

        INSERT INTO ECOEMPRESARIAS_DETALLE_FACTURAS_TB
            (Factura_id, Producto_id, Cantidad, PrecioUnitario, Subtotal, Estado_id)
        SELECT
            @Factura_id,
            cp.Producto_id,
            cp.Cantidad,
            p.Precio,
            cp.Cantidad * p.Precio,
            1
        FROM ECOEMPRESARIAS_PRODUCTOS_POR_CARRITO_TB cp
        INNER JOIN ECOEMPRESARIAS_PRODUCTO_TB p ON cp.Producto_id = p.Producto_id
        WHERE cp.Carrito_id = @Carrito_id;

        -- Pedido_id es UNIQUEIDENTIFIER, se genera con NEWID()
        DECLARE @Pedido_id UNIQUEIDENTIFIER = NEWID();

        INSERT INTO ECOEMPRESARIAS_PEDIDOS_TB
            (Pedido_id, Factura_id, Usuario_id, Emprendimiento_id, FechaPedido, Estado_id)
        VALUES
            (@Pedido_id, @Factura_id, @Usuario_id, @Emprendimiento_id, GETDATE(), 1);

        DELETE FROM ECOEMPRESARIAS_PRODUCTOS_POR_CARRITO_TB
        WHERE Carrito_id = @Carrito_id;

        COMMIT;

        SELECT @Pedido_id AS Pedido_id, @Factura_id AS Factura_id, @Total AS Total;

    END TRY
    BEGIN CATCH
        ROLLBACK;
        THROW;
    END CATCH
END