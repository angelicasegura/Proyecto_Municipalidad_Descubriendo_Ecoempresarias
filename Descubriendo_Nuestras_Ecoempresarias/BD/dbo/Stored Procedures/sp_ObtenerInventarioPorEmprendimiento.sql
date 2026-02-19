
CREATE PROCEDURE sp_ObtenerInventarioPorEmprendimiento
    @Emprendimiento_id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        P.Producto_id,
        P.NombreProducto,
        P.Descripcion,
        P.Ruta_Imagen,
        P.Precio,
        P.Descuento,

        I.Cantidad_actual,
        I.Cantidad_minima,

        EP.Nombre AS NombreEmprendimiento

    FROM ECOEMPRESARIAS_INVENTARIO_TB I
        INNER JOIN ECOEMPRESARIAS_PRODUCTO_TB P 
            ON I.Producto_id = P.Producto_id

        INNER JOIN ECOEMPRESARIAS_EMPRENDIMIENTOS_TB EP 
            ON P.Emprendimiento_id = EP.Emprendimiento_id

    WHERE 
        P.Emprendimiento_id = @Emprendimiento_id
        AND P.Estado_id = 1              -- Producto activo
        AND EP.Estado_id = 1             -- Emprendimiento activo
END