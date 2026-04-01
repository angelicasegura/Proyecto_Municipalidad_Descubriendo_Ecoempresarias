CREATE FUNCTION FN_KPI_NEGOCIO
(
    @Emprendimiento_id INT
)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        COUNT(DISTINCT F.Factura_id) AS TotalFacturas,
        ISNULL(SUM(F.Total), 0) AS VentasTotales,
        ISNULL(SUM(DF.Cantidad), 0) AS ProductosVendidos,
        ISNULL(AVG(F.Total), 0) AS TicketPromedio
    FROM ECOEMPRESARIAS_FACTURAS_TB F
    LEFT JOIN ECOEMPRESARIAS_DETALLE_FACTURAS_TB DF
        ON F.Factura_id = DF.Factura_id
    WHERE F.Emprendimiento_id = @Emprendimiento_id
);