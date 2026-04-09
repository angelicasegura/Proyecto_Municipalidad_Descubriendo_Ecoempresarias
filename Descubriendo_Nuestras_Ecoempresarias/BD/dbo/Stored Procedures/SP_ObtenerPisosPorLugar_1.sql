
CREATE PROCEDURE SP_ObtenerPisosPorLugar
    @Lugar_id INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        P.Piso_id,
        P.Nombre_piso,
        P.Numero_piso,
        P.Lugar_id,
        L.Nombre AS NombreLugar,
        P.Estado_id,
        E.Nombre AS NombreEstado
    FROM dbo.ECOEMPRESARIAS_PISOS_TB P
    INNER JOIN dbo.ECOEMPRESARIAS_LUGARES_TB L
        ON P.Lugar_id = L.Lugar_id
    INNER JOIN dbo.ECOEMPRESARIAS_ESTADOS_TB E
        ON P.Estado_id = E.Estado_id
    WHERE P.Lugar_id = @Lugar_id AND P.Estado_id = 1
    ORDER BY P.Numero_piso;
END