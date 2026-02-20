CREATE PROCEDURE [dbo].[sp_ObtenerCarritoPorUsuario]
    @UsuarioId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        c.Carrito_id,
        c.Cantidad,
        c.Producto_id,

        p.NombreProducto,
        p.Descripcion,
        p.Precio,
        p.Descuento,
        p.Ruta_Imagen,
        p.Emprendimiento_id
    FROM dbo.ECOEMPRESARIAS_CARRITO_TB c
    INNER JOIN dbo.ECOEMPRESARIAS_PRODUCTO_TB p
        ON p.Producto_id = c.Producto_id
    WHERE c.Usuario_id = @UsuarioId
    ORDER BY c.Carrito_id DESC;
END
GO