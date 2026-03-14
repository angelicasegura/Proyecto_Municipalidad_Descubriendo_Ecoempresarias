CREATE   PROCEDURE dbo.sp_AgregarCarrito
    @Usuario_id INT,
    @Emprendimiento_id INT,
    @Producto_id UNIQUEIDENTIFIER,
    @Cantidad INT
AS
BEGIN
    SET NOCOUNT ON;
    begin transaction;
    DECLARE @Carrito_id UNIQUEIDENTIFIER;
    DECLARE @EstadoEmprendimiento INT;

    SELECT @Carrito_id = Carrito_id
    FROM dbo.ECOEMPRESARIAS_CARRITO_TB
    WHERE Usuario_id = @Usuario_id
      AND Emprendimiento_id = @Emprendimiento_id;


      -- Verificar el estado del emprendimiento
      SELECT @EstadoEmprendimiento = Estado_id 
    FROM dbo.ECOEMPRESARIAS_EMPRENDIMIENTOS_TB
    WHERE Emprendimiento_id = @Emprendimiento_id;

    IF @EstadoEmprendimiento IS NULL OR @EstadoEmprendimiento <> 1
    BEGIN
        RETURN 0; -- Retorna 0 indicando que no se pudo realizar la operación
    END

    IF @Carrito_id IS NULL
    BEGIN
        SET @Carrito_id = NEWID();

        INSERT INTO dbo.ECOEMPRESARIAS_CARRITO_TB
            (Carrito_id, Usuario_id, Emprendimiento_id, FechaCreacion)
        VALUES
            (@Carrito_id, @Usuario_id, @Emprendimiento_id, GETDATE());
    END

    IF EXISTS (
        SELECT 1
        FROM dbo.ECOEMPRESARIAS_PRODUCTOS_POR_CARRITO_TB
        WHERE Carrito_id = @Carrito_id
          AND Producto_id = @Producto_id
    )
    BEGIN
        UPDATE dbo.ECOEMPRESARIAS_PRODUCTOS_POR_CARRITO_TB
        SET Cantidad = Cantidad + @Cantidad
        WHERE Carrito_id = @Carrito_id
          AND Producto_id = @Producto_id;
    END
    ELSE
    BEGIN
        INSERT INTO dbo.ECOEMPRESARIAS_PRODUCTOS_POR_CARRITO_TB
            (Carrito_id, Producto_id, Cantidad)
        VALUES
            (@Carrito_id, @Producto_id, @Cantidad);
    END

    RETURN 1;
    commit transaction;
END
GO