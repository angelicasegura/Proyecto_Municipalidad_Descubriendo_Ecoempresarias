CREATE PROCEDURE sp_agregarInventario
    @Producto_id UNIQUEIDENTIFIER,
    @Cantidad_actual DECIMAL(10,2),
    @Cantidad_minima DECIMAL(10,2),
    @Estado_id INT
AS
BEGIN
    SET NOCOUNT ON;
    begin transaction

    INSERT INTO [dbo].[ECOEMPRESARIAS_INVENTARIO_TB] 
    (
        Producto_id,
        Cantidad_actual,
        Cantidad_minima,
        Estado_id
    )
    VALUES 
    (
        @Producto_id,
        @Cantidad_actual,
        @Cantidad_minima,
        @Estado_id
    );
    select @Producto_id as ID
    commit transaction
END;