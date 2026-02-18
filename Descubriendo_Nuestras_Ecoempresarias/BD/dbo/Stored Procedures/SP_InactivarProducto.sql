CREATE PROCEDURE [dbo].[SP_InactivarProducto]
    @Producto_id UNIQUEIDENTIFIER,
	@Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;
	BEGIN TRANSACTION

        UPDATE ECOEMPRESARIAS_PRODUCTO_TB
        SET
            Estado_id = @Estado_id
        WHERE Producto_id = @Producto_id;

		SELECT @Producto_id;

    COMMIT TRANSACTION;
END