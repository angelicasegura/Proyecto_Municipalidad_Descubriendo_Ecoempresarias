CREATE FUNCTION [FN_REPORTE_VENTAS_MENSUALES]
(
    @Emprendimiento_id INT
)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        YEAR(F.Fecha) AS Anio,
        MONTH(F.Fecha) AS Mes,
        SUM(F.Total) AS TotalVentas
    FROM ECOEMPRESARIAS_FACTURAS_TB F
    WHERE F.Emprendimiento_id = @Emprendimiento_id
    GROUP BY 
        YEAR(F.Fecha),
        MONTH(F.Fecha)
);