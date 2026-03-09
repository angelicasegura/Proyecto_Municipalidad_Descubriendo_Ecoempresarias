CREATE PROCEDURE [dbo].[SP_InactivarProducto]
    @Producto_id UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
	BEGIN TRANSACTION

        UPDATE ECOEMPRESARIAS_PRODUCTO_TB
        SET
            Estado_id = 0
        WHERE Producto_id = @Producto_id;


        UPDATE ECOEMPRESARIAS_INVENTARIO_TB
                SET Estado_id = 0
                WHERE Producto_id = @Producto_id;
		SELECT @Producto_id;

    COMMIT TRANSACTION;
END