CREATE PROCEDURE [dbo].[SP_ObtenerProductosEmprendedor]
    @Nombre NVARCHAR(100) = NULL,
    @Categoria_id UNIQUEIDENTIFIER = NULL,
    @Emprendimiento_id INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        Productos.Producto_id,
        Productos.NombreProducto,
        Productos.Descripcion,
        Productos.Ruta_Imagen,
        Productos.Precio,
        Productos.Categoria_id,
        Productos.Estado_id,
        Estado.Nombre AS NombreEstado,
        Categoria.Nombre AS CategoriaNombre,
        Productos.Emprendimiento_id,
        Productos.Descuento,
        Emprendimiento.Usuario_id AS UsuarioDueño  
    FROM ECOEMPRESARIAS_PRODUCTO_TB Productos
    INNER JOIN ECOEMPRESARIAS_ESTADOS_TB Estado 
        ON Productos.Estado_id = Estado.Estado_id
    INNER JOIN ECOEMPRESARIAS_CATEGORIA_TB Categoria 
        ON Productos.Categoria_id = Categoria.Categoria_id
    INNER JOIN ECOEMPRESARIAS_EMPRENDIMIENTOS_TB Emprendimiento  
        ON Productos.Emprendimiento_id = Emprendimiento.Emprendimiento_id
    WHERE
        (@Nombre IS NULL OR Productos.NombreProducto LIKE '%' + @Nombre + '%')
        AND (@Categoria_id IS NULL OR Productos.Categoria_id = @Categoria_id)
        AND (@Emprendimiento_id IS NULL OR Productos.Emprendimiento_id = @Emprendimiento_id)
END