CREATE PROCEDURE [dbo].[SP_CambiarEstadoProducto]
    @Producto_id UNIQUEIDENTIFIER,
	@estado_id int
AS
BEGIN
    SET NOCOUNT ON;
	BEGIN TRANSACTION

        UPDATE ECOEMPRESARIAS_PRODUCTO_TB
        SET
            Estado_id = @estado_id
        WHERE Producto_id = @Producto_id;

        IF (@estado_id = 1)
            BEGIN
                UPDATE ECOEMPRESARIAS_INVENTARIO_TB
                SET Estado_id = 1
                WHERE Producto_id = @Producto_id;
            END

		SELECT @Producto_id;

    COMMIT TRANSACTION;
END