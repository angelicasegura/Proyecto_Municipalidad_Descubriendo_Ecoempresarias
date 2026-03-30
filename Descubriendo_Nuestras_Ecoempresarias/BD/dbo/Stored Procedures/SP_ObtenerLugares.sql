CREATE PROCEDURE SP_ObtenerLugares
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        Lugar.Lugar_id,
        Lugar.Nombre,
        Lugar.Provincia,
        Lugar.Canton,
        Lugar.Distrito,
        Lugar.Detalles,
        Lugar.Estado_id,
        Estado.Nombre AS NombreEstado
    FROM ECOEMPRESARIAS_LUGARES_TB Lugar
    INNER JOIN ECOEMPRESARIAS_ESTADOS_TB Estado 
        ON Lugar.Estado_id = Estado.Estado_id
END