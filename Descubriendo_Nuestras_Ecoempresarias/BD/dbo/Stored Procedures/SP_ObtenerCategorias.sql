CREATE PROCEDURE SP_ObtenerCategorias
    @Estado_id INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        Categoria.Categoria_id,
        Categoria.Nombre,
        Categoria.Ruta_imagen,
        Categoria.Estado_id
    FROM ECOEMPRESARIAS_CATEGORIA_TB Categoria
    WHERE
        (@Estado_id IS NULL OR Categoria.Estado_id = @Estado_id)
    ORDER BY Categoria.Nombre ASC;
END