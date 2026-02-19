create PROCEDURE sp_ObtenerCategoriasActivas
    @Emprendimiento_id INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        C.Categoria_id,
        C.Nombre,
        C.Ruta_imagen,
        C.Estado_id
    FROM [dbo].[ECOEMPRESARIAS_CATEGORIA_TB] C
    WHERE 
        C.Estado_id = 1
        AND
        (
            @Emprendimiento_id IS NULL
            OR EXISTS (
                SELECT 1
                FROM ECOEMPRESARIAS_PRODUCTO_TB P
                WHERE 
                    P.Categoria_id = C.Categoria_id
                    AND P.Emprendimiento_id = @Emprendimiento_id
                    And P.Estado_id = 1
            )
        );
END
GO