CREATE PROCEDURE [dbo].[sp_AgregarCarrito]
    @UsuarioId INT,
    @ProductoId UNIQUEIDENTIFIER,
    @Cantidad DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;

    -- Si ya existe el producto en el carrito del usuario, se va sumar a la cantidad
    IF EXISTS (
        SELECT 1
        FROM dbo.ECOEMPRESARIAS_CARRITO_TB
        WHERE Usuario_id = @UsuarioId
          AND Producto_id = @ProductoId
    )
    BEGIN
        UPDATE dbo.ECOEMPRESARIAS_CARRITO_TB
        SET Cantidad = Cantidad + @Cantidad
        WHERE Usuario_id = @UsuarioId
          AND Producto_id = @ProductoId;

        RETURN 1;
    END

    -- Si no existe, crea un nuevo registro
    DECLARE @NuevoCarritoId INT;

    SELECT @NuevoCarritoId = ISNULL(MAX(Carrito_id), 0) + 1
    FROM dbo.ECOEMPRESARIAS_CARRITO_TB;

    INSERT INTO dbo.ECOEMPRESARIAS_CARRITO_TB (Carrito_id, Cantidad, Usuario_id, Producto_id)
    VALUES (@NuevoCarritoId, @Cantidad, @UsuarioId, @ProductoId);

    RETURN 1;
END;
GO