CREATE FUNCTION FN_TICKET_PROMEDIO_MENSUAL
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
        AVG(F.Total) AS TicketPromedio
    FROM ECOEMPRESARIAS_FACTURAS_TB F
    WHERE F.Emprendimiento_id = @Emprendimiento_id
    GROUP BY 
        YEAR(F.Fecha),
        MONTH(F.Fecha)
);