CREATE   PROCEDURE dbo.sp_ObtenerCarritoPorUsuario
    @Usuario_id INT,
    @Emprendimiento_id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        c.Carrito_id,
        pc.Cantidad,
        pc.Producto_id,

        p.NombreProducto,
        p.Descripcion,
        p.Precio,
        p.Descuento,
        p.Ruta_Imagen,
        p.Emprendimiento_id
    FROM dbo.ECOEMPRESARIAS_CARRITO_TB c
    INNER JOIN dbo.ECOEMPRESARIAS_PRODUCTOS_POR_CARRITO_TB pc
        ON pc.Carrito_id = c.Carrito_id
    INNER JOIN dbo.ECOEMPRESARIAS_PRODUCTO_TB p
        ON p.Producto_id = pc.Producto_id
    WHERE c.Usuario_id = @Usuario_id
      AND c.Emprendimiento_id = @Emprendimiento_id
    ORDER BY p.NombreProducto ASC;
END
GO