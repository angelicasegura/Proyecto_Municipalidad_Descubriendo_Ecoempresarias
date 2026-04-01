CREATE VIEW vw_VentasPorSector
AS
SELECT 
    ta.Nombre AS Sector,
    COUNT(DISTINCT e.Emprendimiento_id) AS CantidadEmprendimientos,
    SUM(df.Cantidad *  df.PrecioUnitario) AS TotalVentas
FROM ECOEMPRESARIAS_FACTURAS_TB f
INNER JOIN ECOEMPRESARIAS_DETALLE_FACTURAS_TB df 
    ON f.Factura_id = df.Factura_id
INNER JOIN ECOEMPRESARIAS_EMPRENDIMIENTOS_TB e 
    ON f.Emprendimiento_id = e.Emprendimiento_id
INNER JOIN ECOEMPRESARIAS_TIPO_ACTIVIDAD_TB ta 
    ON e.TipoActividad_id = ta.TipoActividad_id
WHERE f.Estado_id = 1
GROUP BY ta.Nombre;