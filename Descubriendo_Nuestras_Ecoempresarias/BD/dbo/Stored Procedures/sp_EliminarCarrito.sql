CREATE PROCEDURE [dbo].[sp_EliminarCarrito]
    @UsuarioId INT,
    @CarritoId INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM dbo.ECOEMPRESARIAS_CARRITO_TB
    WHERE Carrito_id = @CarritoId
      AND Usuario_id = @UsuarioId;
END
GO