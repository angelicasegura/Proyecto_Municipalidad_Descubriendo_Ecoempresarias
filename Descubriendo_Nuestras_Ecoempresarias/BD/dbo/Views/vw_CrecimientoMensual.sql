CREATE VIEW vw_CrecimientoMensual
AS
SELECT 
    YEAR(f.Fecha) AS Anio,
    MONTH(f.Fecha) AS Mes,
    SUM(df.Cantidad * df.PrecioUnitario) AS TotalVentas
FROM ECOEMPRESARIAS_FACTURAS_TB f
INNER JOIN ECOEMPRESARIAS_DETALLE_FACTURAS_TB df 
    ON f.Factura_id = df.Factura_id
WHERE f.Estado_id = 1
GROUP BY YEAR(f.Fecha), MONTH(f.Fecha);