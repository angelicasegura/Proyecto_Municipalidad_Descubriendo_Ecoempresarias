CREATE PROCEDURE [dbo].[SP_ObtenerProductoPorId]
    @Producto_id UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        [dbo].[ECOEMPRESARIAS_PRODUCTO_TB].Producto_id,
        [dbo].[ECOEMPRESARIAS_PRODUCTO_TB].NombreProducto,
        [dbo].[ECOEMPRESARIAS_PRODUCTO_TB].Descripcion,
        [dbo].[ECOEMPRESARIAS_PRODUCTO_TB].Ruta_Imagen,
        [dbo].[ECOEMPRESARIAS_PRODUCTO_TB].Precio,
        [dbo].[ECOEMPRESARIAS_PRODUCTO_TB].Categoria_id,
        [dbo].[ECOEMPRESARIAS_PRODUCTO_TB].Estado_id,
        [dbo].[ECOEMPRESARIAS_PRODUCTO_TB].Emprendimiento_id,
        [dbo].[ECOEMPRESARIAS_PRODUCTO_TB].Descuento,
        Estado.Nombre AS NombreEstado,
        Categoria.Nombre AS CategoriaNombre
    FROM ECOEMPRESARIAS_PRODUCTO_TB INNER JOIN 
    ECOEMPRESARIAS_ESTADOS_TB Estado ON [dbo].[ECOEMPRESARIAS_PRODUCTO_TB].Estado_id = Estado.Estado_id INNER JOIN
    ECOEMPRESARIAS_CATEGORIA_TB Categoria ON [dbo].[ECOEMPRESARIAS_PRODUCTO_TB].Categoria_id = Categoria.Categoria_id

	WHERE [dbo].[ECOEMPRESARIAS_PRODUCTO_TB].Producto_id = @Producto_id;
END