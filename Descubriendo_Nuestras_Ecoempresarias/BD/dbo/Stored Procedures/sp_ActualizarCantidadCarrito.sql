CREATE PROCEDURE [dbo].[sp_ActualizarCantidadCarrito]
    @UsuarioId INT,
    @CarritoId INT,
    @Cantidad  DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.ECOEMPRESARIAS_CARRITO_TB
    SET Cantidad = @Cantidad
    WHERE Carrito_id = @CarritoId
      AND Usuario_id = @UsuarioId;
END
GO