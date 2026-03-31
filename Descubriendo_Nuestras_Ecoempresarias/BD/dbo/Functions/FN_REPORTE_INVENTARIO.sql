CREATE FUNCTION FN_REPORTE_INVENTARIO
(
    @Emprendimiento_id INT
)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        P.NombreProducto,
        I.Cantidad_actual,
        I.Cantidad_minima,
        CASE 
            WHEN I.Cantidad_actual <= I.Cantidad_minima 
            THEN 'BAJO STOCK'
            ELSE 'OK'
        END AS Estado
    FROM ECOEMPRESARIAS_INVENTARIO_TB I
    JOIN ECOEMPRESARIAS_PRODUCTO_TB P
        ON I.Producto_id = P.Producto_id
    WHERE P.Emprendimiento_id = @Emprendimiento_id
);