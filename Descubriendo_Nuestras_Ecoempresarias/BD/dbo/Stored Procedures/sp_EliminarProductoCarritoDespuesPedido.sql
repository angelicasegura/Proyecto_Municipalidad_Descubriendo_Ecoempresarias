CREATE PROCEDURE [dbo].[sp_EliminarProductoCarritoDespuesPedido]
    @Usuario_id INT,
    @Emprendimiento_id INT,
    @Producto_id UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    DELETE ppc
    FROM [dbo].[ECOEMPRESARIAS_PRODUCTOS_POR_CARRITO_TB] ppc
    INNER JOIN [dbo].[ECOEMPRESARIAS_CARRITO_TB] c
        ON c.[Carrito_id] = ppc.[Carrito_id]
    WHERE c.[Usuario_id] = @Usuario_id
      AND c.[Emprendimiento_id] = @Emprendimiento_id
      AND ppc.[Producto_id] = @Producto_id;
END;