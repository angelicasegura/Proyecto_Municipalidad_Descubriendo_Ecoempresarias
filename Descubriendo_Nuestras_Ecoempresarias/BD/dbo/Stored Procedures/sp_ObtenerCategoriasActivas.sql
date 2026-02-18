CREATE   PROCEDURE sp_ObtenerCategoriasActivas
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        Categoria_id,
        Nombre,
        Ruta_imagen,
        Estado_id
    FROM [dbo].[ECOEMPRESARIAS_CATEGORIA_TB]
    WHERE Estado_id = 1;
END