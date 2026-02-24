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

		SELECT @Producto_id;

    COMMIT TRANSACTION;
END