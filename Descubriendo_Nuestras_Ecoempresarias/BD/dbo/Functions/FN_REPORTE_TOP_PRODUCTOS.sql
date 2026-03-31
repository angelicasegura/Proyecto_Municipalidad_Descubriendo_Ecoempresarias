CREATE FUNCTION [FN_REPORTE_TOP_PRODUCTOS]
(
    @Emprendimiento_id INT
)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        P.NombreProducto,
        SUM(DF.Cantidad) AS TotalVendido,
        SUM(DF.Cantidad * DF.PrecioUnitario) AS Ingresos
    FROM ECOEMPRESARIAS_PRODUCTO_TB P
    JOIN ECOEMPRESARIAS_DETALLE_FACTURAS_TB DF
        ON P.Producto_id = DF.Producto_id
    JOIN ECOEMPRESARIAS_FACTURAS_TB F
        ON DF.Factura_id = F.Factura_id
    WHERE F.Emprendimiento_id = @Emprendimiento_id
    GROUP BY P.NombreProducto
);