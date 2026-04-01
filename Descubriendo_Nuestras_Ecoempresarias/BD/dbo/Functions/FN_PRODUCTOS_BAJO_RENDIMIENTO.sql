CREATE FUNCTION FN_PRODUCTOS_BAJO_RENDIMIENTO
(
    @Emprendimiento_id INT
)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        P.NombreProducto,
        ISNULL(SUM(DF.Cantidad), 0) AS TotalVendido
    FROM ECOEMPRESARIAS_PRODUCTO_TB P
    LEFT JOIN ECOEMPRESARIAS_DETALLE_FACTURAS_TB DF
        ON P.Producto_id = DF.Producto_id
    LEFT JOIN ECOEMPRESARIAS_FACTURAS_TB F
        ON DF.Factura_id = F.Factura_id
        AND F.Emprendimiento_id = @Emprendimiento_id
    WHERE P.Emprendimiento_id = @Emprendimiento_id
    GROUP BY P.NombreProducto
    HAVING ISNULL(SUM(DF.Cantidad), 0) <= 5
);