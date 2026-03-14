CREATE   PROCEDURE dbo.sp_EliminarCarrito
    @Usuario_id INT,
    @Emprendimiento_id INT,
    @Producto_id UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Carrito_id UNIQUEIDENTIFIER;

    SELECT @Carrito_id = Carrito_id
    FROM dbo.ECOEMPRESARIAS_CARRITO_TB
    WHERE Usuario_id = @Usuario_id
      AND Emprendimiento_id = @Emprendimiento_id;

    IF @Carrito_id IS NULL
        RETURN 0;

    DELETE FROM dbo.ECOEMPRESARIAS_PRODUCTOS_POR_CARRITO_TB
    WHERE Carrito_id = @Carrito_id
      AND Producto_id = @Producto_id;

    IF NOT EXISTS (
        SELECT 1
        FROM dbo.ECOEMPRESARIAS_PRODUCTOS_POR_CARRITO_TB
        WHERE Carrito_id = @Carrito_id
    )
    BEGIN
        DELETE FROM dbo.ECOEMPRESARIAS_CARRITO_TB
        WHERE Carrito_id = @Carrito_id;
    END

    RETURN 1;
END
GO