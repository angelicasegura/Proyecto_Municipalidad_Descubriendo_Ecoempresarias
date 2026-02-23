CREATE PROCEDURE [dbo].[SP_ObtenerProductosPorEstado]
@Estado_id int 
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
        Emprendimiento.Usuario_id AS UsuarioDueño,
        Emprendimiento.Nombre AS EmprendimientoNombre
    FROM ECOEMPRESARIAS_PRODUCTO_TB Productos
    INNER JOIN ECOEMPRESARIAS_ESTADOS_TB Estado 
        ON Productos.Estado_id = Estado.Estado_id
    INNER JOIN ECOEMPRESARIAS_CATEGORIA_TB Categoria 
        ON Productos.Categoria_id = Categoria.Categoria_id
    INNER JOIN ECOEMPRESARIAS_EMPRENDIMIENTOS_TB Emprendimiento  
        ON Productos.Emprendimiento_id = Emprendimiento.Emprendimiento_id
    WHERE (Productos.Estado_id = @Estado_id);
END