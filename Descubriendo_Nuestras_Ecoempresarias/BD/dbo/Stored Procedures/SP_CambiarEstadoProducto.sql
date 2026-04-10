CREATE PROCEDURE [dbo].[SP_CambiarEstadoProducto]
    @Producto_id UNIQUEIDENTIFIER,
    @estado_id INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    UPDATE ECOEMPRESARIAS_PRODUCTO_TB
    SET Estado_id = @estado_id
    WHERE Producto_id = @Producto_id;

    IF (@estado_id = 1)
    BEGIN
        IF NOT EXISTS (
            SELECT 1 
            FROM ECOEMPRESARIAS_INVENTARIO_TB 
            WHERE Producto_id = @Producto_id
        )
        BEGIN
            INSERT INTO ECOEMPRESARIAS_INVENTARIO_TB
            (
                Producto_id,
                Cantidad_actual,
                Cantidad_minima,
                Estado_id
            )
            VALUES
            (
                @Producto_id,
                0,
                0,
                1
            )
        END
        ELSE
        BEGIN
            UPDATE ECOEMPRESARIAS_INVENTARIO_TB
            SET Estado_id = 1
            WHERE Producto_id = @Producto_id
        END
    END

    SELECT @Producto_id;

    COMMIT TRANSACTION;
END