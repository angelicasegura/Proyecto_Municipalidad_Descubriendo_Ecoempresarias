CREATE PROCEDURE SP_ObtenerEventoPorId
@Evento_id INT
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
        Evento.Lugar_id As Lugar_id,
        Estado.Nombre AS NombreEstado,
		Lugar.Nombre AS NombreLugar
    FROM ECOEMPRESARIAS_EVENTOS_TB Evento
    INNER JOIN ECOEMPRESARIAS_ESTADOS_TB Estado 
        ON Evento.Estado_id = Estado.Estado_id

	INNER JOIN ECOEMPRESARIAS_LUGARES_TB Lugar
	on Evento.Lugar_id = Lugar.Lugar_id

	WHERE Evento.Evento_id = @Evento_id
END