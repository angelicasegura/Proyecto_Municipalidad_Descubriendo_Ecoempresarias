CREATE PROCEDURE [dbo].[sp_EliminarCarritoVacioDespuesPedido]
    @Usuario_id INT,
    @Emprendimiento_id INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE c
    FROM [dbo].[ECOEMPRESARIAS_CARRITO_TB] c
    WHERE c.[Usuario_id] = @Usuario_id
      AND c.[Emprendimiento_id] = @Emprendimiento_id
      AND NOT EXISTS
      (
          SELECT 1
          FROM [dbo].[ECOEMPRESARIAS_PRODUCTOS_POR_CARRITO_TB] ppc
          WHERE ppc.[Carrito_id] = c.[Carrito_id]
      );
END;