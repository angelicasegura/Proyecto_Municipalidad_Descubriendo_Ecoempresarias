CREATE PROCEDURE sp_editarInventario
    @Producto_id UNIQUEIDENTIFIER,
    @Cantidad_actual DECIMAL(10,2),
    @Cantidad_minima DECIMAL(10,2),
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;
    begin transaction  
    UPDATE [dbo].[ECOEMPRESARIAS_INVENTARIO_TB]
    SET 
        Cantidad_actual = @Cantidad_actual,
        Cantidad_minima = @Cantidad_minima,
        Estado_id = @Estado_id
    WHERE Producto_id = @Producto_id;
    select @Producto_id as ID
    commit transaction
END;