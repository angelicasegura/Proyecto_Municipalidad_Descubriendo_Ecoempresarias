CREATE PROCEDURE SP_ObtenerEventos
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        Evento.Evento_id,
        Evento.NombreEvento,
        Evento.Descripcion,
        Evento.Fecha_inicio,
        Evento.Fecha_final,
        Evento.Horario,
        Evento.Cupos,
        Evento.Cupos_actuales,
        Evento.Lugar_id,
        Estado.Nombre AS NombreEstado,
        Lugar.Nombre AS NombreLugar
    FROM ECOEMPRESARIAS_EVENTOS_TB Evento
    INNER JOIN ECOEMPRESARIAS_ESTADOS_TB Estado
        ON Evento.Estado_id = Estado.Estado_id
    INNER JOIN ECOEMPRESARIAS_LUGARES_TB Lugar
        ON Evento.Lugar_id = Lugar.Lugar_id
END
